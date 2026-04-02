interface Education {
  uni: string;
  degree: string;
  location: string;
  year: string;
}

const education: Education[] = [
  {
    uni: "GISMA University of Applied Sciences",
    degree: "MEng in Computer Science",
    year: "2024-Present",
    location: "Germany",
  },
  {
    uni: "Dr. D.Y. Patil Institue of Technology",
    degree: "BE in Computer Engineering",
    year: "2019-2023",
    location: "India",
  },
];

const workshopDetails = [
  "Open Source Mobile Network Technologies (OSMNT) Workshop",
  "Nov 2025 – Dec 2025",
  "Deployed a full 5G Standalone (SA) network using Open5GS (Core) and srsRAN (gNB) interfaced with Ettus B210 USRP SDR hardware to establish a live over-the-air radio link.",
  "Successfully attached and validated data connectivity with a commercial Nokia X30 smartphone on the private 5G network.",
  "Demonstrated network architecture flexibility by deploying the Core in both local on-notebook and cloud-based environments.",
  "Setting up experiments on the SLICES Research Infrastructure. Using the SLICES-CLI and Webshell interfaces.",
  "Analyzing control-plane traffic with Wireshark.",
];

export default function Education() {
  return (
    <section 
      id="education" 
      style={{
        background: "var(--bg-secondary)",
        padding: "6rem 2rem",
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center" }}>Education</h2>
        
        <div style={{
          marginTop: "3rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem"
        }}>
          {education.map((edu, index) => (
            <div
              key={index}
              style={{
                background: "var(--bg-card)",
                padding: "2rem",
                borderRadius: "12px",
                boxShadow: "var(--shadow)",
                border: "1px solid var(--border)",
                textAlign: "center"
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}>{edu.degree}</h3>
              <p style={{ color: "var(--accent)", marginBottom: "0.25rem" }}>
                {edu.uni}
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "0.25rem" }}>
                {edu.location}
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                {edu.year}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: "4rem",
          textAlign: "center"
        }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Workshop & Certifications</h3>
          <div style={{
            background: "var(--bg-card)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "var(--shadow)",
            border: "1px solid var(--border)",
            textAlign: "left"
          }}>
            <h4 style={{ color: "var(--accent)", marginBottom: "0.75rem" }}>
              {workshopDetails[0]}
            </h4>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", marginBottom: "1rem" }}>
              {workshopDetails[1]}
            </p>
            <ul style={{ paddingLeft: "1.5rem" }}>
              {workshopDetails.slice(2).map((detail, index) => (
                <li key={index} style={{ color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}