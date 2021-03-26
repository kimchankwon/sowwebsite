import { auth, db } from "./firebase";

export const signup = (email, password, role) => {
  return auth.createUserWithEmailAndPassword(email, password).then(() => {
    db.collection("users").doc(auth.currentUser.uid).set({
      email: email,
      role: role,
    });
  });
};

export const signin = (email, password) => {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        resolve("Sign In Success");
      })
      .catch((error) => {
        reject(error);
      });
  });
};
export const logout = () => {
  return auth.signOut();
};

export const isAuthenticated = () => {
  return auth.currentUser ? true : false;
};

export const resetPassword = (newPassword) => {
  return new Promise((resolve, reject) => {
    auth.currentUser
      .updatePassword(newPassword)
      .then(() => {
        resolve("Update successful");
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendPasswordResetEmail = (email) => {
  return new Promise((resolve, reject) => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        resolve("An email has been sent. Please check your inbox.");
      })
      .catch((error) => {
        reject(error);
      });
  });
};
