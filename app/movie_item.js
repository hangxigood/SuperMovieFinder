"use client";
import {useState} from "react";
import HeartIcon from "./heart_icon";

export default function Movie({ id, docid, poster_path, title, release_date, vote_average, overview, onAddItem, onRemoveItem, isLiked }) {





/****************************Add Movie to DB favourites***************************************** */
    const handleClick = () => 
        {
            const newFavourite = 
            {
                id, 
                title,
                poster_path
            };

            if (isLiked) {
                onRemoveItem(docid);
              } else {
                onAddItem(newFavourite);
                console.log(newFavourite.id,newFavourite.title, newFavourite.poster_path);
              }
        }


    return(
    <div className=" rounded-md m-2 w-80 h-96">
        <div className="flex ">
            <img className="rounded-xl mr-2" src={`https://image.tmdb.org/t/p/w185${poster_path}`}/>
            <div className="flex  justify-center flex-col">
                    <p className="font-bold text-white">{title}</p>
                    <p className="mt-3 mb-3 text-white">{release_date}</p>
                    <p className="text-white">Rating:{vote_average}</p>
                   <button className="mt-1 ml-1 w-0" onClick={handleClick}>
                    <HeartIcon color={isLiked ? "red" : "blue"}/>
                    </button>
            </div>
        </div>
        <p className="text-white">{overview.substring(0, 150)}{overview.length > 100 ? '...' : ''}</p>
    </div>
    );
}

