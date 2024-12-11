function SideTitle(props) {
  return (
    <aside className="sideTitle" style={props.style}>
      {props.children}
    </aside>
  );
}

export default SideTitle;
