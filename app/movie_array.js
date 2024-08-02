"use client";
import {useState} from "react";
import { useEffect } from "react";


//takes a string parameter to query API with, returns an array
export default function MovieArray({name,setMovieArray}){

    console.log(name + 'This is in movie_array.js')
    useEffect(() => {
        if (name) {
            UpdateMovieArray();
        }
    }, [name,setMovieArray]);
    
    
async function UpdateMovieArray() {
    const NewMovieArray = await fetchMovieArray(name);
    setMovieArray(NewMovieArray)
    }




        return(
                    <>
                    </>
        );
    }





async function fetchMovieArray(moviename) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${moviename}&api_key=de85768f0d74622c7361ecc14c017ec1`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.results) {
            return data.results;
        } else {
            return;
        }
    } catch (error) {
        console.log(error.message);
        return [];

    }
}

