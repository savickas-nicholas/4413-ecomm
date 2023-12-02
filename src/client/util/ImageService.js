import no_image from '../assets/image-not-found.png'
// import { storage } from '../firebase';

export default function getImageByPath(imagePath) {
  try {
    // const imageRef = storage.ref(`car-image-filesystem/${imageName}`);

    const image = require(`../assets/car-image-filesystem/${imagePath}`).default;
    return image;
  } catch (error) {
    console.error(`Error loading image from path '${imagePath}':`, error);
    return no_image;
  }
}