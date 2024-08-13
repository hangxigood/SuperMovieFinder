//imports to connect to the firebase service thought the firebase.js file 
import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";


 /**
  * Function to get liked movies for a specific user
  * return an array of objects with the following properties:
  * docid: "Ym1ef0kcNVy31WWmh33Y"
  * id: 292431 
  */
 export async function getLikedMoviesId(userId) {
  try {
    const querySnapshot = await getDocs(collection(db, "users", userId, "likedMovies"));
    const movies = [];
    querySnapshot.forEach((doc) => {
      movies.push({ docid: doc.id, ...doc.data() }); // Add the document ID to the object
    });
    console.log(movies);
    return movies;
  }
  catch (error) {
    console.error(error);
    throw new Error("Failed to get liked movies id");
  }
}

// Function to add a liked movie for a specific user
export async function addLikedMovie(userId, movie) {
  try {
    const docRef = await addDoc(collection(db, "users", userId, "likedMovies"), movie);
    return docRef.id;
  }
  catch (error) {
    console.error(error);
    throw new Error("Failed to add liked movie");
  }
}

// Function to delete a liked movie for a specific user
export async function deleteLikedMovie(userId, MovieToBeDeleted) {
  try {
    const docRef = doc(db, "users", userId, "likedMovies", MovieToBeDeleted.docid);
    await deleteDoc(docRef);
  }
  catch (error) {
    console.error(error);
    throw new Error("Failed to delete liked movie");
  }
}