import PageHeader from '../components/PageHeader';
import TextBody from '../components/TextBody';

function NotFound(props){
  const { likedMovies } = props;
  return ([
    <PageHeader title="Page Not Found" likedMovies={likedMovies.liked} />,
    <TextBody>Sorry, unable to load this page.</TextBody>
  ]);
}

export default NotFound;