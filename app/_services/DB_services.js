//imports to connect to the firebase service thought the firebase.js file 
import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc, query, deleteDoc, where, doc } from "firebase/firestore";



 // Function to get items as an array of objects
 async function getItems(db, userId) {
    const q = query(
      //
      collection(db, "users", userId, "movies")
    );
  
    try {
      const querySnapshot = await getDocs(q);
      console.log('the query snapshot:' + querySnapshot);
      var itemsArray = [];
      querySnapshot.forEach((doc) => {
      const data = doc.data();
      // console.log('Document Data before merging:', data);
       const item = { docid: doc.id, ...data };
      // console.log('Item after merging:', item);
       itemsArray.push(item);
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
  //Item is the object we are passing looks like  this  { } 
    const docRef = await addDoc(collection(db, "users", userId, "movies") ,Item);
    console.log("Item is created with ID: ", docRef.id);
    return docRef.id;

}

async function deleteItem (userId, itemId){

    try {
      const itemRef = doc(db, "users", userId, "movies", itemId)
      await deleteDoc(itemRef);
      console.log("Item Deleted");
    }
    catch(error){
    
    console.error(error)
      }
    
    }



// Function to create an item-- I dontunderstand the purpose of this method compared to add item???
async function createItem(db, userId, itemData) {
  const docRef = await addDoc(collection(db, "users", userId, "items"), itemData);
  console.log("Item is created with ID: ", docRef.id);
  return docRef.id;
}



export { getItems, addItem, createItem, deleteItem };