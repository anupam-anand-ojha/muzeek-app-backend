import ImageKit from "imagekit"

const imageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

export const uploadFiles = async (file) => {
  try {
    const result = await imageKitClient.upload({
      file: file.buffer,
      fileName: file.originalname,
    });

    return result;
  } catch (err) {
    console.log("ImageKit Upload Error:", err);
    throw err;
  }
};