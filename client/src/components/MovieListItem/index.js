function MovieListItem(props){
  const movieID = props.movie.id;
  const isLiked = props.likedMovies.indexOf( movieID ) > -1;

  return (
    <div
      className={ `movie${ isLiked ? ' liked': '' }` }
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movie.poster_path})`,
        backgroundSize: 'cover'
      }}
      onClick={ ()=>{
        isLiked ? props.removeLikedMovie( movieID ) : props.addLikedMovie( movieID )
      } }
    >
    </div>
  );
}

export default MovieListItem;