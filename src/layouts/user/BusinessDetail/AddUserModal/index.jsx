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
import { forgetPassword } from "services/Authentication.Services";
import { inviteUser } from "services/User.Services";
import Tooltip from "@mui/material/Tooltip";
import { Icon } from "@mui/material";

function InviteUser({ handleCloseModal }) {

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

    const { mutate } = useMutation(inviteUser, {
        onSuccess: (res) => {
            setLoading("pending")
            notifySuccess("User Invite Sent")
            navigate.push("/user/businessprofile")
            setLoading("success")
        },
        onError: (error) => {
            setLoading("error")
            notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something went wrong"}`);
        }
    });

    return (

        <MDBox mt={2}>
            <Card>
                <MDTypography variant="body2" color="secondary" display="flex" justifyContent="end">
                    <Tooltip title={""} placement="top" onClick={handleCloseModal}>
                        <Icon>close</Icon>
                    </Tooltip>
                </MDTypography>
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
                        Invite User
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


                    </MDBox>
                </MDBox>
            </Card>
        </MDBox>

    );
}

export default InviteUser;
