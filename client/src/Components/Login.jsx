import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../Styles/Styles";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    await axios
      .post(`${server}/user/login`, data, { withCredentials: true })
      .then((result) => {
        console.log(result);
        setEmail("");
        setPassword("");
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    <div className=" min-h-screen bg-gray-50  flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl  font-bold  text-gray-900-">
          Login to your Account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white  sm:rounded py-8 px-8 shadow-md">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none pl-3 placeholder:text-green-500 block w-full py-2 border-black border rounded-md shadow-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor=""
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  required
                  value={password}
                  placeholder="Password"
                  autoComplete="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none pl-3  border-black border rounded placeholder:text-green-500 block w-full py-2"
                />
                {visible ? (
                  <AiOutlineEyeInvisible
                    className="absolute top-3 cursor-pointer right-2"
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEye
                    className="absolute top-3 cursor-pointer right-2"
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>

            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <input
                  id="remember-me"
                  name="remeber-me"
                  className="h-4 w-4 accent-black  rounded"
                  type="checkbox"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me?
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="/forgot-password"
                  className="font-medium text-blue-500 hover:text-blue-600 hover:underline underline-offset-2"
                >
                  Forgot password
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full h-10 flex justify-center py-2 px-4 border border-transparent text-white text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-700"
            >
              Submit
            </button>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Don&apos;t have an account</h4>
              <Link to={"/sign-up"} className="text-blue-600 pl-2">
                SignUp
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
