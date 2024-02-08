import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  const sendReq = useCallback(async () => {
    try {
      const result = await axios.post(`${server}/user/activation/`, {
        activation_token,
      });
      console.log(result);
      setError(false);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }, [activation_token]);

  useEffect(() => {
    if (activation_token) {
      sendReq();
    }
  }, [activation_token, sendReq]);

  return (
    <div className="w-full h-svh flex justify-center items-center text-lg">
      {error == true && <p className=" text-red-500">your token is expired</p>}{" "}
      {error == false && (
        <p className="text-green-500">
          your account has been created successfully
        </p>
      )}
    </div>
  );
};

export default ActivationPage;
