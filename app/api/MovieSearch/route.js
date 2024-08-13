// app/api/MovieSearch/route.js (for App Router)

import { NextResponse } from 'next/server';
import { cacheForSearch, cacheForMovie } from '../../_utils/cache';

const CACHE_TTL = 60 * 60 * 0.05; // 0.05 hours in seconds(3 mins)
const MAX_CACHED_RESULTS = 100; // Limit the number of results to cache

export async function GET(request) {

  const { searchParams } = new URL(request.url);
  const searchKeyWord = searchParams.get('searchKeyWord');
  const searchId = searchParams.get('searchId');

  /************************** For search by ID *****************************/

  // https://api.themoviedb.org/3/movie/185526?api_key=de85768f0d74622c7361ecc14c017ec1

  if (searchId) {

    // Check cache first
    if (cacheForMovie.has(`searchId:${searchId}`)) {
      const cachedData = cacheForMovie.get(`searchId:${searchId}`);
      console.log('Serving from cache');
      return NextResponse.json(cachedData);
    }

    const apiKey = process.env.OMDB_API_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/movie/${searchId}?api_key=${apiKey}`);
    const movieDetail = await response.json();
    console.log('Serving from API');

    // Cache the results

    const dataToCache = {
        id: movieDetail.id,
        poster_path: movieDetail.poster_path,
        title: movieDetail.title
    };
    
    cacheForMovie.set(`searchId:${searchId}`, dataToCache, CACHE_TTL);

    return NextResponse.json(movieDetail);

  }
  /************************** For search *****************************/
  
  if (searchKeyWord) {
    // Check cache first
    if (cacheForSearch.has(`searchName:${searchKeyWord}`)) {
        const cachedData = cacheForSearch.get(`searchName:${searchKeyWord}`);
        console.log('Serving from cache');
        return NextResponse.json(cachedData);
    }

    const apiKey = process.env.OMDB_API_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchKeyWord}&api_key=${apiKey}`);
    const searchResults = await response.json();
    console.log('Serving from API');

    // Extract and format only the data we want to cache, limiting to MAX_CACHED_RESULTS
    const formattedResults = searchResults.results.slice(0, MAX_CACHED_RESULTS).map(movie => ({
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        overview: movie.overview.substring(0, 150) + (movie.overview.length > 150 ? '...' : '')
    }));

    const dataToCache = {
        page: searchResults.page,
        results: formattedResults,
        total_pages: searchResults.total_pages,
        total_results: searchResults.total_results
    };

    // Cache the results
    cacheForSearch.set(`searchName:${searchKeyWord}`, dataToCache, CACHE_TTL);

    return NextResponse.json(searchResults);

    }

    return NextResponse.error(new Error('Invalid search parameters'));

}