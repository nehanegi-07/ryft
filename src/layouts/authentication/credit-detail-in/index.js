import React, { useEffect, useState } from "react";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "components/Messages";
import { useFormik } from "formik";
import { creditCardvalidationSchema } from "validator/index";
import logo from "assets/images/main-logo/logo.png";
import { cardDetailSaved } from "services/User.Services";
import { useMutation } from "react-query";
import { InputAdornment } from '@mui/material';
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { getCreditUserDetail } from "services/Authentication.Services";

function CreditCardDetails() {
  const [loading, setLoading] = React.useState('idle')
  // const { pathname } = useLocation();
  // const currentURL = window.location.href;
  // const amount = currentURL.split("=")


  const navigate = useHistory();
  const user = JSON.parse(localStorage.getItem("id"))
  const businessId = JSON.parse(localStorage.getItem('business_Id'));
  const leadId= JSON.parse(localStorage.getItem('lead_id'));
  const creditAmount=JSON.parse(localStorage.getItem("initialamount"))
  const role = JSON.parse(localStorage.getItem('user'));
  const token = JSON.parse(localStorage.getItem('tokenstatus'));
  const code =JSON.parse(localStorage.getItem('code'))


  const initState = {
    cardHolderName: `${user?.name} ` || "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    // amount:currentURL.includes("cr=") ? amount[1]:null,
    amount: creditAmount?creditAmount?.amount : null,
    code:code?.code||null,
    isDefault: true,
  };

  const formik = useFormik({
    initialValues: initState,
    validationSchema: creditCardvalidationSchema,
    onSubmit: (values) => {
      setLoading("pending")
      mutate(values);
    },
  });

  const { mutate } = useMutation(cardDetailSaved, {
    onSuccess: (res) => {
      setLoading("success")
      notifySuccess("Account Created - Please Login")


      if (token) {
          localStorage.removeItem("tokenstatus");
        navigate.push("/dashboard");

      } else {
         localStorage.clear();
         navigate.push("/user/login");
      }

    },

    onError: (error) => {
      setLoading("error")
      notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something went wrong"}`);
    },
  });
  if (role && !token) return <Redirect from="/signup/creditcard" to="/dashboard" />;
  if (!businessId) return <Redirect from="/signup/creditcard" to="/businessdetails" />;
   if(!leadId) return <Redirect from="/signup/creditcard" to="/leaddetails" />;
  if (!businessId && !user && !leadId) return <Redirect from="/signup/creditcard" to="/signup" />;

  return (
    <BasicLayout logo={logo}>
      <Card>
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
            Payment Information
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Card Holder's Name"
                variant="standard"
                value={formik.values.cardHolderName}
                id="cardHolderName"
                autoComplete="cardHolderName"
                onChange={formik.handleChange}
                error={formik.touched.cardHolderName && Boolean(formik.errors.cardHolderName)}
                helperText={formik.touched.cardHolderName && formik.errors.cardHolderName}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Card Number"
                variant="standard"
                value={formik.values.cardNumber}
                id="cardNumber"
                autoComplete="cardNumber"
                onChange={formik.handleChange}
                error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                fullWidth
              />
            </MDBox>

            <MDBox mb={2} display="flex" gap={{ xs: 2, md: 4 }}>
              <MDBox mb={2} display="flex" gap={{ xs: 2, md: 4 }}>
                <MDInput
                  width={{ md: 200 }}
                  type="text"
                  label="Expiry Month"
                  variant="standard"
                  value={formik.values.expiryMonth}
                  id="expiryMonth"
                  autoComplete="expiryMonth"
                  onChange={formik.handleChange}
                  error={formik.touched.expiryMonth && Boolean(formik.errors.expiryMonth)}
                  helperText={formik.touched.expiryMonth && formik.errors.expiryMonth}
                />

                <MDInput
                  width={{ md: 200 }}
                  type="text"
                  label="Expiry Year"
                  variant="standard"
                  value={formik.values.expiryYear}
                  id="expiryYear"
                  autoComplete="expiryYear"
                  onChange={formik.handleChange}
                  error={formik.touched.expiryYear && Boolean(formik.errors.expiryYear)}
                  helperText={formik.touched.expiryYear && formik.errors.expiryYear}
                />
              </MDBox>

              <MDInput
                width={{ md: 700 }}
                type="text"
                label="CVV Code"
                variant="standard"
                value={formik.values.cvc}
                id="cvc"
                autoComplete="cvc"
                onChange={formik.handleChange}
                error={formik.touched.cvc && Boolean(formik.errors.cvc)}
                helperText={formik.touched.cvc && formik.errors.cvc}
              />
            </MDBox>
            {creditAmount?.amount?
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  label="Amount"
                  variant="standard"
                  value={formik.values.amount}
                  id="amount"
                  autoComplete="amount"
                  onChange={formik.handleChange}
                  // error={formik.touched.amount && Boolean(formik.errors.amount)}
                  // helperText={formik.touched.amount && formik.errors.amount}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start">£</InputAdornment>,
                  }}
                  disabled
                />
              </MDBox> : null

            }

            <MDBox mt={4} mb={1}>
              <MDButton color="secondary" type="submit" fullWidth isLoading={loading}>
                Save
              </MDButton>
            </MDBox>
            <ToastContainer />
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default CreditCardDetails;
