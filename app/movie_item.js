"use client";
import {useState} from "react";
import { SlHeart } from "react-icons/sl";
import HeartIcon from "./heart_icon";

export default function Movie(props){
    return(
    <div className="border-white border-2 rounded-md m-2 w-80 h-96">
        <div className="flex ">
            <img className="" src={`https://image.tmdb.org/t/p/w185${props.poster_path}`}/>
            <div className="flex  justify-center flex-col">
                    <p className="font-bold">{props.title}</p>
                    <p className="mt-3 mb-3">{props.release_date}</p>
                    <p>Rating:{props.vote_average}</p>
                   <button className="mt-1 ml-1 w-0" ><HeartIcon color={'white'}/></button>
            </div>
        </div>
        <p>{props.overview.substring(0, 150)}{props.overview.length > 100 ? '...' : ''}</p>
    </div>
    );
}

