import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import bgImage from "./image/bg.jpg";
const HomePage = () => {
    const navigate = useNavigate();

    // Handle routing to the supplier dashboard
    const goToSupplierDashboard = () => {
        navigate("/supplier-dashboard"); // Navigate to the Supplier Dashboard route
    };

    return (
        <div
            className="home-page"
            style={{
                backgroundImage: `url(${bgImage})`, // Replace with your image URL
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        ><p
            style={{
                color: "white", // White text for contrast
                fontSize: "80px", // Larger font size for visibility
                fontWeight: "bold", // Bold text
                marginBottom: "20px", // Space between text and button
                textAlign: "center", // Centers the text horizontally

            }}
        >
                Chain Guard <br /> <span style={{ fontSize: "40px" }}>Securing supply chain of tomorrow something</span>
            </p>
            <button
                onClick={goToSupplierDashboard}
                className="start-button"
                style={{
                    position: "absolute",
                    bottom: "20px",
                    padding: "10px 40px",
                    fontSize: "16px",
                    backgroundColor: "white", // Burgundy background color
                    color: "blue", // Blue text color
                    borderRadius: "50px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Start
            </button>


        </div>
    );
};

export default HomePage;
