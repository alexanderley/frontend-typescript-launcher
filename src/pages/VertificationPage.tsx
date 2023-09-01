import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import API_URL from "../../apiKey";

const VertificationPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);

  const verifyEmail = async () => {
    try {
      const response = await axios.put(`${API_URL}/auth/mail/${token}`);
      if (response.status === 200) {
        setShowVerifyMessage(true);
      }
    } catch (err) {
      console.error("User could not be verified");
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div>
      {showVerifyMessage ? (
        <>
          <h1>Your account is verified!</h1>
          <p>
            Go here to{" "}
            <span>
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default VertificationPage;
