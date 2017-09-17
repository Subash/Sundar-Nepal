export function createCanvas({ width, height }) {
  const canvas = document.createElement('canvas');
  canvas.height = height;
  canvas.width = width;
  return canvas;
}

export function createImage(url, { width, height }) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.width = width;
    img.height = height;
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

export function mergeImages(imageUrls, { width, height }) {
  return new Promise((resolve, reject) => {
    const imageSize = { width, height };
    const canvas = createCanvas(imageSize);
    const ctx = canvas.getContext("2d");
    const images = imageUrls.map(imageUrl => createImage(imageUrl, imageSize));
    Promise.all(images)
      .then(images => {
        for(const image of images) {
          ctx.drawImage(image, 0, 0, imageSize.width, imageSize.height);
        }
        resolve(canvas.toDataURL("image/jpeg"));
      }).catch(reject);
  })
}

export function apiRequest(url, options) {
  return new Promise((resolve, reject)=> {
    fetch(url, options)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        resolve();
      } else {
        const error = new Error(response.statusText)
        error.response = response
        reject(error);
      }
    })
    .catch(err => {
      err = err.data ? err : new Error('An error occurred while connecting.');
      reject(err);
    });
  });
}
