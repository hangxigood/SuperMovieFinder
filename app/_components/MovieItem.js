
import HeartIcon from "./heart_icon";

export default function MovieItem({ movie, onAddItem, onRemoveItem }) {


/****************************Add Movie to DB favourites***************************************** */
    const handleClick = () => 
        {
            if (movie.isLiked) {
                onRemoveItem(movie);
              } else {
                onAddItem(movie);
              }
        }
    return(
    <div className=" rounded-md m-2 w-80 h-96">
        <div className="flex ">
            <img className="rounded-xl mr-2" src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}/>
            <div className="flex  justify-center flex-col">
                    <p className="font-bold text-white">{movie.title}</p>
                    <p className="mt-3 mb-3 text-white">{movie.release_date}</p>
                    <p className="text-white">Rating:{movie.vote_average}</p>
                   <button className="mt-1 ml-1 w-0" onClick={handleClick}>
                    <HeartIcon color={movie.isLiked ? "red" : "white"}/>
                    </button>
            </div>
        </div>
        <p className="text-white">{movie.overview.substring(0, 150)}{movie.overview.length > 100 ? '...' : ''}</p>
    </div>
    );
}

