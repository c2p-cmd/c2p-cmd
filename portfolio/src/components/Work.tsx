interface WorkExperience {
  company: string;
  title: string;
  duration: string;
  tasks: string[];
}

const workEx: WorkExperience[] = [
  {
    company: "Fraunhofer FOKUS",
    title: "Working Student AI/ML Researcher for Next Generation Networks (5G)",
    duration: "Feb 2025 - Present",
    tasks: [],
  },
  {
    company: "KIDA Studios Pvt Ltd",
    title: "Software Engineer",
    duration: "Jul 2023 - Aug 2024",
    tasks: [],
  },
  {
    company: "KIDA Studios Pvt Ltd",
    title: "Game Engineer Intern",
    duration: "Dec 2021 - May 2023",
    tasks: [],
  },
];

export default function Work() {
  return (
    <section 
      id="work" 
      style={{
        background: "var(--bg-primary)",
        padding: "6rem 2rem",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Work Experience</h2>
        
        <div style={{ marginTop: "3rem" }}>
          {workEx.map((work, index) => (
            <div
              key={index}
              style={{
                position: "relative",
                paddingLeft: "2rem",
                borderLeft: "2px solid var(--accent)",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-6px",
                  top: "0",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              <div
                style={{
                  background: "var(--bg-card)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  boxShadow: "var(--shadow)",
                  border: "1px solid var(--border)"
                }}
              >
                <h3 style={{ marginBottom: "0.5rem" }}>{work.title}</h3>
                <p style={{ color: "var(--accent)", marginBottom: "0.25rem" }}>
                  {work.company}
                </p>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                  {work.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}