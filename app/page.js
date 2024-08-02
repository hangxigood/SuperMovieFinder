"use client";
import {useState} from "react";
import { SlMagnifier } from "react-icons/sl";
import MovieList from "./movie_list";
import {useUserAuth} from "./_utils/auth-context.js";
import { useEffect } from "react";

export default function Page() {

  const [ArrayOfMovies,setMovieArray] = useState([]);
  var [name, setName] = useState("");
  var [searchbar, setSearchBar] = useState("");

//**************************************Firebase**************************************// 
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  console.log('the User in page.js is:', user?.uid);

  const handleLogin = async () => {
    try {
      await gitHubSignIn();
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
//***********************************************************************************/

/***********************************API************************************************/
    
useEffect(() => {
  if (name) {
      UpdateMovieArray();
  }
}, [name]);


async function UpdateMovieArray() {
const NewMovieArray = await fetchMovieArray(name);
setMovieArray(NewMovieArray)
}

/**************************************************************************************** */
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('in page.js Name is:'+ name);
    if (searchbar.trim() === '') {
      setMovieArray([]);
      setName("");
    } else {
      setName(searchbar);
      console.log('in page.js searchbar is:'+searchbar)
    }

  }

//this shows the text in the search bar
  const handleNameChange = (event) =>
    {setSearchBar(event.target.value);}



return (
  <main className="flex flex-col h-dvh ">
            {/* h-dvh sets the height of the entire div to the display viewport height (what you can see?) */}
            <div className="flex bg-zinc-900  h-16 items-center  ">
              <div className="bg-black ml-32 rounded-md ">
              <p className="pl-4 pr-4 pt-1 pb-1 text-2xl    text-cyan-500">SMF</p>
              </div>
                    {/* our form for the search */}
                    {/*The Value of the input field must be tied to the state variable Name, in order for the test to be seen typing in, and for the the name variable to be used.*/}
                    <form className="flex flex-grow" onSubmit={handleSubmit}>
                      <input className="border-2 text-black rounded-md  bg-white h-10 m-6 flex-grow" type="text" name="searchbar" placeholder="Enter Movie Title to search...." value={searchbar} onChange={handleNameChange}/> 
                      <button className="mr-10"  type="submit"><SlMagnifier className="w-8 h-8 " /></button>
                    </form>        
              <div className="flex">
                    {user ? (<main className="flex">
                            <p className="mr-10">{user.email}</p>
                            <button className="mr-6" onClick={handleLogout}>Sign out</button>
                            </main>):(
                            <main className="">
                                <button className="mr-14" onClick={handleLogin}>Sign in</button>
                            </main>
                    )}
              </div>
            </div>

            {/* Comment text here */}
            <div className="flex  justify-around bg-cover bg-center "> 
                  <div className="flex flex-wrap border-white border-2 m-5 rounded-xl w-3/4 ">
                  {ArrayOfMovies.length > 0  ? (
                    <>
                    <MovieList ArrayOfMovies={ArrayOfMovies} />
                    </>
                  ):(
                    <>
                    {/** can put whatever you want here to display when the array is empty */}
                    </>

                  )
                }
                  </div>
                  <div className=" border-white border-2  m-5 rounded-xl w-1/4 ">Favourites
                  </div>
            </div>
  </main>
  );
}

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
    


//<Movie poster_path={tempobj.poster_path} title={tempobj.title} release_date={tempobj.release_date} vote_average={tempobj.vote_average} overview={tempobj.overview}/> 
