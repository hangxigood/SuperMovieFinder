"use client";
import {useState} from "react";
import XIcon from "./x_icon";

export default function MovieFavourite({poster_path, title, onDeleteItem, docid, favouritesarray, movie,setfavouritesarray}){

    //console.log('the FA in MF is:'+ favouritesarray);
    //console.log('the docid in  MF is:' + docid);

    const handleClick  = async () => 
        {
           await onDeleteItem(docid);
            
        }


    return(
        <div>
            
            <div className="rounded-md m-10">
            
                    <div className=" flex flex-col items-center justify-center">
                    
                    <img className=" rounded-xl" src={`https://image.tmdb.org/t/p/w185${poster_path}`}/>
                            <p className=" text-white font-bold">{title}</p>
                            <button className="  " onClick={handleClick} > <XIcon color={'red'}/> </button>
                    </div>
            </div>
    </div>
    );
}