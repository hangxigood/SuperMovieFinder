"use client";
import Movie from "./movie_item";

export default function MovieList({ArrayOfMovies,onAddItem}){

    
   // console.log(ArrayOfMovies);
return (
    <>
    <ul className="flex flex-wrap"> 
        {ArrayOfMovies.map((movie) => (
        <li key={movie.id}>
            <Movie id={movie.id} poster_path={movie.poster_path} title={movie.title} release_date={movie.release_date} vote_average={movie.vote_average} overview={movie.overview} onAddItem={onAddItem}/>
        </li>
        )
        ) 
    }
    </ul>
    </>
);
}

//lists