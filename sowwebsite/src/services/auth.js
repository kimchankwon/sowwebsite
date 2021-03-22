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

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider();
  return auth().signInWithPopup(provider);
}

export function logout() {
  return auth().signOut();
}

export function isAuthenticated() {
  return auth().currentUser ? true : false;
}
