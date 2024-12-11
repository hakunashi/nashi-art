function Header() {
  return (
    <header>
      <h1
        style={{
          cursor: "default",
        }}
      >
        Nashi Art
      </h1>
      <nav style={{ width: "25%" }}>
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <li>
            <a href="#">Dessin</a>
          </li>
          <li>
            <a href="#">Photo</a>
          </li>
          <li>
            <a href="#">Video</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
