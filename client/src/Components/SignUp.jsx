import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../Styles/Styles";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { server } from "../server";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((result) => {
        toast.success(result.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setAvatar("");
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          toast.error(err.response.data.message);
        }
      });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  return (
    <div className=" min-h-screen bg-gray-50  flex flex-col justify-center py-12 sm:px-6 lg:px-8 ">
      <div className=" sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl  font-bold  text-gray-900-">
          SignUp as a New User
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white  sm:rounded py-8 px-8 shadow-md">
          <form
            action=""
            method="POST"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>

              <div className="mt-1">
                <input
                  type="text"
                  name="name"
                  required
                  id="name"
                  placeholder="Name"
                  autoComplete="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none pl-3 placeholder:text-green-500 block w-full py-2 border-black border rounded-md shadow-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  required
                  id="email"
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
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  required
                  id="password"
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

            <div>
              <label
                htmlFor="avatar"
                className=" block text-sm font-medium text-gray-700"
              ></label>
              <div className=" mt-2 flex items-center">
                <span className=" inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      alt="avatar"
                      id="avatar"
                      src={URL.createObjectURL(avatar)}
                      className=" h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar id="avatar" className="h-8 w-8" />
                  )}
                </span>

                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 w-full border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 "
                >
                  <span>Upload File</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg, .jpeg, .png"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="group relative w-full h-10 flex justify-center py-2 px-4 border border-transparent text-white text-sm font-medium rounded-md bg-blue-500 hover:bg-blue-700"
            >
              Submit
            </button>
            <div className={`${styles.normalFlex} w-full`}>
              <h4>Already have an account</h4>
              <Link to={"/login"} className="text-blue-600 pl-2">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
