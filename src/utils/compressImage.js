import Compressor from "compressorjs";

export const handleChangeImage = (event) => {
  let a;
  let fileUploaded = event;
  const fileUploadedSize = fileUploaded.size / 1024 / 1024;
  if (fileUploadedSize > 20) {
    new Compressor(fileUploaded, {
      quality: 0.4,
      success: (res) => {
        a = res;
        return a;
      },
    });
  } else if (fileUploadedSize > 10 && fileUploadedSize <= 20) {
    new Compressor(fileUploaded, {
      quality: 0.5,
      success: (res) => {
        a = res;
        return a;
      },
    });
  } else if (fileUploadedSize > 6 && fileUploadedSize <= 10) {
    new Compressor(fileUploaded, {
      quality: 0.7,
      success: (res) => {
        a = res;
        return a;
      },
    });
  } else if (fileUploadedSize > 3 && fileUploadedSize <= 6) {
    new Compressor(fileUploaded, {
      quality: 0.8,
      success: (res) => {
        a = res;
        return a;
      },
    });
  } else {
    return fileUploaded;
  }
};
