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
      {/* <nav>
        <ul>
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#work">Work</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav> */}
      <Hero />
      <About />
      <Work />
      <Education />
      <Projects />
      <Contact />
    </>
  );
}
