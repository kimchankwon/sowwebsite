import { db, auth } from "../services/firebase";

export const getUser = () => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(auth().currentUser.uid)
      .get()
      .then((docRef) => {
        resolve(docRef.data());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateField = (name, value, label) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(auth().currentUser.uid)
      .update({
        [name]: value,
      })
      .then(() => {
        resolve("Successfully updated " + label);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
