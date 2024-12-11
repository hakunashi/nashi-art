import SectionAll from "./pages/SectionAll";
import SideSection from "./SideSection";

function Main() {
  return (
    <main
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SideSection />
      <SectionAll />
    </main>
  );
}

export default Main;
