import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputError } from "../../commons/MicroComponents";
import { adminGetProfileData, adminProfile } from "../../redux/auth/slice";
import RippleLoader from "../../commons/RippleLoader";
import { DefaultPhoneInput } from "../../components/micro";
import { Eye, EyeSlash, MailBox } from "../../assets/svg/AllSvg";

const Profile = () => {
  const [profileFromSubmit, setProfileFromSubmit] = useState(false);
  const [passwordType, setPasswordType] = useState("password");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getProfileData, profileLoading, profileError } = useSelector(
    (store) => ({
      // profile
      getProfileData: store?.authData?.adminGetProfileDataStatus?.data,
      profileLoading: store?.authData?.loading,
      profileError: store?.authData?.error,
    })
  );

  useEffect(() => {
    dispatch(adminGetProfileData());
  }, [dispatch]);

  useEffect(() => {
    if (!profileLoading && !profileError && profileFromSubmit) {
      navigate("/");
    }
  }, [profileFromSubmit, profileLoading, profileError, navigate]);

  return (
    <>
      {profileLoading && <RippleLoader />}
      <section>
        <h6 className="font-ebGaramond font-semibold text-2xl border-b border-secondary_grey pb-4 mb-6">
          My Profile
        </h6>
        {/* User Profile */}
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: getProfileData?.full_name ?? "",
            mobile: getProfileData?.phone ?? "",
            email: getProfileData?.email ?? "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().min(3).required("Please Enter Name"),
            mobile: Yup.string()
              .required("please Enter Mobile")
              .max(13, "Mobile is too long - should be 10 chars maximum."),
            email: Yup.string().min(3).required("Please Enter E-mail"),
            password: Yup.string()
              .required("Please Enter Password")
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
          })}
          onSubmit={(values) => {
            dispatch(adminProfile(values))
          }}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="w-full bg-white border rounded space-y-6 py-5 px-6">
                {/* Name */}
                <div>
                  <div
                    className={`${
                      errors.name && touched.name ? ` input-error ` : ` border `
                    } relative bg-white border-secondary_grey transition duration-300 rounded`}
                  >
                    <input
                      type="name"
                      id="name"
                      name="name"
                      className="block px-2.5 pb-2.5 pt-4 w-full text-sm error-forms text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder={"Thomas"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <label
                      htmlFor="name"
                      className="absolute text-light_grey pointer-events-none text-base bg-white duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Name
                    </label>
                  </div>
                  {errors.name && touched.name ? (
                    <>
                      <InputError errorTitle={errors.name} />
                    </>
                  ) : null}
                </div>
                {/* Mobile */}
                <div>
                  <div
                    className={`${
                      errors.mobile && touched.mobile
                        ? ` input-error `
                        : ` border `
                    } relative bg-white border-secondary_grey transition duration-300 rounded plus-number-inputs`}
                  >
                    <DefaultPhoneInput
                      className={`${
                        errors.mobile && touched.mobile ? "error-forms" : ""
                      } rounded p-3`}
                      value={values.mobile}
                      onBlur={handleBlur("mobile")}
                      name={"mobile"}
                      max={10}
                      onChange={(value) => {
                        value !== undefined
                          ? setFieldValue("mobile", value)
                          : setFieldValue("mobile", "");
                      }}
                    />
                    <label
                      htmlFor="mobile"
                      className="absolute text-light_grey pointer-events-none text-base bg-white duration-300 transform -translate-y-5 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                    >
                      Mobile
                    </label>
                  </div>
                  {errors.mobile && touched.mobile ? (
                    <>
                      <InputError errorTitle={errors.mobile} />
                    </>
                  ) : null}
                </div>
                {/* Email */}
                <div>
                  <div
                    className={`${
                      errors.email && touched.email
                        ? ` input-error `
                        : ` border `
                    } relative bg-white border-secondary_grey transition duration-300 rounded`}
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block px-2.5 py-3 pl-12 w-full text-sm error-forms text-gray-900 bg-transparent rounded border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder={"myemail@gmail.com"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                    <MailBox className="absolute top-1/2 left-4 -translate-y-1/2"/>
                    <label
                      htmlFor="email"
                      className="absolute top-0 left-1 -translate-y-2.5 text-light_grey pointer-events-none text-base scale-75 px-1 bg-white"
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
                {/* Password */}
                <div>
                  <div
                    className={`${
                      errors.password && touched.password
                        ? ` input-error `
                        : ` border `
                    } relative bg-white border-secondary_grey transition duration-300 rounded`}
                  >
                    <input
                      type={passwordType}
                      id="password"
                      name="password"
                      className="block px-2.5 py-3 pl-12 w-full text-sm error-forms text-gray-900 bg-transparent rounded border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder={"Example@123"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                      <p
                      className="absolute top-1/2 left-4 -translate-y-1/2"
                      onClick={() => {
                        if (passwordType === "password") {
                          setPasswordType("text");
                          return;
                        }
                        setPasswordType("password");
                      }}
                    >
                      {passwordType === "password" ? <EyeSlash /> : <Eye />}
                    </p>
                    <label
                      htmlFor="password"
                      className="absolute top-0 left-1 -translate-y-2.5 text-light_grey pointer-events-none text-base scale-75 px-1 bg-white"
                    >
                      Password
                    </label>
                  </div>
                  {errors.password && touched.password ? (
                    <>
                      <InputError errorTitle={errors.password} />
                    </>
                  ) : null}
                </div>
                <div className="flex justify-end mt-3">
                  <button type="submit" className="btn-theme uppercase">
                    Edit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default Profile;
