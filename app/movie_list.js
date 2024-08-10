"use client";
import Movie from "./movie_item";

export default function MovieList({ArrayOfMovies, Favouritesarray, onRemoveItem, onAddItem}){

  return (
    <>
    <ul className="flex flex-wrap"> 
      {ArrayOfMovies.map((movie) => {
        const likedMovie = Favouritesarray.find((liked) => liked.id == movie.id);
        const isLiked = !!likedMovie;
        const docid = isLiked ? likedMovie.docid : null;

        return (
          <li key={movie.id}>
            <Movie 
              id={movie.id} 
              docid={docid}
              poster_path={movie.poster_path} 
              title={movie.title} 
              release_date={movie.release_date} 
              vote_average={movie.vote_average} 
              overview={movie.overview} 
              onAddItem={onAddItem} 
              onRemoveItem={onRemoveItem} 
              isLiked={isLiked}
            />
          </li>
        );
      })}
    </ul>
    </>
  );
}