import Logo from '../Logo';
import SiteMenu from '../SiteMenu';

function PageHeader(props){
  const { title, likedMovies } = props;
  return (
    <div className="PageHeader">
      <Logo />
      <SiteMenu items={ [{ label: 'home', url: '/', exactMatch: true }, { label: `liked (${likedMovies.length})`, url: '/liked' }] } />
      <div className="PageHeaderTitle">{ title || "untitled page" }</div>
    </div>
  );
}

export default PageHeader;