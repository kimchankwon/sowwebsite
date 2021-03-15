import { db } from "../services/firebase";

export const getUser = (uid) => {
  return new Promise(function (resolve, reject) {
    db.collection("users")
      .doc(uid)
      .get()
      .then((docRef) => {
        resolve(docRef.data());
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const updateUserRole = (uid, role) => {
  var xtectraRef = db.collection("users").doc(uid);

  return xtectraRef
    .update({
      role: role,
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};
