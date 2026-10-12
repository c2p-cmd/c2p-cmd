interface Project {
  title: string;
  desc: string;
  tags: string[];
  link: string | string[];
  img?: string;
}

interface Research {
  title: string;
  desc: string;
  status: string;
  link?: string;
}

const projectList: Project[] = [
  {
    title: "Agentic AI Debate Simulator",
    desc: "Multi-agent orchestration system with tool use for simulating debates",
    tags: ["AI", "Multi-agent", "LLM"],
    link: "https://github.com/c2p-cmd/win_my_argument",
    img: "https://raw.githubusercontent.com/c2p-cmd/win_my_argument/master/screenshots/thumbnail.png",
  },
  {
    title: "ScrollCast",
    desc: "Full-stack news aggregation platform with real-time updates",
    tags: ["Full-stack", "Real-time", "News"],
    link: [
      "https://github.com/c2p-cmd/scroll_cast",
      "https://www.youtube.com/watch?v=UjMPYivrAcI",
    ],
    img: "https://raw.githubusercontent.com/c2p-cmd/scroll_cast/master/thumbnail.png",
  },
  {
    title: "Image Generative Models with MLX",
    desc: "Trained and deployed Image Generative models on Apple Silicone",
    tags: ["On-Device Inference", "GenAI"],
    link: [
      "https://github.com/c2p-cmd/all_about_gans",
      "https://www.youtube.com/watch?v=-rIP5dT_nKY",
    ],
    img: "https://raw.githubusercontent.com/c2p-cmd/all_about_gans/master/screenshots/thumbnail.png",
  },
  {
    title: "Lookout Dual Camera Recorder",
    desc: "Published iPhone, Mac, and Apple Watch app for simultaneously recording front and rear camera video, with hands-free controls and remote Apple Watch previews.",
    tags: ["iOS", "macOS", "Apple Watch"],
    link: "https://apps.apple.com/us/app/lookout-dual-camera-recorder/id6744577632",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/a6/d9/26/a6d926c3-3fb5-6c86-1979-83805d16641d/AppIcon-0-0-1x_U007ephone-0-1-0-GLES2_U002c0-85-220.png/512x512bb.jpg",
  },
  {
    title: "Kaal: Divine Watch Faces",
    desc: "Published app offering a curated collection of cultural and devotional Apple Watch face designs, with simple browsing, previews, and personalization.",
    tags: ["iOS", "Apple Watch", "Published"],
    link: "https://apps.apple.com/in/app/kaal-divine-watch-faces/id6448176042",
    img: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/81/6b/4a/816b4a44-51c8-75df-c1cd-27b2da91dbfc/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg",
  },
];

const researchList: Research[] = [
  {
    title:
      "Network Slicing Performance Analysis on an Open-Source-Based 5G Nomadic Node",
    desc: "Designed and evaluated a containerized 5G SA slicing testbed (Open5GS, UERANSIM, Kamailio, Prometheus/Grafana) on a nomadic edge node; demonstrated measurable QoS differentiation in packet loss and jitter across traffic priority classes.",
    status: "Published at CITS 2026",
    link: "https://ieeexplore.ieee.org/abstract/document/11637331",
  },
  {
    title:
      "An Empirical Study of Compute Platform Influence on 5G gNB Performance and Energy Efficiency Using srsRAN",
    desc: "Empirically compared srsRAN gNB on x86 and Raspberry Pi using a USRP B210 + Nokia X30 UE; Pi achieved 5× lower power at competitive throughput.",
    status: "Accepted at SoftCOM 2026",
  },
  {
    title:
      "End-to-End Network Slicing with Radio-Level QoS in a Fully Virtualized Kubernetes 5G Testbed",
    desc: "Built a containerized 5G testbed with Open5GS, srsRAN, UERANSIM, and Kubernetes to evaluate radio-level QoS across network slices. Benchmarks across 60 test runs showed slice differentiation in a virtualized environment, alongside compute overhead, bandwidth, and deployment complexity tradeoffs.",
    status: "Accepted at SoftCOM 2026",
  },
  {
    title:
      "Simulated Real-Time Experiments toward LLM-based Agentic Core Networks",
    desc: "Benchmarked edge-deployable open-weight LLMs for 6G core networks and studied their use in real-time mobility decisions. Proposed fast-path/slow-path and hybrid heuristic-LLM approaches, evaluated in simulated mobility experiments against a refined UE-to-BS association baseline.",
    status: "Accepted at FNWF'26",
  },
  {
    title:
      "Evaluating Apple's MLX Framework for Machine Learning: A Comparative Study of K-Means",
    desc: "Conducted experimental evaluation of Apple’s MLX framework for machine learning workloads, benchmarking K-Means algorithm and analyzing GPU acceleration performance on Apple Silicon.",
    status: "Preprint",
    link: "https://doi.org/10.6084/m9.figshare.30574280",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        background: "var(--bg-primary)",
        padding: "3rem 2rem 3rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Projects & Research</h2>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}
        >
          {/* Projects Section */}
          <div>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                color: "var(--accent)",
              }}
            >
              Featured Projects
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {projectList.map((p, index) => (
                <div
                  key={index}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow)",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow)";
                  }}
                >
                  {p.img && (
                    <div
                      style={{
                        width: "100%",
                        height: "210px",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={p.img}
                        alt={`${p.title} thumbnail`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      {/* <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                          color: "white",
                          padding: "0.75rem",
                          fontSize: "0.9rem",
                          textAlign: "center",
                          fontWeight: "500",
                        }}
                      >
                        {p.title}
                      </div> */}
                    </div>
                  )}
                  <div style={{ padding: "1.5rem" }}>
                    <h4
                      style={{
                        marginBottom: "0.75rem",
                        color: "var(--text-primary)",
                      }}
                    >
                      {p.title}
                    </h4>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        marginBottom: "1rem",
                        lineHeight: "1.5",
                      }}
                    >
                      {p.desc}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                        marginBottom: "1rem",
                        width: "100%",
                      }}
                    >
                      {p.tags.map((tag, j) => (
                        <span
                          key={j}
                          style={{
                            flexGrow: 1,
                            textAlign: "center",
                            padding: "0.25rem 0.6rem",
                            background: "var(--accent-glow)",
                            color: "var(--accent)",
                            borderRadius: "15px",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.75rem",
                        flexWrap: "wrap",
                        width: "100%",
                      }}
                    >
                      {Array.isArray(p.link) ? (
                        p.link.map((link, idx) => (
                          <a
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              flexGrow: 1,
                              textAlign: "center",
                              padding: "0.4rem 0.8rem",
                              background: "var(--accent)",
                              color: "white",
                              borderRadius: "6px",
                              fontSize: "0.8rem",
                              textDecoration: "none",
                              transition: "all 0.2s ease",
                            }}
                          >
                            {link.includes("github")
                              ? "View Project"
                              : link.includes("youtube")
                                ? "Watch Demo"
                                : link.replace("https://", "")}
                          </a>
                        ))
                      ) : (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: "inline-block",
                            flexGrow: 1,
                            textAlign: "center",
                            padding: "0.4rem 0.8rem",
                            background: "var(--accent)",
                            color: "white",
                            borderRadius: "6px",
                            fontSize: "0.8rem",
                            textDecoration: "none",
                            transition: "all 0.2s ease",
                          }}
                        >
                          {p.link.includes("apps.apple.com")
                            ? "View on App Store"
                            : "View Project"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research Section */}
          <div>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "1.5rem",
                color: "var(--accent)",
              }}
            >
              Research & Publications
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              {researchList.map((r, index) => (
                <div
                  key={index}
                  style={{
                    background: "var(--bg-card)",
                    borderRadius: "12px",
                    boxShadow: "var(--shadow)",
                    border: "1px solid var(--border)",
                    padding: "1.5rem",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-lg)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow)";
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      padding: "0.2rem 0.7rem",
                      marginBottom: "0.75rem",
                      background: "var(--accent-glow)",
                      color: "var(--accent)",
                      borderRadius: "15px",
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {r.status}
                  </div>
                  <h4
                    style={{
                      marginBottom: "0.75rem",
                      color: "var(--text-primary)",
                    }}
                  >
                    {r.title}
                  </h4>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "1rem",
                      lineHeight: "1.6",
                    }}
                  >
                    {r.desc}
                  </p>
                  {r.link && (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        padding: "0.5rem 1.25rem",
                        background: "var(--accent)",
                        color: "white",
                        borderRadius: "6px",
                        fontSize: "0.9rem",
                        textDecoration: "none",
                        fontWeight: "500",
                        transition: "all 0.2s ease",
                      }}
                    >
                      Read Paper →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
