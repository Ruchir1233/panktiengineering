import { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';

interface Image {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const fabricationImages: Image[] = [
  {
    src: 'https://images.unsplash.com/photo-1565439312755-4786e6ee7f80',
    alt: 'Robotic Automation in Manufacturing',
    title: 'Advanced Robotics',
    description: 'State-of-the-art robotic systems for precision manufacturing and assembly'
  },
  {
    src: 'https://images.unsplash.com/photo-1565439312745-7bf6a7ab4ac6',
    alt: '3D Printing Process',
    title: 'Additive Manufacturing',
    description: 'Next-generation 3D printing technology for rapid prototyping and production'
  },
  {
    src: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801',
    alt: 'Modern Factory Interior',
    title: 'Smart Factory Solutions',
    description: 'Intelligent manufacturing facilities with IoT integration and real-time monitoring'
  },
  {
    src: 'https://images.unsplash.com/photo-1565439312750-7ab5008c4b89',
    alt: 'Quality Control Process',
    title: 'Quality Assurance',
    description: 'Advanced quality control systems ensuring precision and reliability'
  }
];

export function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Advanced Manufacturing Solutions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {fabricationImages.map((image, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-w-16 aspect-h-12">
              <img
                src={image.src}
                alt={image.alt}
                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
              <div className="text-white text-center">
                <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                <p className="text-sm text-gray-200">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
            <div className="bg-white rounded-xl max-w-4xl w-full p-6">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg mb-4 object-cover"
              />
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-600 mb-4">{selectedImage.description}</p>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
} 