import PageHeader from '../components/PageHeader';
import MovieList from '../components/MovieList';
import TextBody from '../components/TextBody';

function Liked(props){
  const { popularMovies, likedMovies } = props;
  let content;

  if( popularMovies.error ) content = <TextBody>Experienced error while loading liked movies :(</TextBody>;
  else if( ! popularMovies.loaded ) content = <TextBody>Loading liked movies ...</TextBody>;
  else {
    const moviesToRender = popularMovies.movies.filter( movie => likedMovies.liked.indexOf( movie.id ) > -1 );
    const activateLoadMore = moviesToRender.length < likedMovies.liked.length;

    content = (
      <MovieList
        movies={moviesToRender}
        loadMore={ activateLoadMore ? popularMovies.loadMore : null }
        likedMovies={likedMovies.liked}
        addLikedMovie={likedMovies.add}
        removeLikedMovie={likedMovies.rem}
      />
    );
  }

  return ([
    <PageHeader title="Movies You Liked" likedMovies={likedMovies.liked}></PageHeader>,
    content
  ]);
}

export default Liked;