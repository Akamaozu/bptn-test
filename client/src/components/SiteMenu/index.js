import SiteMenuItem from "../SiteMenuItem";

function SiteMenu(props){
  const items = props.items && Array.isArray(props.items)
                ? props.items
                : [];

  return (
    <div className="SiteMenu">
      { items.map( item => <SiteMenuItem {...item} /> ) }
    </div>
  );
}

export default SiteMenu;