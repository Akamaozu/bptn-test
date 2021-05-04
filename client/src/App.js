import { BrowserRouter, Switch, Route } from 'react-router-dom';
import useMovies from './hooks/useMovies';
import useLikedMovies from './hooks/useLikedMovies';
import HomePage from './pages/Home.js';
import LikedPage from './pages/Liked.js';
import NotFoundPage from './pages/NotFound.js';

function App() {
  const [ movieError, moviesLoaded, movies, downloadStats, loadMoreMovies ] = useMovies();
  const [ likedMovies, addLikedMovie, removeLikedMovie ] = useLikedMovies();

  const popularMovies = { loaded: moviesLoaded, error: movieError, movies: movies, stats: downloadStats, loadMore: loadMoreMovies };
  const likedPopularMovies = { liked: likedMovies, add: addLikedMovie, rem: removeLikedMovie };

  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/'><HomePage popularMovies={popularMovies} likedMovies={likedPopularMovies} /></Route>
          <Route path='/liked'><LikedPage popularMovies={popularMovies} likedMovies={likedPopularMovies} /></Route>
          <Route path='*'><NotFoundPage likedMovies={likedPopularMovies} /></Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
