import { useState } from "react";
import { useRouter } from "next/router";
import { FcApproval } from "react-icons/fc";

export default function VerifyPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleVerification = async () => {
    setIsVerifying(true);
    setErrorMessage("");

    // GPLinks API token and callback URL
    const apiToken = "e5bf7301b4ad442d45481de99fd656a182ec6507";
    const callbackUrl = "https://injured-harriet-cinema-talkies-87f4a1d2.koyeb.app/verification-success/";
    const apiUrl = `https://api.gplinks.com/api?api=${apiToken}&url=${encodeURIComponent(callbackUrl)}&format=json`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`Server responded with ${response.status}`);
      const result = await response.json();

      console.log("GPLinks API Response:", result); // Debugging

      if (result.status === "success" && result.shortenedUrl) {
        // Redirect to the shortened URL in the same tab
        window.location.href = result.shortenedUrl;
      } else {
        throw new Error(result.message || "Verification failed.");
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred.");
      setIsVerifying(false);
    }
  };

  return (
    <div className="glassmorphism-page">
      <div className="container5">
        <h2>Verify Your Access</h2>
        <p>Click the button below to verify yourself and gain access.</p>
        <h1 className="timeoutText">Access Timeout: 24hrs</h1>

        {errorMessage && <p className="error">{errorMessage}</p>}

        <button onClick={handleVerification} disabled={isVerifying} className="verifyButton1">
          <FcApproval className="icon1" />
          {isVerifying ? "Verifying..." : "Verify Now"}
        </button>
        <p></p>
        <p>After verification, you will be redirected automatically.</p>
      </div>
    </div>
  );
}
