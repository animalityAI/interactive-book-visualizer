from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import base64
from PIL import Image
import io
import logging
from datetime import datetime

app = FastAPI()
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TextRequest(BaseModel):
    text: str
    language: str = "en"

class ImageRequest(BaseModel):
    prompt: str
    style: str = "realistic"

class GeneratedResponse(BaseModel):
    image_url: str
    text: str
    timestamp: str

# Simple in-memory cache
cache = {}

async def process_text(text: str) -> List[str]:
    return [s.strip() for s in text.split('.') if len(s.strip()) > 20]

async def generate_image(prompt: str) -> str:
    timestamp = datetime.now().isoformat()
    return f"/images/{base64.b64encode(prompt.encode()).decode()}/{timestamp}"

@app.post("/process", response_model=List[GeneratedResponse])
async def process_content(request: TextRequest):
    try:
        scenes = await process_text(request.text)
        responses = []
        
        for scene in scenes:
            if scene in cache:
                responses.append(cache[scene])
                continue
                
            image_url = await generate_image(scene)
            
            response = GeneratedResponse(
                image_url=image_url,
                text=scene,
                timestamp=datetime.now().isoformat()
            )
            
            cache[scene] = response
            responses.append(response)
        
        return responses
    
    except Exception as e:
        logger.error(f"Error processing content: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)