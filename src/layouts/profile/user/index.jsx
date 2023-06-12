import React, { useState, useEffect } from "react"
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { updateUserDetailsvalidationSchema } from "validator";
import { getUserDetail, updateUserDetail } from "services/User.Services"
import { useMutation } from "react-query";
import { notifyError, notifySuccess } from "components/Messages";
import MDTypography from "components/MDTypography";
import MuiPhoneNumber from 'material-ui-phone-number';
import PhoneField from "components/PhoneField";
import { useUser } from 'context';
import { auth } from 'services/Authentication.Services';

function UserProfile() {
  const navigate = useHistory();
  const [user, setUser] = useState(null)
  const { setUser:setAuthUser } = useUser();

  useEffect(() => {
    const callbackFn = async () => {
      const result = await getUserDetail();
      const { data } = result.data
      setUser(data);
    }
    callbackFn()
  }, [])



  const setAuth = async () => {
    const result = await auth();
    const { data } = result.data;
    setAuthUser(data);
  };

  const initState = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    credits: user?.credits || '',
    buyerId: user?.buyerId || '',
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initState,
    validationSchema: updateUserDetailsvalidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const { mutate } = useMutation(updateUserDetail, {
    onSuccess: (res) => {
      setAuth()
      notifySuccess("Saved Successfully ")

    },
    onError: (error) => {
      notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something Went Wrong"}`)
    },
  });


  return (
    <MDBox py={3}>
      <MDBox>
        <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} md={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h5">User Details</MDTypography>
              </MDBox>
              <MDBox pt={2} pb={3} px={2}>
                <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
                  <MDBox
                    mb={2}
                    mx={{ lg: 1 }}

                  >
                    <MDInput
                      variant="standard"
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
                  <MDBox
                    mb={2}
                    mx={{ lg: 1 }}

                  >
                    <MDInput
                      type="text"
                      variant="standard"
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

                  <MDBox
                    mb={2}
                    mx={{ lg: 1 }}

                  >
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
                      disabled
                      fullWidth
                    />

                  </MDBox>



                  <MDBox mt={4} mb={1} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                    <MDButton color="info" type="submit">
                      Save
                    </MDButton>
                    <MDButton color="info" type="reset" onClick={() => formik.resetForm()}>
                      Reset
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default UserProfile;
