import ImageKit from "imagekit"

const imageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

  export const uploadFiles = async (file) => {
    const result = await imageKitClient.upload({
        file,
        fileName: "music" +Date.now(),
        folder:"/back/music"
    })
    return result

}


