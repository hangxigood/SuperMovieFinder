"use client";
import {useState} from "react";
import { SlMagnifier } from "react-icons/sl";
import {Movie} from "./movie_item";
import MovieList from "./movie_list";
import MovieArray from "./movie_array";


export default function Page() {

  const [ArrayOfMovies,setMovieArray] = useState([]);
  var [name, setName] = useState("");
  var [searchbar, setSearchBar] = useState("");


  //temp array 
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(name + 'this is in page.js');
    if (searchbar.trim() === '') {
      setMovieArray([]);
    } else {
      setName(searchbar);
    }

  }

//this shows the text in the search bar
  const handleNameChange = (event) =>
    {setSearchBar(event.target.value);}


//temp object
const tempobj = {
  "id": 11,
  poster_path : "/jNjT5y95BToczcxgVPl1NBB7goY.jpg",
  title : "Star Wars",
  "release_date": "1977-05-25",
  "overview" : "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.",
  "vote_average": 8.2
};


return (
  <main className="flex flex-col h-dvh ">
      {/* h-dvh sets the height of the entire div to the display viewport height (what you can see?) */}
      <nav className="flex bg-zinc-900  h-16 items-center  ">

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
          <p className="mr-14">User Name</p>
          <p className="mr-10">Logout button</p>
        </div>
      </nav>


      {/* Comment text here */}
      {/* Flex-1 controls the height of the divs causeing them to take up the entire leftover height minus the nav bar*/}
      <div className="flex  justify-around bg-cover bg-center "> 
            <div className="flex flex-wrap border-white border-2 m-5 rounded-xl w-3/4 ">
            {ArrayOfMovies.length > 0  ? (
              <>
              <MovieArray name={name} setMovieArray={setMovieArray}/>
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


    


//<Movie poster_path={tempobj.poster_path} title={tempobj.title} release_date={tempobj.release_date} vote_average={tempobj.vote_average} overview={tempobj.overview}/> 
