"use client";
import { useState, useEffect } from "react";
import { SlMagnifier } from "react-icons/sl";
import { useUserAuth } from "./_utils/auth-context.js";
import { getLikedMoviesId, addLikedMovie, deleteLikedMovie } from "./_services/Database";
import MovieList from "./_components/MovieList";
import LikedMovieList from "./_components/LikedMovieList";

export default function Page() {

  /****************************State Variables*********************************************/

  const [LikedMovies,setLikedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, gitHubSignIn, googleSignIn, firebaseSignOut } = useUserAuth();

  //**************************************Firebase Auth**************************************// 

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

  /************************** update local liked movie list if user changed *********************************************************/

  useEffect(() => {
    if (user) {
      fetchLikedMovies();
    }
  }, [user]);

  const fetchLikedMovies = async () => {
    if (user) {
      const likedMoviesIdArray = await getLikedMoviesId(user.uid); // get liked movies id from database  
      const likedMovies = await Promise.all(likedMoviesIdArray.map(async (movie) => {
        const response = await fetch(`api/MovieSearch?searchId=${movie.id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return { ...data, docid: movie.docid }; // add docid to the movie object
      }));
      setLikedMovies(likedMovies);
    }
  };

  /********************************************* handle functions ******************************************************************/

  const handleLikeMovie = async (MovieToBeLiked) => {
    if (!user) {
      alert("Please log in to add movies to your favourites list.");
      return;
    }
    else {
      var docid = await addLikedMovie(user.uid, { id: MovieToBeLiked.id});
      MovieToBeLiked.docid = docid;
      setLikedMovies([...LikedMovies, MovieToBeLiked]);
    }
  }

  const handleDeleteMovie = async (MovieToBeDeleted) => {
    console.log(MovieToBeDeleted.docid);
    await deleteLikedMovie(user.uid, MovieToBeDeleted);
    setLikedMovies([...LikedMovies.filter(m => m.docid !== MovieToBeDeleted.docid)]);
  }

  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const response = await fetch(`api/MovieSearch?searchKeyWord=${searchQuery}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data.results);
    }
  }

/**************************************************************************************************************** */

return (
  <main className="flex flex-col h-auto">
            {/* h-dvh sets the height of the entire div to the display viewport height (what you can see?) */}
            <div className="flex bg-zinc-900  h-16 items-center  ">
              <div className="bg-black ml-32 rounded-md ">
              <p className="pl-4 pr-4 pt-1 pb-1 text-2xl    text-cyan-500">SMF</p>
              </div>
                    {/* our form for the search */}
                    {/*The Value of the input field must be tied to the state variable Name, in order for the test to be seen typing in, and for the the name variable to be used.*/}
                    <form className="flex flex-grow" onSubmit={handleSearch}>
                      <input 
                      className="border-2 text-black rounded-md  bg-white h-10 m-6 flex-grow" 
                      type="text" 
                      placeholder="Search for movies..."
                      value={searchQuery} 
                      onChange={ (e) => setSearchQuery(e.target.value) }
                      /> 
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

            {/* below the header */}
            <div className="flex justify-around"
            style={{
              backgroundImage: 'url("https://media.gettyimages.com/id/1366097039/video/ld-cinema-projector-displaying-a-movie-in-a-dark-room.jpg?s=640x640&k=20&c=CN5c6PaEIdh9QYSjQEVr7hplTLNVaJAou_J_a5i73hI=")',
              backgroundSize: '100% auto',  
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              backgroundRepeat: 'repeat-y' // Centers the image
            }}> 
                  {/* the search results */}
                  <div className="flex flex-wrap m-5 rounded-xl w-3/4" 
                  style={{ minHeight: '100vh' }}
                  >
                  {searchResults.length > 0  ? (
                    <>
                    <MovieList searchResults={searchResults} LikedMovies={LikedMovies} onAddItem={handleLikeMovie} onRemoveItem={handleDeleteMovie} />
                    </>
                  ):(
                    <>
                    {/** can put whatever you want here to display when the array is empty */}
                    </>

                  )
                }
                  </div>

                  {/* Liked movies list */}
                  <div className="flex flex-col items-center  m-5 rounded-xl w-1/4 ">

                  {LikedMovies.length > 0 ? (
                      <>
                      <p>Favourties List</p>
                      <LikedMovieList LikedMovies={LikedMovies} onDeleteItem={handleDeleteMovie}/>
                      </>) : (<></>)}
                  </div>
            </div>
  </main>
  );
}
