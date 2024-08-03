"use client";
import { useState } from "react";
import MovieFavourite from "./movie_favourite";

export default function MovieFavourtieList({favouritesarray,onDeleteItem}){


return (
    <div>
    <ul > 
        {favouritesarray.map((movie) => (
        
        <li  key={movie.id}>
            <MovieFavourite  id={movie.id} poster_path={movie.poster_path} title={movie.title} onDeleteItem={onDeleteItem} docid={movie.docid}/>
        </li>
        )
        ) 
    }
    </ul>
    </div>
);
}