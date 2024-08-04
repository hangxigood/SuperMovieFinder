"use client";
import {useState} from "react";
import XIcon from "./x_icon";

export default function MovieFavourite({poster_path, title, onDeleteItem, docid, favouritesarray, movie,setfavouritesarray}){

    console.log('the FA in MF is:'+ favouritesarray);
    console.log('the docid in  MF is:' + docid);

    const handleClick  = async () => 
        {
           await onDeleteItem(docid);
            setfavouritesarray([...favouritesarray.filter(m => m !== movie)])
        }


    return(
        <div>
            
            <div className="flex flex-col  border-white border-2 rounded-md m-10">
            
                    <div className=" flex flex-col items-center justify-center">
                    <button className="  " onClick={handleClick} > <XIcon color={'white'}/> </button>
                    <img className=" rounded-xl" src={`https://image.tmdb.org/t/p/w185${poster_path}`}/>
                            <p className="font-bold">{title}</p>
                    </div>
            </div>
    </div>
    );
}