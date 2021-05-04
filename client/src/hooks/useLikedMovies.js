import { useState, useEffect } from 'react';

function useLikedMovies(){
  const [ likedMovies, setLikedMovies ] = useState( getLikedMovies() );

  useEffect( ()=>{
    saveLikedMovies( likedMovies );
  }, [ likedMovies ]);

  function addLikedMovie( id ){
    if( likedMovies.indexOf(id) !== -1 ) return;

    setLikedMovies( [].concat( likedMovies, id ) );
  }

  function removeLikedMovie( id ){
    const idIndex = likedMovies.indexOf(id);
    if( idIndex === -1 ) return;

    const filteredLikedMovies = likedMovies.filter( likedId => likedId != id );
    setLikedMovies( filteredLikedMovies );
  }

  return [ likedMovies, addLikedMovie, removeLikedMovie ];
}

function getLikedMovies(){
  let localStorageLikedMovies;

  try {
    localStorageLikedMovies = JSON.parse( localStorage.getItem('likedMovies') );
  }

  catch(error){
    localStorageLikedMovies = [];
  }

  return Array.isArray( localStorageLikedMovies ) ? localStorageLikedMovies : [];
}

function saveLikedMovies( likedMovies ){
  if( ! Array.isArray( likedMovies ) ) return;
  localStorage.setItem( 'likedMovies', JSON.stringify(likedMovies) );
}

export default useLikedMovies;