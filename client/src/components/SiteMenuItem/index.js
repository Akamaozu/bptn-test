import { Link, useRouteMatch } from "react-router-dom";

function SiteMenuItem(props){
  const { label, url, exactMatch = false } = props;
  const match = useRouteMatch({ path: url, exact: exactMatch });
  const className = "SiteMenuItem" + ( match ? " active" : "" );

  return <div className={ className }><Link to={ url }>{ label }</Link></div>
}

export default SiteMenuItem;