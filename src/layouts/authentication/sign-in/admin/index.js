import React from 'react';
import { useHistory, Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import { signInvalidationSchema } from "../../../../validator/index";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { ToastContainer } from 'react-toastify';
import logo from "assets/images/main-logo/logo.png";
import { login } from "services/Authentication.Services";
import { useMutation } from "react-query";
import { notifySuccess, notifyError } from "components/Messages";
import { useUser } from "context"

function AdminLogin() {

  const { setUser } = useUser()

  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useHistory();
  const initState = {
    email: "",
    password: "",
  };
  const [loading, setLoading] = React.useState('idle')

  const formik = useFormik({
    initialValues: initState,
    validationSchema: signInvalidationSchema,
    onSubmit: (values) => {
      setLoading("pending")
      mutate(values)
    },
  });

  const { mutate } = useMutation(login, {
    onSuccess: (res) => {
      notifySuccess(" Login Successfully")
      setLoading("success")
      setUser(res?.data?.data)
      navigate.push("/admin/dashboard")
      let token = res.data.data.token;

      let detail = JSON.stringify({
        role: res.data.data.role,
        name: res.data.data.firstName + " " + res.data.data.lastName,
        id: res.data.data._id,
      });

      localStorage.setItem("token", token)
      localStorage.setItem("user", detail)


    },
    onError: (error) => {
      setLoading("error")
      notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something Went Wrong"}`);
    }
  });

  if (user) return <Redirect from="/admin/login" to="/admin/dashboard" />

  return (
    <BasicLayout logo={logo}>
      <Card >
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          // coloredShadow="info"
          mx={6}
          mt={-3}
          p={1}
          mb={1}
          textAlign="center"
          textGradient
        >
          <MDTypography variant="h4" fontWeight="medium" color="white">
            ADMIN LOGIN
          </MDTypography>

        </MDBox>
        <MDBox pt={4} px={3} pb={6}>
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
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                value={formik.values.password}
                id="password"
                autoComplete="password"
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
              />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton color="secondary" type="submit" fullWidth isLoading={loading} >
                LOGIN
              </MDButton>
            </MDBox>
            <ToastContainer />

          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default AdminLogin;
