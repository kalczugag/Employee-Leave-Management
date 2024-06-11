import imageCompression from "browser-image-compression";

export const convertToBase64 = (
    file: File
): Promise<string | ArrayBuffer | null> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

export const compressImage = async (
    file: File
): Promise<string | ArrayBuffer | null> => {
    const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
    };

    try {
        const compressedFile = await imageCompression(file, options);

        return await convertToBase64(compressedFile);
    } catch (error) {
        console.error("Error compressing the image:", error);
        throw error;
    }
};
