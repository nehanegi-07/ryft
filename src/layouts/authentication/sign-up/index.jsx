import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useFormik } from "formik";
import { ToastContainer } from "react-toastify";
import { notifyError } from "components/Messages";
import { signUpvalidationSchema } from "validator";
import { register } from "services/Authentication.Services";
import { useMutation } from "react-query";
import logo from "assets/images/main-logo/logo.png";
import { Checkbox } from "@mui/material";
import PasswordStrengthBar from 'react-password-strength-bar';

function SignUp() {
  const [loading, setLoading] = useState('idle')
  const user = JSON.parse(localStorage.getItem('user'));

  const navigate = useHistory();
  const currentURL = window.location.href;
  const amount = currentURL.split("=")
  const code = currentURL.split("code=")

// console.log("code",code)
  const codeCheck = () => {
    if (code[code.length - 1].includes("signup")) {
      // console.log("ggggg")
      return null
    } else {
      let freeCode = JSON.stringify({
        code: code[code.length - 1],
      });
      // console.log("true one")
      localStorage.setItem("code", freeCode)
      return code[code.length - 1]
    }
  }

  const initState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: codeCheck()
  };

  const formik = useFormik({
    initialValues: initState,
    validationSchema: signUpvalidationSchema,
    onSubmit: (values) => {
      setLoading("pending")
      mutate(values);
    },
  });

  const { mutate } = useMutation(register, {
    onSuccess: (res) => {
      setLoading("pending")

      // notifySuccess(" Register Successfully")

      setLoading("success")
      let detail = JSON.stringify({
        id: res.data.data._id,
        name: res.data.data.firstName + " " + res.data.data.lastName,
        credits: res.data.data.credits
      });
      if (currentURL.includes("cr=")) {
        let creditAmount = JSON.stringify({
          amount: amount[1]
        });
        localStorage.setItem("initialamount", creditAmount)
      }

      // let freeCode = JSON.stringify({
      //   code: code[code.length - 1],
      // });
      // if (code[code.length - 1] !== "signup") {
      //   localStorage.setItem("code", freeCode)
      // }
      localStorage.setItem("id", detail);
      navigate.push("/businessdetails");
    },

    onError: (error) => {
      localStorage.removeItem("code")
      setLoading("error")
      notifyError(`${(error?.response?.data?.data?.message) ? error.response.data.data.message : "Something went Wrong"}`);
    },
  });

  if (user) return <Redirect from="/user/signup" to="/dashboard" />;

  return (
    <BasicLayout logo={logo} xs={11} sm={9} md={7} lg={5} xl={4} >
      <Card >
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          mx={6}
          mt={-3}
          p={1}
          mb={0}
          textAlign="center"
          textGradient
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Your Details
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox mb={2}>
            <MDBox sx={{ width: "100%", textAlign: "center", mb: 1 }}>
              <MDTypography variant="text" fontWeight="bold"> Finding new customers, filling the diary, and growing your business has never been easier.
              </MDTypography>
            </MDBox>

            <MDBox component="ul" m={0} pl={4} mb={2}>
              <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                  No contract, no membership fees, no hidden charges.
                </MDTypography>
              </MDBox>
              <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                  All leads web generated and expecting your call.
                </MDTypography>
              </MDBox>
              <MDBox component="li" color="text" fontSize="1.25rem" lineHeight={1}>
                <MDTypography variant="body2" color="text" fontWeight="regular" verticalAlign="middle">
                  Pay-as-you-go for the leads you want
                </MDTypography>
              </MDBox>

            </MDBox>

          </MDBox>
          <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="First Name"
                value={formik.values.firstName}
                id="firstName"
                autoComplete="firstName"
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                width={{ md: 700 }}
                label="Last Name"
                value={formik.values.lastName}
                id="lastName"
                autoComplete="lastName"
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                value={formik.values.email}
                id="email"
                autoComplete="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                value={formik.values.password}
                id="password"
                autoComplete="password"
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
              />
              {formik.values.password.length ?
                < PasswordStrengthBar password={formik.values.password} onChangeScore={(score, feedback) => {

                }}
                  shortScoreWord={false}
                /> : ""}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Confirm Password"
                value={formik.values.confirmPassword}
                id="confirmPassword"
                autoComplete="confirmPassword"
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox
                required
                fullWidth />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Click here to accept our&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={3}>
              <MDButton color="secondary" type="submit" fullWidth isLoading={loading}>
                Next
              </MDButton>
            </MDBox>
            <ToastContainer />
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default SignUp;
