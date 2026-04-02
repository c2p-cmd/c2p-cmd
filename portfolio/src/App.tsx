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
      <div className="content-wrapper">
        <About />
        <Work />
        <Education />
        <Projects />
        <Contact />
      </div>

      <style>{`
        .content-wrapper {
          position: relative;
          z-index: 1;
          width: 50%;
          margin-left: 50%;
          background: var(--bg-primary);
          box-shadow: -10px 0 30px rgba(0,0,0,0.03);
        }

        @media (max-width: 1024px) {
          .content-wrapper {
            width: 100%;
            margin-left: 0;
            box-shadow: none;
          }
        }
      `}</style>
    </>
  );
}
