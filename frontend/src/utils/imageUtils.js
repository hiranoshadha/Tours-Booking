export const getImageUrl = (imagePath, fallbackImage) => {
    if (!imagePath) return fallbackImage;
    
    // If the path already includes the full URL, return it as is
    if (imagePath.startsWith('http')) return imagePath;
    
    // Otherwise, prepend the backend URL
    return `http://localhost:3000${imagePath}`;
  };
  