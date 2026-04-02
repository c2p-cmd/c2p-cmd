import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import React, { Suspense, useState, useEffect, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import Controller from "./Controller";
import sharanPhoto from "../assets/SharanPhoto3.jpg";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

function Scene() {
  const ref = React.useRef<THREE.Group>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Float rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={ref} scale={isMobile ? 1.2 : 1}>
        <Controller />
      </group>
    </Float>
  );
}

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const [displayText, setDisplayText] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textArray = useMemo(() => {
    return displayText.split("\n");
  }, [displayText]);

  const fullText = isMobile
    ? "A: About | B: Work | X: Education | Y: Project"
    : "Press\nA -> About Me\nB -> Work Experience\nX -> Education\nY -> Projects";

  useEffect(() => {
    let index = 0;
    setDisplayText(""); // Reset display text when fullText changes (e.g. on resize)
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [fullText]);

  const nameOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);
  const nameY = useTransform(scrollYProgress, [0, 0.15], [0, -200]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  return (
    <>
      {/* 1. FIXED BACKGROUND LAYER */}
      <div className="hero-background">
        {/* Typing hint bubble - outside container so it doesn't squash the canvas */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="hint-bubble"
        >
          <div
            style={{
              position: "relative",
              color: "var(--text-primary)",
              fontSize: "1rem",
              fontWeight: "500",
              minHeight: isMobile ? "1.2rem" : "2rem",
              textAlign: "left",
              lineHeight: "1.2",
            }}
          >
            {textArray.map((line, idx) => (
              <React.Fragment key={idx}>
                {line}
                {idx !== textArray.length - 1 && <br></br>}
              </React.Fragment>
            ))}
            <span style={{ animation: "blink 1s infinite" }}>|</span>
          </div>
          {/* Bubble tail - only visible on desktop where it's absolute */}
          <div className="bubble-tail" />
        </motion.div>

        {/* 3D Canvas container */}
        <div className="controller-container">
          <Canvas
            camera={{
              position: [0, 0, window.innerWidth <= 768 ? 4 : 5],
              fov: 45,
            }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* 2. SCROLLING HERO CONTENT LAYER */}
      <div className="hero-content">
        <motion.div
          style={{
            opacity: nameOpacity,
            scale: nameScale,
            y: nameY,
            textAlign: "left",
            justifyItems: "center",
            position: "relative",
            width: "100%",
          }}
          className="name-container"
        >
          <motion.div
            style={{
              opacity: photoOpacity,
              scale: photoScale,
            }}
            className="hero-photo-container"
          >
            <img
              src={sharanPhoto}
              alt="Sharan Thakur"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          <motion.h1 className="hero-title">Sharan Thakur</motion.h1>
          <motion.p className="hero-subtitle">
            AI/ML Researcher & Software Engineer
          </motion.p>
          <motion.div
            style={{ display: "flex", gap: "1.5rem", justifyItems: "center" }}
          >
            <a
              href="https://linkedin.com/in/sharan-thakur-a4a0861b5"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/c2p-cmd/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
            >
              <FaGithub />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .hero-background {
          height: 100vh;
          width: 100%;
          position: fixed;
          top: 0;
          left: 0;
          background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
          z-index: 0;
          display: flex;
        }

        .controller-container {
          width: 50%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .hint-bubble {
          position: absolute;
          top: 5%;
          left: 25%;
          transform: translateX(-50%);
          background: var(--bg-card);
          padding: 1rem 1.5rem;
          border-radius: 12px;
          box-shadow: var(--shadow-lg);
          border: 2px solid var(--accent);
          max-width: 300px;
          text-align: center;
          z-index: 10;
        }

        .bubble-tail {
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 10px solid var(--accent);
        }

        .hero-content {
          width: 50%;
          margin-left: 50%;
          height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 4rem;
          position: relative;
          z-index: 1;
        }

        .hero-title {
          margin-bottom: 1rem;
          font-size: clamp(3rem, 6vw, 5rem);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        .social-link {
          font-size: 1.5rem;
          color: var(--text-primary);
          transition: color 0.3s ease;
        }

        .social-links-container {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin-top: 1rem;
        }

        .hero-photo-container {
          position: relative;
          margin-bottom: 2rem;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--accent);
          box-shadow: var(--shadow-lg);
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .hero-background {
            position: relative;
            height: auto;
            flex-direction: column;
            display: block;
          }

          .controller-container {
            width: 100%;
            height: 40vh;
            min-height: 300px;
          }

          .hero-content {
            width: 100%;
            margin-left: 0;
            height: auto;
            min-height: 60vh;
            padding: 2rem;
            justify-content: center;
          }

          .hint-bubble {
            position: relative;
            top: auto;
            left: auto;
            transform: none;
            margin: 2rem auto 0;
            max-width: 90%;
            padding: 0.5rem 1rem;
          }

          .hint-bubble > div {
            min-height: 1rem !important;
            font-size: 0.875rem !important;
          }

          .bubble-tail {
            display: none;
          }

          .name-container {
            text-align: center !important;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-photo-container {
            position: static;
            margin: 0 auto 2rem;
            width: 120px;
            height: 120px;
          }
          
          .hero-title {
            font-size: clamp(2.5rem, 8vw, 4rem);
          }
          
          .hero-subtitle {
            font-size: 1.25rem;
          }
        }

        @media (max-height: 500px) and (orientation: landscape) {
          .hero-photo-container {
            width: 80px;
            height: 80px;
            margin: 0 auto 1rem !important;
          }
          .hero-title {
            font-size: 1.5rem !important;
            margin-bottom: 0.5rem !important;
          }
          .hero-subtitle {
            font-size: 1rem !important;
            margin-bottom: 1rem !important;
          }
          .hero-content {
            min-height: 80vh !important;
          }
        }

        @media (max-width: 480px) {
          .controller-container {
            height: 35vh;
          }
          
          .hero-content {
            padding: 1.5rem;
          }
          
          .hero-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
