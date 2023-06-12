import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useFormik } from "formik";
import { signInvalidationSchema } from "../../../../validator/index";
import { login } from 'services/Authentication.Services';
import { useMutation } from "react-query";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "components/Messages";
import logo from "assets/images/main-logo/logo.png";
import { useUser } from "context"
import { forgetPassword } from "services/Authentication.Services";

function ForgotPassword() {

  const user = JSON.parse(localStorage.getItem('user'));
  const { setUser } = useUser()
  const navigate = useHistory();
  const [loading, setLoading] = React.useState('idle')
  const initState = {
    email: "",

  };

  const formik = useFormik({
    initialValues: initState,
    // validationSchema: signInvalidationSchema,
    onSubmit: (values) => {
      setLoading("pending")
      mutate(values);
    },
  });

  const { mutate } = useMutation(forgetPassword, {
    onSuccess: (res) => {

      notifySuccess("Password has been sent to your Email")
      // setUser(res?.data?.data)
      // setLoading("success")
      navigate.push("/user/login")

      // let token = res.data.data.token;

      // let detail = JSON.stringify({
      //   role: res.data.data.role,
      //   name: res.data.data.firstName + " " + res.data.data.lastName,
      //   id: res.data.data._id,
      //   credit: res.data.data.credits
      // });
      // localStorage.setItem("user", detail)
      // localStorage.setItem("token", token)
    },
    onError: (error) => {
      setLoading("error")
      notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something went wrong"}`);
    }
  });

  if (user) return <Redirect from="/user/login" to="/dashboard" />;
  return (
    <BasicLayout logo={logo}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          mx={6}
          mt={-3}
          p={1}
          mb={1}
          textAlign="center"
          textGradient
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            Forgot Password
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                value={formik.values.email}
                id="email"
                autoComplete="email"
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
              />
            </MDBox>


            <MDBox mt={4} mb={1}>
              <MDButton color="secondary" type="submit" fullWidth isLoading={loading}>
               Send
              </MDButton>
            </MDBox>
            <ToastContainer />
            <MDBox mt={3} mb={0} textAlign="center">
              <MDTypography variant="button" color="text">
                Remember Password{" "}
                <MDTypography
                  component={Link}
                  to="/user/login"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign in
                </MDTypography>
              </MDTypography>
            </MDBox>

          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default ForgotPassword;
