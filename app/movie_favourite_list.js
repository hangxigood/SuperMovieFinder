"use client";
import MovieFavourite from "./movie_favourite";

export default function MovieFavourtieList({favouritesarray,onDeleteItem}){

    
    console.log(favouritesarray);

    //you must use the exact same names of your objects varaibles in your list 
    //the same names that are in the object in your database 
return (
    <>
    <ul className="flex flex-wrap"> 
        {favouritesarray.map((movie) => (
        <li key={movie.id}>
            <MovieFavourite id={movie.id} poster_path={movie.poster_path} title={movie.title} onDeleteItem={onDeleteItem}/>
        </li>
        )
        ) 
    }
    </ul>
    </>
);
}