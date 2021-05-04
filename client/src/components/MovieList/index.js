import { useState } from 'react';
import MovieListItem from '../MovieListItem';

function MovieList(props){
  const { movies, loadMore, ...likedMovies } = props;
  const content = movies.length > 0
                  ? movies.map( movie => <MovieListItem movie={movie} {...likedMovies}></MovieListItem> )
                  : <div>No Movies Found</div>;

  let itemsToRender = [].concat( content );

  if(loadMore && typeof loadMore === 'function'){
    itemsToRender = itemsToRender.concat(
      <div className="loadMore" onClick={loadMore}>Load More Movies</div>
    );
  }

  return (
    <div className="MovieList">{ itemsToRender }</div>
  );
}

export default MovieList;