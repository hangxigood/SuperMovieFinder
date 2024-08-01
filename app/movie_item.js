
import { SlHeart } from "react-icons/sl";
import HeartIcon from "./heart_icon";

export function Movie(props){
    return(
    <div className="border-white border-2 rounded-md m-2">
        <div className=" flex  ">
            <img className="w-80" src={`https://image.tmdb.org/t/p/w500${props.poster_path}`}/>
            <div className="flex justify-center flex-col">
                    <p className="font-bold">{props.title}</p>
                    <p className="mt-3 mb-3">{props.release_date}</p>
                    <p>Rating:{props.vote_average}</p>
                   <button className="mt-1 ml-1" ><HeartIcon color={'white'}/></button>
            </div>
        </div>
        <p>{props.overview}</p>
    </div>
    );
}

