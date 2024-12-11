import SideTitle from "./SideTitle";

function SideSection() {
  return (
    <>
      <SideTitle
        style={{
          top: "70vh",
          left: "0px",
          rotate: "-90deg",
        }}
      >
        Nashi
      </SideTitle>
      <SideTitle
        style={{
          top: "10vh",
          right: "0px",
          rotate: "90deg",
        }}
      >
        Art
      </SideTitle>
    </>
  );
}

export default SideSection;
