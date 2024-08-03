"use client";
import {useState} from "react";
import HeartIcon from "./heart_icon";

export default function Movie({ id, poster_path, title, release_date, vote_average, overview, onAddItem }){





/****************************Add Movie to DB favourites***************************************** */
    const handleSubmit = () => 
        {
            const newFavourite = 
            {
                id, 
                title,
                poster_path
            };
            onAddItem(newFavourite);
            console.log(newFavourite.id,newFavourite.title, newFavourite.poster_path);
        }


    return(
    <div className="border-white border-2 rounded-md m-2 w-80 h-96">
        <div className="flex ">
            <img className="" src={`https://image.tmdb.org/t/p/w185${poster_path}`}/>
            <div className="flex  justify-center flex-col">
                    <p className="font-bold">{title}</p>
                    <p className="mt-3 mb-3">{release_date}</p>
                    <p>Rating:{vote_average}</p>
                   <button className="mt-1 ml-1 w-0" onClick={handleSubmit}><HeartIcon color={'white'}/></button>
            </div>
        </div>
        <p>{overview.substring(0, 150)}{overview.length > 100 ? '...' : ''}</p>
    </div>
    );
}

