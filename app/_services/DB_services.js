//imports to connect to the firebase service thought the firebase.js file 
import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, where, doc } from "firebase/firestore";



 // Function to get items as an array of objects
 async function getItems(db, userId) {
    const q = query(
      //
      collection(db, "users", userId, "movies")
    );
  
    try {
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      var itemsArray = [];
  
      querySnapshot.forEach((doc) => {
        console.log('Document Data:', doc.data());
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
  
      return itemsArray;
    } catch (error) {
      console.error("Error getting documents: ", error);
      return [];
    }
  }


// functions to connect to the firebase database

//use this fucntion to add items from your shopping list (the component with the submit button)
//to the firebase database, it will no longer add items to the .json file

// db=refrences to our firestore
// "users" is the name of the first collection in the database, or the name of the database?
// userID the unique ID given when a user is authenticated can be seen under the authentication tab on firebase website. 
//"items " is a collection of item documents, the documents this collection holds will be objects
async function addItem(userId, Item) {
  //add doc returns a promise
    const docRef = await addDoc(collection(db, "users", userId, "movies"), 
    //Item is the object we are passing looks like  this  { } 
    Item
  );
    console.log("Item is created with ID: ", docRef.id);

}


// Function to create an item-- I dontunderstand the purpose of this method compared to add item???
async function createItem(db, userId, itemData) {
  const docRef = await addDoc(collection(db, "users", userId, "items"), itemData);
  console.log("Item is created with ID: ", docRef.id);
  return docRef.id;
}



export { getItems, addItem, createItem };