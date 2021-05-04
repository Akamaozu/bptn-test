import PageHeader from '../components/PageHeader';
import MovieList from '../components/MovieList';
import TextBody from '../components/TextBody';

function Home(props){
  const { popularMovies, likedMovies } = props;
  let content;

  if( popularMovies.error ) content = <TextBody>Experienced error while loading popular movies :(</TextBody>;
  else if( ! popularMovies.loaded ) content = <TextBody>Loading popular movies ...</TextBody>;
  else content = (
    <MovieList
      movies={popularMovies.movies}
      loadMore={popularMovies.loadMore}
      likedMovies={likedMovies.liked}
      addLikedMovie={likedMovies.add}
      removeLikedMovie={likedMovies.rem}
     />
  );

  return ([
    <PageHeader title="Popular Movies" likedMovies={likedMovies.liked}></PageHeader>,
    content
  ]);
}

export default Home;