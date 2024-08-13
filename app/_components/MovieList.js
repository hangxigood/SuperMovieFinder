import Movie from "./MovieItem";

export default function MovieList({searchResults, LikedMovies, onAddItem, onRemoveItem }){

  return (
    <>
    <ul className="flex flex-wrap"> 
      {searchResults.map((movie) => {
        const likedMovie = LikedMovies.find((liked) => liked.id == movie.id); //find if movie is in liked list
        const isLiked = !!likedMovie; // if movie is in liked list
        const docid = isLiked ? likedMovie.docid : null; // if movie is in liked list, get the docid
        const movieWithLikedInfo = { ...movie, isLiked, docid }; // add isLiked and docid to movie object

        return (
          <li key={movie.id}>
            <Movie 
              movie={movieWithLikedInfo}
              onAddItem={onAddItem} 
              onRemoveItem={onRemoveItem} 
            />
          </li>
        );
      })}
    </ul>
    </>
  );
}