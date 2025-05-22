// utils/imageUtils.js
export const getRandomImage = () => {
  try {
    // In Next.js, we need to use require.context for webpack to know about the files
    // This only works if the images are in the public folder
    const context = require.context('../public/img/example_img', false, /\.(png|jpe?g|gif|svg)$/);
    
    // Filter images from the specified folder
    const allFiles = context.keys().map(key => key.replace('./', '/'));

    
    // Select a random image
    const randomIndex = Math.floor(Math.random() * allFiles.length);
    return `/img/example_img${allFiles[randomIndex]}`
  } catch (error) {
    console.error('Error loading images:', error);
    return null;
  }
};