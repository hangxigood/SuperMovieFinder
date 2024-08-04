"use client";
import { useState } from "react";
import MovieFavourite from "./movie_favourite";

export default function MovieFavourtieList({favouritesarray,onDeleteItem, setfavouritesarray}){


console.log('the FA in MFL is :' + favouritesarray)

return (
    <div>
    <ul > 
        {favouritesarray.map((movie) => (
        
        <li  key={movie.id}>
            <MovieFavourite id={movie.id} poster_path={movie.poster_path} title={movie.title} onDeleteItem={onDeleteItem} docid={movie.docid}
             favouritesarray={favouritesarray} movie={movie} setfavouritesarray={setfavouritesarray}/>
        </li>
        )
        ) 
    }
    </ul>
    </div>
);
}