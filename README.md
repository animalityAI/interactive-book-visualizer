# Interactive Book Visualizer

An AI-powered tool that transforms text into dynamic visual stories, making reading more engaging and interactive.

## 🚀 Features

- Real-time text-to-image generation
- Support for multiple languages (English/Spanish)
- Comic-style layout generation
- Dynamic image variations for repeated readings
- Caching system for improved performance

## 🛠️ Quick Start

1. Clone the repository:
\`\`\`bash
git clone https://github.com/animalityAI/interactive-book-visualizer.git
cd interactive-book-visualizer
\`\`\`

2. Install dependencies:
\`\`\`bash
pip install -r requirements.txt
npm install
\`\`\`

3. Set up your environment variables:
\`\`\`bash
cp .env.example .env
# Edit .env with your API keys
\`\`\`

4. Run the services:
\`\`\`bash
# Backend
uvicorn app.main:app --reload --port 8000

# Frontend
npm run dev
\`\`\`

## 📦 Structure

\`\`\`
interactive-book-visualizer/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI application
│   │   ├── image_gen.py      # Image generation service
│   │   └── text_process.py   # Text processing service
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   └── pages/           # Page components
│   └── package.json
└── README.md
\`\`\`

## 🔧 Technologies

- Frontend: React, TailwindCSS
- Backend: FastAPI, Python
- Image Generation: Stable Diffusion API
- Text Processing: NLTK, Transformers

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) first.