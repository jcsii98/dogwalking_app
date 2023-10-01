import dog1 from "../assets/dog1.jpg";
import React, { useState } from "react";
export default function AuthPage(props) {
  const { setShowForm } = props;
  const [toggleAuth, setToggleAuth] = useState(true);
  const [message, setMessage] = useState();
  const [error, setError] = useState({});

  const handleToggleAuth = () => {
    setToggleAuth((prevToggle) => !prevToggle);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (toggleAuth) {
      setMessage("Signing up");
    } else {
      setMessage("Signing in");
    }
    setError();
    // Depending on toggleAuth, make a request for either Sign Up or Sign In
    if (toggleAuth) {
      // This is the Sign Up Request
      try {
        // Assuming you're using the fetch API
        const response = await fetch("http://localhost:3000/auth/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signUpFormData),
        });

        const data = await response.json();

        if (data.status == "error" && data.errors) {
          setMessage();
          setError({
            email: data.errors.email,
            full_messages: data.errors.full_messages,
          });
        }
        if (data.status == "success") {
          setMessage(
            `User has successfully signed up. Please check your email (${signUpFormData.email}) for confirmation instructions.`
          );
          console.log(data);
        }
      } catch (error) {
        console.log("error 1");
        console.error("Error during sign up:", error);
      }
    } else {
      // This is the Sign In Request
      try {
        // Again, assuming you're using the fetch API
        const response = await fetch("/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInFormData),
        });

        const data = await response.json();
        console.log(data);

        // Handle the response as per your requirements
      } catch (error) {
        console.error("Error during sign in:", error);
      }
    }
  };

  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div
        id="main-container"
        className="bg-white rounded-lg flex overflow-hidden h-[645px] w-[875px]"
      >
        <div
          id="container-left"
          className="flex-1 bg-cover bg-center"
          style={{ backgroundImage: `url(${dog1})` }}
        ></div>
        <div
          id="container-right"
          className="overflow-y-auto flex-1 flex flex-col px-10"
        >
          <div className="text-sm font-bold py-6">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-medium">
                {toggleAuth ? <>Sign up</> : <>Sign in</>}
              </div>
              <button
                type="button"
                className="hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4 cursor-pointer"
                onClick={() => setShowForm(false)}
              >
                Go Back
              </button>
            </div>
          </div>

          {toggleAuth ? (
            <>
              <div className="">
                <form className="flex flex-col">
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">Email</div>
                    <input
                      type="email"
                      name="email"
                      value={signUpFormData.email}
                      onChange={handleSignUpChange}
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">Name</div>
                    <input
                      type="text"
                      name="name"
                      value={signUpFormData.name}
                      onChange={handleSignUpChange}
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>

                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      Password
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={signUpFormData.password}
                      onChange={handleSignUpChange}
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      Confirm Password
                    </div>
                    <input
                      type="password"
                      name="password_confirmation"
                      value={signUpFormData.password_confirmation}
                      onChange={handleSignUpChange}
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="w-full">
                    {message && <p className="text-slate-500">{message}</p>}
                    {error?.full_messages?.map((errMsg, index) => (
                      <p key={index} className="text-red-500">
                        {errMsg}
                      </p>
                    ))}
                    <button
                      onClick={handleSubmit}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="">
                <form className="flex flex-col">
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">Email</div>
                    <input
                      type="text"
                      name="email"
                      value={signInFormData.email}
                      onChange={handleSignInChange}
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pb-4">
                    <div className="font-medium pb-2 text-slate-700">
                      Password
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={signInFormData.password}
                      onChange={handleSignInChange}
                      className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                    ></input>
                  </div>
                  <div className="pt-2 w-full">
                    <button
                      onClick={handleSubmit}
                      className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          <div className="text-sm pb-4">
            <div className="flex">
              Or {toggleAuth ? <>sign in</> : <>sign up</>}{" "}
              <div
                onClick={handleToggleAuth}
                className="cursor-pointer pl-[4px] underline"
              >
                here
              </div>
              .
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
