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

  return (
    <Float rotationIntensity={0.3} floatIntensity={0.3}>
      <group ref={ref}>
        <Controller />
      </group>
    </Float>
  );
}

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const [displayText, setDisplayText] = useState("");
  const textArray = useMemo(() => {
    return displayText.split("\n");
  }, [displayText]);
  const fullText =
    "Press\nA -> About Me\nB -> Work Experience\nX -> Education\nY -> Projects";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const nameOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const nameScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);
  const nameY = useTransform(scrollYProgress, [0, 0.15], [0, -200]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const photoScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  return (
    <>
      {/* 1. FIXED BACKGROUND LAYER */}
      <div
        style={{
          height: "100vh",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          background:
            "linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
          zIndex: 0,
          display: "flex",
        }}
        className="hero-background"
      >
        {/* 3D Canvas pinned to the left 50% */}
        <div
          style={{
            width: "50%",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="controller-container"
        >
          {/* Typing hint bubble */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{
              position: "absolute",
              top: "5%",
              background: "var(--bg-card)",
              padding: "1rem 1.5rem",
              borderRadius: "12px",
              boxShadow: "var(--shadow-lg)",
              border: "2px solid var(--accent)",
              maxWidth: "300px",
              textAlign: "center",
              zIndex: 10,
            }}
            className="hint-bubble"
          >
            <div
              style={{
                position: "relative",
                color: "var(--text-primary)",
                fontSize: "1rem",
                fontWeight: "500",
                minHeight: "2rem",
                textAlign: "left",
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
            {/* Bubble tail */}
            <div
              style={{
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderTop: "10px solid var(--accent)",
              }}
            />
          </motion.div>

          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
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
      {/* Pushed to the right 50% to leave the controller visible */}
      <div
        style={{
          width: "50%",
          marginLeft: "50%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "0 4rem",
          position: "relative",
          zIndex: 1,
        }}
        className="hero-content"
      >
        <motion.div
          style={{
            opacity: nameOpacity,
            scale: nameScale,
            y: nameY,
            textAlign: "left",
            position: "relative",
            width: "100%",
          }}
        >
          <motion.h1
            style={{ marginBottom: "1rem", fontSize: "clamp(3rem, 6vw, 5rem)" }}
          >
            Sharan Thakur
          </motion.h1>
           <motion.p
             style={{
               fontSize: "1.5rem",
               color: "var(--text-secondary)",
               marginBottom: "2rem",
             }}
           >
             AI/ML Researcher & Software Engineer
           </motion.p>
           <motion.div style={{ display: "flex", gap: "1.5rem" }}>
             <a
               href="https://linkedin.com/in/sharan-thakur-a4a0861b5"
               target="_blank"
               rel="noopener noreferrer"
               style={{
                 fontSize: "1.5rem",
                 color: "var(--text-primary)",
                 transition: "color 0.3s ease",
               }}
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
               style={{
                 fontSize: "1.5rem",
                 color: "var(--text-primary)",
                 transition: "color 0.3s ease",
               }}
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

          <motion.div
            style={{
              position: "absolute",
              bottom: "-100px",
              right: "20px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "4px solid var(--accent)",
              boxShadow: "var(--shadow-lg)",
              opacity: photoOpacity,
              scale: photoScale,
            }}
          >
            <img
              src={sharanPhoto}
              alt="Sharan Thakur"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        /* Base styles - Mobile First */
        .hero-background {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .controller-container {
          width: 100%;
          height: 40vh;
          min-height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .hint-bubble {
          position: static;
          margin: 1.5rem auto;
          background: var(--bg-card);
          border: 2px solid var(--accent);
          border-radius: 16px;
          box-shadow: var(--shadow-lg);
          padding: 1rem;
          max-width: 90%;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 500;
        }
        
        .hero-content {
          width: 100%;
          min-height: 60vh;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }
        
        /* Desktop Styles */
        @media (min-width: 1025px) {
          .hero-background {
            flex-direction: row;
            height: 100vh;
          }
          
          .controller-container {
            width: 50%;
            height: 100%;
            min-height: auto;
          }
          
          .hint-bubble {
            position: absolute;
            top: 8%;
            left: 50%;
            transform: translateX(-50%);
            margin: 0;
            max-width: 300px;
          }
          
          .hero-content {
            width: 50%;
            margin-left: 50%;
            height: 100vh;
            min-height: auto;
            padding: 0 4rem;
            justify-content: center;
          }
          
          motion.h1 {
            font-size: clamp(3rem, 6vw, 5rem);
            margin-bottom: 1rem;
          }
          
          motion.p {
            font-size: 1.5rem;
            margin-bottom: 2rem;
          }
          
          motion.div[style*="position: absolute"][style*="bottom: -100px"] {
            position: absolute !important;
            bottom: -100px !important;
            right: 20px !important;
            width: 150px !important;
            height: 150px !important;
          }
        }
        
        /* Mobile Text Scaling */
        @media (max-width: 1024px) {
          motion.h1 {
            font-size: clamp(2rem, 10vw, 3.5rem);
            margin-bottom: 1.5rem;
          }
          
          motion.p {
            font-size: clamp(1.125rem, 6vw, 1.75rem);
            line-height: 1.4;
            margin-bottom: 2rem;
          }
          
          /* Mobile Image */
          motion.div[style*="position: absolute"][style*="bottom: -100px"] {
            position: static !important;
            margin: 2rem auto !important;
            width: 120px !important;
            height: 120px !important;
            border-radius: 50% !important;
            border: 4px solid var(--accent) !important;
            box-shadow: var(--shadow-lg) !important;
          }
          
          /* Improve spacing on very small screens */
          @media (max-width: 480px) {
            .controller-container {
              height: 35vh;
              min-height: 200px;
            }
            
            .hero-content {
              min-height: 50vh;
              padding: 1.5rem;
            }
            
            motion.h1 {
              font-size: clamp(1.75rem, 12vw, 3rem);
              margin-bottom: 1rem;
            }
            
            motion.p {
              font-size: clamp(1rem, 8vw, 1.5rem);
              margin-bottom: 1.5rem;
            }
            
            .hint-bubble {
              margin: 1rem auto;
              padding: 0.875rem;
              font-size: 0.85rem;
            }
            
            motion.div[style*="position: static"][style*="margin: 2rem auto"] {
              width: 100px !important;
              height: 100px !important;
            }
          }
        }
      `}</style>
    </>
  );
}
