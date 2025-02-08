import { useEffect } from "react";
import { useRouter } from "next/router";

export default function VerificationSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Set validToken in localStorage
    localStorage.setItem("validToken", "true");

    // Set expiration time for 5 minutes
    const expirationTime = Date.now() + 5 * 60 * 1000; // Current time + 5 mins
    localStorage.setItem("validTokenExpiration", expirationTime.toString());

    // Use a slight delay to ensure localStorage is updated before redirecting
    setTimeout(() => {
      router.push("/index1"); // Redirect to homepage
    }, 500); // Delay 500ms to ensure token is stored

  }, [router]);

  return (
    <div className="verification-success">
      <div className="success-container">
        <h1>✅ Verification Successful!</h1>
        <p>Your token is now valid. You can access the content.</p>
        <div className="loader0"></div>
        <p>Redirecting you...</p>
      </div>

      {/* Embedded Styles */}
      <style jsx>{`
        .verification-success {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh; /* Full screen height */
          background-color: #121212; /* Dark background */
          color: #fff; /* White text */
          text-align: center;
        }

        .success-container {
          background: #1e1e1e;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
          max-width: 400px;
          width: 90%;
        }

        h1 {
          font-size: 24px;
          margin-bottom: 10px;
          color: #4CAF50; /* Green for success */
        }

        p {
          font-size: 16px;
          opacity: 0.9;
        }

        /* Animated Loader */
        .loader0 {
          width: 30px;
          height: 30px;
          border: 3px solid transparent;
          border-top: 3px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 20px auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
