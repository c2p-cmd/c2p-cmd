import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Work from "./components/Work";
import Education from "./components/Education";
import Contact from "./components/Contact";
import "./App.css";

export default function App() {
  return (
    <>
      {/* Renders the fixed Canvas and the initial right-side Hero text */}
      <Hero />

      {/* Pushed to the right 50% and given a solid background */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "50%",
          marginLeft: "50%",
          background: "var(--bg-primary)",
          boxShadow: "-10px 0 30px rgba(0,0,0,0.03)",
        }}
        className="content-wrapper"
      >
        <About />
        <Work />
        <Education />
        <Projects />
        <Contact />
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .content-wrapper {
            width: 100% !important;
            margin-left: 0 !important;
          }
        }
      `}</style>
    </>
  );
}
