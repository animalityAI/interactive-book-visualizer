import React, { useState } from 'react';
import { Book, ImagePlus } from 'lucide-react';

const BookVisualizer = () => {
  const [text, setText] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const processText = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8000/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          language: 'en'
        }),
      });

      if (!response.ok) throw new Error('Failed to process text');
      
      const data = await response.json();
      setImages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4 flex items-center gap-2">
        <Book className="w-6 h-6" />
        <h1 className="text-xl font-bold">Interactive Book Visualizer</h1>
      </div>

      <div className="space-y-4">
        <textarea
          className="w-full h-32 p-2 border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          disabled={isLoading}
        />

        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={processText}
          disabled={isLoading || !text.trim()}
        >
          <ImagePlus className="w-4 h-4" />
          Generate Images
        </button>

        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="border rounded overflow-hidden">
                <img
                  src={image.image_url}
                  alt={`Generated scene ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm">{image.text}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Generated: {new Date(image.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookVisualizer;