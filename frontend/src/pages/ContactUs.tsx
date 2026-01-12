import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactUs() {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar Shouldhover={false} />

      <main
        style={{ flex: 1, padding: "40px 20px", backgroundColor: "#f9f9f9" }}
      >
        <div style={{ margin: "0 auto" }}>
          <h1
            style={{
              textAlign: "center",
              marginBottom: "10px",
              fontWeight: "bold",
              fontSize: "larger",
            }}
          >
            Do you have any questions?
          </h1>
          <p
            style={{ textAlign: "center", color: "#666", marginBottom: "40px" }}
          >
            We are here for you.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "40px",
              background: "#fff",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <div>
                <p>
                  <strong>Shop:</strong> ANONYMOUS Sp. z o.o.
                </p>
                <p>
                  <strong>Address:</strong> Kawiory 21, 30-055 Kraków
                </p>
                <p>
                  <strong>Phone number:</strong> +48 123 456 789
                </p>
                <p>
                  <strong>Email:</strong> contact@anonymous.pl
                </p>
              </div>

              <p
                style={{
                  marginTop: "20px",
                  color: "#666",
                  justifySelf: "flex-end",
                }}
              >
                Opening hours: <br />
                Monday - Friday: 8am - 4pm <br />
                Saturday - Sunday: 10am - 2pm
              </p>
            </div>
            <div
              style={{
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <iframe
                title="map"
                src="https://www.google.com/maps?q=Wydział+Informatyki+AGH+D-17&output=embed"
                width="500"
                height="400"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
