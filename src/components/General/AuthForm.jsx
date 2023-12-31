import dog1 from "../../assets/dog1.jpg";
import React, { useState, useEffect } from "react";
export default function AuthForm(props) {
  const { setShowForm, setIsLoggedIn, setUserData, isOwnerSignup, apiUrl } =
    props;
  const [toggleAuth, setToggleAuth] = useState(true);
  const [message, setMessage] = useState();
  const [error, setError] = useState(null);
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });

  const [signUpFormData, setSignUpFormData] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
    kind: "",
  });

  const handleToggleAuth = () => {
    setToggleAuth((prevToggle) => !prevToggle);
    setMessage();
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (toggleAuth) {
      setMessage("Signing up");
    } else {
      setMessage("Signing in");
    }
    setError(null);

    // Depending on toggleAuth, make a request for either Sign Up or Sign In
    if (toggleAuth) {
      // This is the Sign Up Request
      try {
        // Assuming you're using the fetch API
        const response = await fetch(`${apiUrl}/auth/`, {
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
        const response = await fetch(`${apiUrl}/auth/sign_in`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signInFormData),
        });

        const data = await response.json();
        console.log(data);
        if (data.success == false) {
          setMessage("");
          setError(data.errors);
          console.log(data.errors);
        } else {
          console.log("Signed in as", signInFormData.email);
          console.log(signUpFormData);
          setUserData(data.data);
          setMessage();
          localStorage.setItem("uid", response.headers.get("uid"));
          localStorage.setItem("client", response.headers.get("client"));
          localStorage.setItem(
            "access-token",
            response.headers.get("access-token")
          );
          setIsLoggedIn(true);
          setShowForm(false);
        }
      } catch (error) {
        console.error("Error during sign in:", error);
      }
    }
  };

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

  useEffect(() => {
    if (isOwnerSignup) {
      setSignUpFormData((prevData) => ({ ...prevData, kind: "2" }));
    } else {
      setSignUpFormData((prevData) => ({ ...prevData, kind: "1" }));
    }
  }, [isOwnerSignup]);

  return (
    <>
      <div className="w-screen h-screen z-50 absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="w-full h-full sm:flex justify-center items-center">
          <div
            id="outer-wrapper"
            className="bg-white rounded-md flex flex-col h-full min-w-[70%]"
          >
            <div className="flex justify-center p-6 border-b-[1.5px]">
              <div className="w-full flex justify-between items-center">
                <div className="text-black font-extrabold text-5xl">Fido.</div>
                <button
                  type="button"
                  className="hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4 cursor-pointer"
                  onClick={() => setShowForm(false)}
                >
                  Go Back
                </button>
              </div>{" "}
            </div>
            <div className="flex flex-grow w-full h-full">
              <div
                id="container-left"
                className="rounded-bl-md sm:hidden md:basis-1/2 hidden md:block bg-center bg-no-repeat bg-cover"
                style={{ backgroundImage: `url(${dog1})` }}
              ></div>

              <div
                id="main-container"
                className="md:basis-1/2 p-6 flex flex-col items-center w-full"
              >
                <>
                  <div className="w-full">
                    <div className="text-start font-bold py-6 text-3xl">
                      {toggleAuth ? <>Sign up</> : <>Sign in</>}
                    </div>

                    {toggleAuth ? (
                      <form className="flex flex-col">
                        <div className="pb-4">
                          <div className="font-medium pb-2 text-slate-700">
                            Email
                          </div>
                          <input
                            type="email"
                            name="email"
                            value={signUpFormData.email}
                            onChange={handleSignUpChange}
                            className="focus:outline-none focus:border-slate-600 border-[1px] border-slate-400 rounded-md w-full py-2 px-2"
                          ></input>
                        </div>
                        <div className="pb-4">
                          <div className="font-medium pb-2 text-slate-700">
                            Name
                          </div>
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
                          {message && (
                            <p className="text-slate-500">{message}</p>
                          )}
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
                    ) : (
                      <>
                        <form className="flex flex-col">
                          <div className="pb-4">
                            <div className="font-medium pb-2 text-slate-700">
                              Email
                            </div>
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
                            {message && (
                              <p className="text-slate-500">{message}</p>
                            )}
                            {Array.isArray(error) &&
                              error.map((errMsg, index) => (
                                <p key={index} className="text-red-500">
                                  {errMsg}
                                </p>
                              ))}
                            <button
                              onClick={handleSubmit}
                              className="w-full hover:bg-slate-400 hover:border-[#00000000] hover:text-white text-black py-2 my-2 rounded-lg border-black border-[1px] px-4"
                              type="submit"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </>
                    )}
                  </div>

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
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
