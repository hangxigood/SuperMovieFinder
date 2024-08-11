"use client";
import {useState} from "react";
import { SlMagnifier } from "react-icons/sl";
import MovieList from "./movie_list";
import {useUserAuth} from "./_utils/auth-context.js";
import { useEffect } from "react";
import { addItem } from "./_services/DB_services";
import MovieFavourtieList from "./movie_favourite_list";
import { getItems } from "./_services/DB_services";
import { db } from "./_utils/firebase";
import { deleteItem } from "./_services/DB_services";
import { CiShare1 } from "react-icons/ci";
import ShareModal from "./ShareModal";


export default function Page() {

  /****************************State Variables*********************************************/

  const [ArrayOfMovies,setMovieArray] = useState([]);
  const [name, setName] = useState("");
  const [searchbar, setSearchBar] = useState("");
  const [favouritesarray,setfavouritesarray] = useState([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);


  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();
  /*****************************************Firestore DB***********************************************************/
//on press of like button add movie object to DB
const handleAddItem = async (addedItem) => {

  if (!user) {
    alert("Please log in to add items to your favourites list.");
    return;
  }
  else {
  var docid = await addItem(user.uid,addedItem)
  console.log('the SUPERDUPER docref is:' + docid )
    addedItem.docid  = docid;
  setfavouritesarray(favouritesarray => {return[addedItem,...favouritesarray]})
}

};

const handleDeleteItem = async (docRef) => {
  await deleteItem(user.uid,docRef);
  console.log(favouritesarray);
  console.log(docRef);
  setfavouritesarray([...favouritesarray.filter(m => m.docid !== docRef)])
}

//on page load get favourties from DB 
useEffect(() => {
  const loadItems = async () => {
    if (user) {
      console.log("User is defined:", user); // Log user object
      console.log("User ID:", user.uid); // Debug log
      try {
        const itemsArray = await getItems(db, user.uid);
        console.log("The items array is:", itemsArray); // Print the items to the console
        setfavouritesarray(itemsArray);
      } catch (error) {
        console.error("Error fetching items:", error); // Log errors
      }
    } else {
      console.log("User is not defined"); // Log when user is not defined
    }
  };
  loadItems();
}, [user]);



//**************************************Firebase**************************************// 



  const handleLoginGithub = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  const handleLoginGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };


/***********************************API Search************************************************/
    
useEffect(() => {
  if (name) {
      UpdateMovieArray();
  }
}, [name]);


async function UpdateMovieArray() {
const NewMovieArray = await fetchMovieArray(name);
setMovieArray(NewMovieArray)
}

/******************************************FORM SUBMISSION********************************************** */
  const handleSubmit = (event) => {
    event.preventDefault();
   // console.log('in page.js Name is:'+ name);
    if (searchbar.trim() === '') {
      setMovieArray([]);
      setName("");
    } else {
      setName(searchbar);
      //console.log('in page.js searchbar is:'+searchbar)
    }

  }

//this shows the text in the search bar
  const handleNameChange = (event) =>
    {setSearchBar(event.target.value);}

/******************************* Handle share *************************************************** */

const handleShare = () => {
  setIsShareModalOpen(true);
};

/********************************************************************************** */

return (
  <main className="flex flex-col h-auto">
            {/* h-dvh sets the height of the entire div to the display viewport height (what you can see?) */}
            <div className="flex bg-zinc-900  h-16 items-center  ">
              <div className="bg-black ml-32 rounded-md ">
              <p className="pl-4 pr-4 pt-1 pb-1 text-2xl    text-cyan-500">SMF</p>
              </div>
                    {/* our form for the search */}
                    {/*The Value of the input field must be tied to the state variable Name, in order for the test to be seen typing in, and for the the name variable to be used.*/}
                    <form className="flex flex-grow" onSubmit={handleSubmit}>
                      <input className="border-2 text-black rounded-md  bg-white h-10 m-6 flex-grow" type="text" name="searchbar"
                       placeholder="Enter Movie Title to search...." value={searchbar} onChange={handleNameChange}/> 
                      <button className="mr-10"  type="submit"><SlMagnifier className="w-8 h-8 " /></button>
                    </form>        
              <div className="flex">
                    {user ? (<main className="flex">
                            <p className="mr-10 text-white">{user.email}</p>
                            <button className="mr-6 text-white" onClick={handleLogout}>Sign out</button>
                            </main>):(
                            <main className="">
                                <button className="mr-14 text-white" onClick={handleLoginGithub}>Sign in with Github</button>
                                <button className="mr-14 text-white" onClick={handleLoginGoogle}>Sign in with Google</button>
                            </main>
                    )}
              </div>
            </div>

            {/* Comment text here */}
            <div className="flex justify-around"
            style={{
              backgroundImage: 'url("https://media.gettyimages.com/id/1366097039/video/ld-cinema-projector-displaying-a-movie-in-a-dark-room.jpg?s=640x640&k=20&c=CN5c6PaEIdh9QYSjQEVr7hplTLNVaJAou_J_a5i73hI=")',
              backgroundSize: '100% auto',  
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'repeat-y' // Centers the image
            }}> 
                  <div className="flex flex-wrap m-5 rounded-xl w-3/4" 
                  style={{ minHeight: '100vh' }}
                  >
                  {ArrayOfMovies.length > 0  ? (
                    <>
                    <MovieList ArrayOfMovies={ArrayOfMovies} Favouritesarray={favouritesarray} onAddItem={handleAddItem} onRemoveItem={handleDeleteItem} />
                    </>
                  ):(
                    <>
                    {/** can put whatever you want here to display when the array is empty */}
                    </>

                  )
                }
                  </div>


                  
                  <div className="flex flex-col items-center  m-5 rounded-xl w-1/4 ">

                  {favouritesarray.length > 0 ? (
                      <>
                      <div className="flex items-center w-full mb-2">
                        <p className="text-lg font-bold pr-2">Favourites List</p>
                        <button 
                          onClick={handleShare} 
                          className="text-white hover:text-blue-700 transition-colors"
                          aria-label="Share favorites"
                        >
                        <CiShare1 size={20} />
                        </button>
                      </div>
                      <MovieFavourtieList favouritesarray={favouritesarray} onDeleteItem={handleDeleteItem} setfavouritesarray={setfavouritesarray}/>
                      </>) : (<p>No favorites added yet</p>)}
                    </div>
                    <ShareModal 
                      isOpen={isShareModalOpen} 
                      onClose={() => setIsShareModalOpen(false)} 
                      favouritesarray={favouritesarray}
                    />
                  </div>
                  
  </main>
  );
}



/***********************************************************API FETCH********************************************************************* */

async function fetchMovieArray(moviename) {
  try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${moviename}&api_key=de85768f0d74622c7361ecc14c017ec1`);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.results) {
          return data.results;
      } else {
          return;
      }
  } catch (error) {
      console.log(error.message);
      return [];

  }
}
    

