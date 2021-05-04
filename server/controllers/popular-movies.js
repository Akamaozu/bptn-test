const got = require('got');
const md5 = require('md5');
const moviedb_api_url = 'https://api.themoviedb.org/3/movie';
const moviedb_api_key = process.env.MOVIEDB_API_KEY;
const moviedb_api_cache_duration_mins = process.env.MOVIEDB_API_CACHE_DURATION_MINS || 60;
let cache;

if( ! moviedb_api_key ) throw new Error( 'MOVIEDB API KEY not specified' );

async function get_stats(){
  if( ! await is_cache_valid() ) await prime_cache();
  const { pages, ...stats } = cache;
  return stats;
}

async function get_by_page( page = 1 ){
  if( ! await is_cache_valid() ) await prime_cache();
  if( ! cache.pages[ page ]  ){
    console.log( 'action=popular-movies-page-cache-hit success=false page='+ page );

    cache.pages[ page ] = await get_by_page_from_api( page );
    console.log( 'action=cache-moviedb-popular-movies-page success=true page='+ page );
    console.log( 'action=log-cached-moviedb-popular-movies-pages pages='+ Object.keys( cache.pages ).join(',') );
  }

  const { signature, total_pages, total_results, pages:{ [ page ]: results } } = cache;

  return {
    signature,
    total_pages,
    total_results,
    page,
    results
  };
}

async function get_by_page_from_api( page = 1 ){
  const api_response = await got( moviedb_api_url + '/popular', {
    searchParams: {
      api_key: moviedb_api_key,
      page
    }
  });

  const response_body = JSON.parse( api_response.body );
  return response_body.results;
}

async function get_popular_movie_stats_from_api(){
  const api_response = await got( moviedb_api_url + '/popular', {
    searchParams: {
      api_key: moviedb_api_key
    }
  });

  const received = Date.now();
  const signature = md5( api_response.body );
  const { results, page, ...stats } = JSON.parse( api_response.body );

  return {
    received,
    signature,
    ...stats,
    pages: {
      1: results
    }
  };
}

async function prime_cache(){
  if( await is_cache_valid() ) return;

  cache = await get_popular_movie_stats_from_api();
  console.log( 'action=prime-moviedb-api-cache pages='+ Object.keys( cache.pages ).join(',') );
}

async function is_cache_valid(){
  if( ! cache ) return false;

  const ms_since_cached = Date.now() - cache.received;
  const mins_since_cached = ms_since_cached / ( 1000 * 60 );

  if( mins_since_cached < moviedb_api_cache_duration_mins ) return true;

  const current_stats = await get_popular_movie_stats_from_api();
  if( current_stats.signature !== cache.signature ) return false;

  cache.received = current_stats.received;
  return true;
}

module.exports = {
  get_stats,
  get_by_page
}