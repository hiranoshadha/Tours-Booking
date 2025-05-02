import React, { useEffect, useRef } from "react";
import Transition from "../../components/Transition";
import Background from "../../assets/background3.png";
import "./Login.css";
import Logo from "../../assets/K_5.mp4"; // Import the advanced Transition

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Function to handle focus and blur events
  const handleFocus = (e) => {
    if (e.target.value !== "") {
      e.target.classList.add("focus");
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      e.target.classList.remove("focus");
    }
  };

  // This will trigger the focus class for autofilled fields on page refresh
  const triggerAutofillAnimation = () => {
    const emailField = emailRef.current;
    const passwordField = passwordRef.current;

    // Apply the 'focus' class if the fields are autofilled
    if (emailField && emailField.value !== "") {
      emailField.classList.add("focus");
    }

    if (passwordField && passwordField.value !== "") {
      passwordField.classList.add("focus");
    }
  };

  useEffect(() => {
    // Wait for the page to fully load and check for autofilled values
    setTimeout(() => {
      triggerAutofillAnimation();
    }, 10); // Delay to allow the page refresh to complete

    // Check for autofill changes every 500ms
    const interval = setInterval(() => {
      triggerAutofillAnimation();
    }, 200);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <Transition direction="bottom">
      {/* Slide in from bottom */}
      <div className="bg-gray-900 h-screen w-screen">
        <div className="flex flex-col items-center flex-1 h-full justify-center px-4 sm:px-0">
          <div className="rounded-lg shadow-lg w-full sm:w-11/12 md:w-8/9 lg:w-8/9 bg-white sm:mx-0 lg:h-6/7">
            <div className="flex justify-center h-full">
              {/* Left Column: Image Background */}
              <div
                className="hidden lg:block lg:w-2/3 bg-cover rounded-l-lg"
                style={{
                  backgroundImage: `url(${Background})`,
                }}
              >
                <div className="flex items-start h-full px-20 p-20 bg-opacity-40">
                  <div>
                    <h2 className="text-4xl font-bold text-white">
                      FLAMINGO TOURS
                    </h2>
                    <p className="max-w-xl mt-3 text-green-950">
                      Your gateway to unforgettable travel experiences.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Sign-in Form */}
              <div className="shadow-2xl shadow-gray-300 flex justify-center items-center w-full mt-0 mb-0 mr-0 px-6 mx-auto lg:w-3/8">
                <div className="items-center justify-center lg:w-7/8">
                  <div className="flex items-center justify-center md:mb-2 lg:mb-8 lg:h-3/6">
                    <div className="logo-container2">
                      {/* Video as the Logo */}
                      <video autoPlay muted className="logo-video">
                        <source src={Logo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                  {/* Header Text */}
                  <div className="text-center">
                    <p className="mt-3 text-gray-500 dark:text-gray-300">
                      Sign in to access your account
                    </p>
                  </div>

                  {/* Sign-in Form */}
                  <div className="mt-8 lg:w-6/6">
                    <form>
                      {/* Email Address */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block mb- text-sm text-gray-600 dark:text-gray-200 relative"
                        >
                          <input
                            ref={emailRef}
                            type="email"
                            name="email"
                            id="email"
                            className="block w-full px-6 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-200 rounded-lg outline-none border-opacity-50 focus:border-blue-400"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                          />
                          <span className="text-opacity-80 absolute left-0 top-2 mx-2 px-4 transition duration-200 input-text">
                            Email Address
                          </span>
                        </label>
                      </div>

                      {/* Password */}
                      <div className="mt-6">
                        <div className="flex justify-end mb-2">
                          <a
                            href="#"
                            className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                          >
                            Forgot password?
                          </a>
                        </div>
                        <label
                          htmlFor="password"
                          className="block mb- text-sm text-gray-600 dark:text-gray-200 relative"
                        >
                          <input
                            ref={passwordRef}
                            type="password"
                            name="password"
                            id="password"
                            className="block w-full px-6 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                          />
                          <span className="text-opacity-80 absolute left-0 top-2 mx-2 px-4 transition duration-200 input-text">
                            Your Password
                          </span>
                        </label>
                      </div>

                      {/* Sign-in Button */}
                      <div className="mt-6 overflow-visible">
                        <button
                          type="submit"
                          className="relative w-full px-4 py-2 tracking-wide text-white duration-200 bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 transition transform hover:scale-105"
                        >
                          Sign in
                          <span className="star-animation-left absolute top-0 left-0"></span>
                          <span className="star-animation-right absolute bottom-0 right-0"></span>
                        </button>
                      </div>
                    </form>

                    {/* Sign-up Link */}
                    <p className="mt-6 text-sm text-center text-gray-400">
                      Don't have an account yet?{" "}
                      <a
                        href="#"
                        className="text-blue-500 focus:outline-none focus:underline hover:underline"
                      >
                        Sign up
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default Login;
