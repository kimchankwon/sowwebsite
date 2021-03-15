import { storage } from "../services/firebase";

export const getRef = (url) => {
  return new Promise(function (resolve, reject) {
    storage
      .ref()
      .child(url)
      .getDownloadURL()
      .then((downloadUrl) => {
        resolve(downloadUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getList = () => {
  return new Promise(function (resolve, reject) {
    storage
      .ref()
      .child("resources")
      .listAll()
      .then((res) => {
        resolve(res.items);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
