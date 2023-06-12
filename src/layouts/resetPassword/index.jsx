import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import { resetPassword } from "services/Authentication.Services";
import { forgetPasswordInvalidationSchema } from "validator"
import { ToastContainer } from "react-toastify";
import { notifyError, notifySuccess } from "components/Messages";

function ResetPassword() {
    const initState = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    }

    const formik = useFormik({
        initialValues: initState,
        validationSchema: forgetPasswordInvalidationSchema,
        onSubmit: (values) => {
            mutate(values);
        },
    });

    const { mutate } = useMutation(resetPassword, {
        onSuccess: (res) => {
            notifySuccess("Reset Successfully ")
        },
        onError: (error) => {
            notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something Went Wrong"}`)
        },
    });

    return (
        <MDBox py={3}>
            <MDBox>
                <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid item xs={12} lg={6}>
                        <Card id="change-password">
                            <MDBox p={3}>
                                <MDTypography variant="h5">Reset Password</MDTypography>
                            </MDBox>
                            <MDBox component="form" pb={3} px={3} onSubmit={formik.handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <MDInput
                                            fullWidth
                                            type="password"
                                            label="Current Password"
                                            value={formik.values.password}
                                            id="currentPassword"
                                            autoComplete="currentPassword"
                                            onChange={formik.handleChange}
                                            error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
                                            helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MDInput
                                            fullWidth
                                            type="password"
                                            label="New Password"
                                            value={formik.values.newPassword}
                                            id="newPassword"
                                            autoComplete="newPassword"
                                            onChange={formik.handleChange}
                                            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                                            helperText={formik.touched.newPassword && formik.errors.newPassword}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <MDInput
                                            label="Confirm Password"
                                            type="password"
                                            value={formik.values.confirmPassword}
                                            id="confirmPassword"
                                            autoComplete="confirmPassword"
                                            onChange={formik.handleChange}
                                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                                <MDBox mt={4} mb={1} textAlign="center" sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                    <MDButton variant="gradient" color="primary" type="submit">
                                        Reset
                                    </MDButton>
                                    <MDButton color="info" type="reset" onClick={() => formik.resetForm()}>
                                        Cancel
                                    </MDButton>
                                </MDBox>
                                <ToastContainer />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </MDBox>
    );
}

export default ResetPassword;
