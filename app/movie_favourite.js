"use client";
import {useState} from "react";
import HeartIcon from "./heart_icon";

export default function MovieFavourite({ id, poster_path, title, onDeleteItem }){
    const [favid, setFavid] = useState(id);
    const [favtitle, setFavtitle] = useState(title);
    const [favposter_path, setFavposter_path] = useState(poster_path);
    





    return(
    <div className="border-white border-2 rounded-md m-2 w-80 h-96">
        <div className="flex ">
            <img className="" src={`https://image.tmdb.org/t/p/w185${poster_path}`}/>

        </div>
        <div className="flex  justify-center flex-col">
                    <p className="font-bold">{title}</p>
            </div>
    </div>
    );
}