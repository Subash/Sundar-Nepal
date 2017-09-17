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

export function mergeImages(bottomImageUrl, topImageUrl) {
  return new Promise((resolve, reject) => {
    const imageSize = { width: 800, height: 800 };
    const canvas = createCanvas(imageSize);
    const ctx = canvas.getContext("2d");
    Promise.all([createImage(bottomImageUrl, imageSize), createImage(topImageUrl, imageSize)])
      .then( ([bottomImage, topImage]) => {
        ctx.drawImage(bottomImage, 0, 0, imageSize.width, imageSize.height);
        ctx.drawImage(topImage, 0, 0,  imageSize.width, imageSize.height);
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
