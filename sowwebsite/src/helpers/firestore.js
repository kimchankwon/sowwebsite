import { db } from "../services/firebase";

export function updateUserRole(role) {
  var xtectraRef = db.collection("users").doc("ffPs66xDnJUrr9eCkAdajFBpJn12");

  // Set the "capital" field of the city 'DC'
  return xtectraRef
    .update({
      role: role,
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
}
