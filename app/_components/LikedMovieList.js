import LikedMovieItem from "./LikedMovieItem";

export default function LikedMovieList({LikedMovies,onDeleteItem}){


return (
    <div>
        <ul > 
            {LikedMovies.map((movie) => (
            <li  key={movie.id}>
                <LikedMovieItem 
                movie={movie} 
                onDeleteItem={onDeleteItem}
                />
            </li>
            ))}
        </ul>
    </div>
);
}