import { useState, useEffect } from 'react';
import axios from 'axios';

function useMovies(){
  const [ error, setError ] = useState(null);
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ isLoadingMore, setIsLoadingMore ] = useState(false);
  const [ downloadStats, setDownloadStats ] = useState(null);
  const [ downloadedMovies, setDownloadedMovies ] = useState([]);

  useEffect( loadMoreMovies, []);

  function resetMovies(){
    setError(null);
    setIsLoaded(false);
    setIsLoadingMore(false);
    setDownloadStats(null);
    setDownloadedMovies([]);
  }

  function loadMoreMovies(){
    if(isLoadingMore) return;
    if(error) resetMovies();

    let pageToLoad = isLoaded ? downloadStats.last_downloaded_page + 1 : 1;
    if( downloadStats && downloadStats.total_pages && pageToLoad > downloadStats.total_pages ) return;

    setIsLoadingMore(true);

    getMoviesByPage( pageToLoad )
      .then( response => {
        const { page, results, ...stats } = response.data;
        setDownloadStats({ ...stats, last_downloaded_page: page });
        setDownloadedMovies([].concat( downloadedMovies, results ));
        setIsLoadingMore(false);
        if(!isLoaded) setIsLoaded(true);
      })
      .catch(loadError =>{
        if(!isLoaded){
          setError(loadError);
          setIsLoaded(true);
        }

        setIsLoadingMore(false);
      });
  }

  return (
    downloadStats && downloadStats.last_downloaded_page === downloadStats.total_pages
    ? [ error, isLoaded, downloadedMovies, downloadStats ]
    : [ error, isLoaded, downloadedMovies, downloadStats, loadMoreMovies ]
  );
}

function getMoviesByPage( page = 1 ){
  const pageToGet = Number.isInteger( page ) ? page : 1;
  return axios.get( '/api/popular-movies', {
    params: { page: pageToGet }
  });
}

export default useMovies;