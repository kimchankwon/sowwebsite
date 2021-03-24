import { auth, db } from "./firebase";

export function signup(email, password, role) {
  return auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      db.collection("users").doc(auth().currentUser.uid).set({
        email: email,
        role: role,
      });
    });
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}
export function logout() {
  return auth().signOut();
}

export function isAuthenticated() {
  return auth().currentUser ? true : false;
}

export const resetPassword = (newPassword) => {
  return new Promise(function (resolve, reject) {
    auth()
      .currentUser.updatePassword(newPassword)
      .then(function () {
        resolve("Update successful");
      })
      .catch((error) => {
        reject(error);
      });
  });
};
