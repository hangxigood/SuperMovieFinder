// app/api/movieDetails/route.js (for App Router)

import { NextResponse } from 'next/server';
import { cache } from '../../_utils/cache';

const CACHE_TTL = 60 * 60 * 0.05; // 0.05 hours in seconds(3 mins)

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const movieName = searchParams.get('movieName');

//   if (!movieName) {
//     return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
//   }

  // Check cache first
  if (cache.has(`searchName:${movieName}`)) {
    const cachedData = cache.get(`searchName:${movieName}`);
    console.log('Serving from cache');
    return NextResponse.json(cachedData);
  }

  const apiKey = process.env.OMDB_API_KEY;
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&api_key=${apiKey}`);
  const fullData = await response.json();
  console.log('Serving from API');

  // Extract and format only the data we want to cache
  const formattedResults = fullData.results.map(movie => ({
    id: movie.id,
    poster_path: movie.poster_path,
    title: movie.title,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    overview: movie.overview.substring(0, 150) + (movie.overview.length > 150 ? '...' : '')
  }));

  const dataToCache = {
    page: fullData.page,
    results: formattedResults,
    total_pages: fullData.total_pages,
    total_results: fullData.total_results
  };

  // Cache the results
  cache.set(`searchName:${movieName}`, dataToCache, CACHE_TTL);

  return NextResponse.json(fullData);
}