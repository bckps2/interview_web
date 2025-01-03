export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.heading}>¡Prepárate para tu próxima entrevista!</h1>
        <p style={styles.description}>
          Aumenta tus posibilidades de éxito con una preparación efectiva y
          recursos diseñados para hacerte destacar en las entrevistas.
        </p>
        <div style={styles.ctaContainer}>
          <h2 style={styles.ctaHeading}>¿Estás listo para dar lo mejor de ti?</h2>
          <p style={styles.ctaText}>Haz clic aquí para comenzar tu preparación.</p>
          <button style={styles.ctaButton}>Comienza ahora</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#f7f7f7",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 20px",
  },
  content: {
    textAlign: "center",
    maxWidth: "600px",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "bold",
    color: "#2c3e50",
  },
  description: {
    fontSize: "18px",
    color: "#7f8c8d",
    marginTop: "20px",
  },
  ctaContainer: {
    marginTop: "40px",
  },
  ctaHeading: {
    fontSize: "24px",
    color: "#2c3e50",
  },
  ctaText: {
    fontSize: "16px",
    color: "#95a5a6",
    marginTop: "10px",
  },
  ctaButton: {
    marginTop: "20px",
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "15px 30px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s",
  },
};
