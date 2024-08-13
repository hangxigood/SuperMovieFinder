import XIcon from "./x_icon";

export default function LikedMovieItem({ movie, onDeleteItem}){

    return(
        <div>
            <div className="rounded-md m-10">          
                    <div className=" flex flex-col items-center justify-center">
                        <img className=" rounded-xl" src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}/>
                        <p className=" text-white font-bold">{movie.title}</p>
                        <button className="  " onClick={async ()=> { await onDeleteItem(movie) }} > <XIcon color={'red'}/> </button>
                    </div>
            </div>
        </div>
    );
}