/**
 * Creates a URL for image data given an original URL from the backend server.
 * 
 * This is necessary because the backend server is behind an nginx/gunicorn instance and
 * serves up image URLs relative to the django server, but which won't work outside the
 * local server IP (0.0.0.0)
 * @returns {string} URL
 * */ 
import constants from "../constants";

const getURL_BackendImage = (originalURL) => {

  if (typeof originalURL === 'string') {
    const splitURL = originalURL.split('/images');
    if (splitURL.length >= 2) {
        const updatedImageURL = constants.IMAGE_URL + 'images' + splitURL[1];
        return updatedImageURL;
    }
  }

  return null;
}

export default getURL_BackendImage;