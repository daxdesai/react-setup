import React from "react";
import { InputError } from "../../commons/MicroComponents";
import { useDispatch, useSelector } from "react-redux";
import { loginApiAdmin } from "../../redux/auth/slice";
import RippleLoader from "../../commons/RippleLoader";
import { Link, useNavigate } from "react-router-dom";
// import { Eye, EyeSlash } from "iconsax-react";
import { Form, Formik } from "formik";
import * as Yup from "yup";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const { logingData } = useSelector(
  //   (store) => ({
  //     logingData: store?.authData?.loginStatus?.data?.data?.data,
  //   })
  // );

  return (
    <>
      <div className={`h-screen overflow-hidden relative`}>
        {logingDataLoading && <RippleLoader />}
        <div
          className={`flex items-center justify-center h-full  bg-no-repeat bg-cover bg-center ${
            logingDataLoading && ` hidden `
          } `}
        >
          <div className="absolute top-10 left-10 w-20 h-20"> 
            <img src={""} alt="logo" className="w-full h-full object-cover" />
            logo
          </div>
          <section className="w-full">
            <div className="max-w-xl w-full mx-auto">
              <div className="rounded-lg drop-shadow-lg bg-white/80 px-6 py-8 mx-4">
                <div className={"mb-8"}>
                  <p className="text-sm opacity-65 mb-2">Welcome!</p>
                  <h1 className="sm:text-2xl text-lg font-ebGaramond font-semibold mb-1">
                    Login to Ei Biz System
                  </h1>
                </div>
                {/* Login flow */}
                <Formik
                  initialValues={{
                    email: "admin@eibiz.co",
                    password: "Admin@123",
                    role: "admin",
                  }}
                  validationSchema={Yup.object({
                    email: Yup.string().required("Please Enter Email"),
                    password: Yup.string()
                      .required("Please Enter Password")
                      .min(
                        8,
                        "Password is too short - should be 8 chars minimum."
                      )
                      .matches(
                        /[a-zA-Z]/,
                        "Password can only contain Latin letters."
                      ),
                  })}
                  onSubmit={(values) => {
                    dispatch(loginApiAdmin(values));
                    setLoginState(true);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <Form onSubmit={handleSubmit}>
                      <div className="space-y-5">
                        {/* Email */}
                        <div className="">
                          <div
                            className={`${
                              errors.email && touched.email
                                ? ` input-error `
                                : ` border `
                            } relative bg-white border-secondary_grey transition duration-300 rounded-lg`}
                          >
                            <input
                              type="Email"
                              id="email"
                              name="email"
                              className="block px-2.5 pb-2.5 pt-4 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                              placeholder={" "}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            <label
                              htmlFor="Email"
                              className="absolute text-light_grey pointer-events-none text-base bg-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                            >
                              Email
                            </label>
                          </div>
                          {errors.email && touched.email ? (
                            <>
                              <InputError errorTitle={errors.email} />
                            </>
                          ) : null}
                        </div>
                        {/* password */}
                        <div>
                          <div className="mb-1">
                            <div
                              className={`${
                                errors.password && touched.password
                                  ? ` input-error `
                                  : ` border`
                              }  relative bg-white border-secondary_grey transition duration-300 rounded-lg flex items-center`}
                            >
                              <input
                                type="password"
                                id="password"
                                name="password"
                                className="block px-2.5 pb-2.5 pt-4 w-full error-forms text-sm text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 peer"
                                placeholder={" "}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                              />
                              <label
                                htmlFor="password"
                                className="absolute text-light_grey pointer-events-none text-base bg-white text-black duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                              >
                                Password
                              </label>
                              {/* <p
                              className="p-2 absolute top-1.5 right-0 rounded bg-transparent z-20"
                              onClick={() => {
                                if (passwordType === "password") {
                                  setPasswordType("text");
                                  return;
                                }
                                setPasswordType("password");
                              }}
                            >
                              {passwordType === "password" ? (
                                <EyeSlash size="20" />
                              ) : (
                                <>
                                  <Eye size="20" />
                                </>
                              )}
                            </p> */}
                            </div>
                            {errors.password && touched.password ? (
                              <>
                                <InputError errorTitle={errors.password} />
                              </>
                            ) : null}
                          </div>
                          {/* forget password */}
                          <Link
                            to={"/reset-password"}
                            className="border-b border-secondary_grey"
                          >
                            forget password?
                          </Link>
                        </div>
                        <button
                          type="submit"
                          className="w-full block text-white bg-theme text-center text-sm border-2 border-transparent hover:bg-transparent hover:border-2 hover:border-theme hover:text-theme rounded transition duration-500 py-2 lg:px-7 px-4"
                        >
                          Log In
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Auth;
