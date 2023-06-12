import React from "react";
import { Link, useHistory,Redirect } from "react-router-dom";
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
import { signUpFlowEnums } from "utils/Helper";

function UserLogin() {

  const user = JSON.parse(localStorage.getItem('user'));
  const {setUser}=useUser()
  const navigate = useHistory();
  const [loading, setLoading] = React.useState('idle')
  const initState = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initState,
    validationSchema: signInvalidationSchema,
    onSubmit: (values) => {
      setLoading("pending")
      mutate(values);
    },
  });

  const { mutate } = useMutation(login, {
    onSuccess: (res) => {
      notifySuccess("Logged In Successfully")
      setUser(res?.data?.data)
      setLoading("success")

      if (res.data.data.signUpFlowStatus === signUpFlowEnums.BUSINESS_DETAILS_LEFT) {
          let detail = JSON.stringify({
           id: res.data.data._id,
           name: res.data.data.firstName + " " + res.data.data.lastName,
           credits: res.data.data.credits
          });
          
        localStorage.setItem("id", detail);
        navigate.push("/businessdetails")
      }else if(res.data.data.signUpFlowStatus === signUpFlowEnums.LEADS_DETAILS_LEFT){
        let signupdetail = JSON.stringify({
         id: res.data.data._id,
         name: res.data.data.firstName + " " + res.data.data.lastName,
         credits: res.data.data.credits
        });

        localStorage.setItem("id", signupdetail);
        let detail = JSON.stringify({
                id: res.data.data._id,
            });
        localStorage.setItem("business_Id", detail)
 
        navigate.push("/leaddetails")
      }
      else if (res.data.data.signUpFlowStatus === signUpFlowEnums.CARD_DETAILS_LEFT) {

         let signupdetail = JSON.stringify({
          id: res.data.data._id,
          name: res.data.data.firstName + " " + res.data.data.lastName,
          credits: res.data.data.credits
         });

         localStorage.setItem("id", signupdetail);

         let detail = JSON.stringify({
          id: res.data.data._id,
         });
        
         localStorage.setItem("business_Id", detail)
         
         let leadDetail = JSON.stringify({
          id: res.data.data._id,
         });
        
        localStorage.setItem("lead_id", leadDetail)

        let token =  res.data.data.token;
        localStorage.setItem("token", token)
        let tokentrue = true
        localStorage.setItem("tokenstatus", tokentrue)

        navigate.push("/signup/creditcard")

         let finaldetail= JSON.stringify({
        role: res.data.data.role,
        name:res.data.data.firstName +" " + res.data.data.lastName ,
        id:res.data.data._id,
        credit:res.data.data.credits,
        businessName:res.data.data.businessName
         });
        
      localStorage.setItem("user",finaldetail)

      } else {
         navigate.push("/dashboard")
         let token =  res.data.data.token;
       let finaldetail= JSON.stringify({
        role: res.data.data.role,
        name:res.data.data.firstName +" " + res.data.data.lastName ,
        id:res.data.data._id,
        credit:res.data.data.credits,
        businessName:res.data.data.businessName
      });
      localStorage.setItem("user",finaldetail)
        localStorage.setItem("token", token)
        
         
        
      }
    //   else if (res.data.data.signUpStatus === "all done") {
    //    let token =  res.data.data.token;
    //    let finaldetail= JSON.stringify({
    //     role: res.data.data.role,
    //     name:res.data.data.firstName +" " + res.data.data.lastName ,
    //     id:res.data.data._id,
    //     credit:res.data.data.credits,
    //     businessName:res.data.data.businessName
    //   });
    //   localStorage.setItem("user",finaldetail)
    //   localStorage.setItem("token", token)
    //       navigate.push("/dashboard")
    //  }
     
     
    },
    onError: (error) => {
      setLoading("error")
      notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something went wrong"}`);
    //  if(error?.response?.data?.error?.message==="Kindly Fill Business Details"){
    //   navigate.push("/businessdetails")
    //  } else if (error?.response?.data?.error?.message === "Kindly Fill Lead Details") {
    //     navigate.push("/leaddetails")
    //  } else if (error?.response?.data?.error?.message === "card details not found. please contact Admin.") {
    //     navigate.push("/signup/creditcard")
    //  }
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
            USER LOGIN
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
              <MDButton color="secondary" type="submit" fullWidth isLoading={loading}>
                LOGIN
              </MDButton>
            </MDBox>
            <ToastContainer />
            <MDBox mt={3} mb={0} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/signup"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox textAlign="center">
              <MDTypography variant="button" color="text">
                <MDTypography
                  component={Link}
                  to="/user/forgetpassword"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Forgot Password?
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default UserLogin;
