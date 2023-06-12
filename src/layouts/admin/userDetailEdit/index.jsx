import React, { useState, useEffect } from "react"
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import Grid from "@mui/material/Grid";
import { useHistory, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import Switch from "@mui/material/Switch";
import { adminUserUpdateValidationSchema } from "validator";
import { getUser, updateUser } from "services/Admin.Services"
import { useMutation, useQuery } from "react-query";
import { notifyError, notifySuccess } from "components/Messages";
import MDTypography from "components/MDTypography";
import Icon from "@mui/material/Icon";
import PhoneField from "components/PhoneField";
import { check } from "prettier";
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import BasicModal from "components/Modal";
import AddMoreCreditsForUser from "../addMoreCredit";

function UserDetailEdit(props) {
    const navigate = useHistory();
    const [user, setUser] = useState(null);
    const [pause, setPause] = useState(false);
    const [loading, setLoading] = useState("idle")
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const location = useLocation()
    // console.log("location", location)
    const id = location?.pathname.split("/");


    const { isLoading, data, isSuccess } = useQuery(
        ['usersDetailEdit'],
        () => getUser(id[2]),
        {
            cacheTime: 0,
            keepPreviousData: true,
            staleTime: Infinity,
        }
    );

    useEffect(() => {
        // const callbackFn = async () => {
        //     const result = await getUser(id[2]);
        //     const { data } = result.data
        setUser(data?.data?.data);
        // }
        // callbackFn()
    }, [data])

    const initState = {
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.email || '',
        businessSalesNumber: user?.businessDetailsId?.businessSalesNumber || '',
        businessName: user?.businessDetailsId?.businessName || '',
        businessAddress: user?.businessDetailsId?.businessAddress || '',
        businessCity: user?.businessDetailsId?.businessCity || '',
        businessCountry: user?.businessDetailsId?.businessCountry || '',
        businessPostCode: user?.businessDetailsId?.businessPostCode || '',
        leadCost: user?.leadCost || "",
        autoCharge: user?.autoCharge || false,
        buyerId: user?.buyerId || "",
        // credits: user?.credits || "",
        paymentMethod: user?.paymentMethod || ""
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initState,
        validationSchema: adminUserUpdateValidationSchema,
        onSubmit: (userData) => {
            setLoading("pending")
            mutate({ id: id[2], data: userData });
        },
    });

    const { mutate } = useMutation(updateUser, {
        onSuccess: (res) => {
            navigate.push("/admin/userlist")
            notifySuccess("Saved Successfully ")
            setLoading("success")
        },
        onError: (error) => {
            setLoading("error")
            notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something Went Wrong"}`)
        },
    });

    const handleAutoCharge = (event, checked) => {
        formik.setFieldValue("autoCharge", checked ? true : false);
        setPause(!pause);
    }

    const backTouserList = () => {
        navigate.push("/admin/userlist")
    }

    return (
        <MDBox py={3}>
            <MDBox>
                <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid item xs={12} md={12} lg={8} sx={{ display: "flex", flexDirection: "column" }}>
                        <Card>
                            <MDBox p={3} display="flex" justifyContent="space-between">
                                <MDTypography variant="h5">User Details</MDTypography>
                                {/* <MDTypography color="dark">Back</MDTypography> */}
                                <MDButton color="dark" onClick={(e) => backTouserList(e)}>
                                    Back
                                </MDButton>
                            </MDBox>
                            <MDBox pt={2} pb={3} px={2}>
                                <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
                                    <MDBox
                                        mb={2}
                                        mx={{ lg: 1 }}
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        gap={{ xs: 2, md: 4 }}
                                    >
                                        <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            variant="standard"
                                            type="text"
                                            label="First Name"
                                            value={formik.values.firstName}
                                            id="firstName"
                                            autoComplete="firstName"
                                            onChange={formik.handleChange}
                                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                            helperText={formik.touched.firstName && formik.errors.firstName}
                                        />

                                        <MDInput
                                            type="text"
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            variant="standard"
                                            label="Last Name"
                                            value={formik.values.lastName}
                                            id="lastName"
                                            autoComplete="lastName"
                                            onChange={formik.handleChange}
                                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                            helperText={formik.touched.lastName && formik.errors.lastName}
                                        />
                                    </MDBox>

                                    <MDBox
                                        mb={2}
                                        mx={{ lg: 1 }}
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        gap={{ xs: 2, md: 4 }}
                                    >
                                        <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="email"
                                            label="Email"
                                            variant="standard"
                                            value={formik.values.email}
                                            id="email"
                                            autoComplete="email"
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}

                                        />
                                       <PhoneField
                                            dataCy="user-phone"
                                            defaultCountry={"us"}
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="text"
                                            label="Sales Phone Number"
                                            value={formik.values.businessSalesNumber}
                                            variant="standard"
                                            id="businessSalesNumber"
                                            autoComplete="businessSalesNumber"
                                            onChange={formik.handleChange("businessSalesNumber")}
                                            error={
                                                formik.touched.businessSalesNumber && Boolean(formik.errors.businessSalesNumber)
                                            }
                                            helperText={
                                                formik.touched.businessSalesNumber && formik.errors.businessSalesNumber
                                            }
                                        />

                                        {/* <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="text"
                                            label="Sales Phone Number"
                                            value={formik.values.businessSalesNumber}
                                            variant="standard"
                                            id="businessSalesNumber"
                                            autoComplete="businessSalesNumber"
                                            onChange={formik.handleChange}
                                            error={
                                                formik.touched.businessSalesNumber && Boolean(formik.errors.businessSalesNumber)
                                            }
                                            helperText={
                                                formik.touched.businessSalesNumber && formik.errors.businessSalesNumber
                                            }
                                        /> */}
                                    </MDBox>

                                    <MDBox
                                        mb={2}
                                        mx={{ lg: 1 }}
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        gap={{ xs: 2, md: 4 }}
                                    >
                                        <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="text"
                                            label="Company Name"
                                            value={formik.values.businessName}
                                            variant="standard"
                                            id="businessName"
                                            autoComplete="businessName"
                                            onChange={formik.handleChange}
                                            error={formik.touched.businessName && Boolean(formik.errors.businessName)}
                                            helperText={formik.touched.businessName && formik.errors.businessName}
                                            disabled
                                        />
                                        <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="text"
                                            label="Business Address"
                                            value={formik.values.businessAddress}
                                            variant="standard"
                                            id="businessAddress"
                                            autoComplete="businessAddress"
                                            onChange={formik.handleChange}
                                            error={formik.touched.businessAddress && Boolean(formik.errors.businessAddress)}
                                            helperText={formik.touched.businessAddress && formik.errors.businessAddress}
                                        />
                                    </MDBox>
                                    <MDBox
                                        mb={2}
                                        mx={{ lg: 1 }}
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        gap={{ xs: 2, md: 4 }}
                                    >
                                        <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="text"
                                            label="Business City"
                                            value={formik.values.businessCity}
                                            variant="standard"
                                            id="businessCity"
                                            autoComplete="businessCity"
                                            onChange={formik.handleChange}
                                            error={formik.touched.businessCity && Boolean(formik.errors.businessCity)}
                                            helperText={formik.touched.businessCity && formik.errors.businessCity}
                                        />
                                        <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="text"
                                            label="Business Country"
                                            variant="standard"
                                            value={formik.values.businessCountry}
                                            id="businessCountry"
                                            autoComplete="businessCountry"
                                            onChange={formik.handleChange}
                                            error={formik.touched.businessCountry && Boolean(formik.errors.businessCountry)}
                                            helperText={formik.touched.businessCountry && formik.errors.businessCountry}
                                        />
                                    </MDBox>

                                    <MDBox
                                        mb={2}
                                        mx={{ lg: 1 }}
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        gap={{ xs: 2, md: 4 }}
                                    >
                                        <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="text"
                                            label="Business PostCode"
                                            variant="standard"
                                            value={formik.values.businessPostCode}
                                            id="businessPostCode"
                                            autoComplete="businessPostCode"
                                            onChange={formik.handleChange}
                                            error={formik.touched.businessPostCode && Boolean(formik.errors.businessPostCode)}
                                            helperText={formik.touched.businessPostCode && formik.errors.businessPostCode}
                                        />
                                                                                <MDInput
                                            type="number"
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            label="Lead CPL"
                                            variant="standard"
                                            value={formik.values.leadCost}
                                            id="leadCost"
                                            autoComplete="leadCost"
                                            onChange={formik.handleChange}
                                            error={formik.touched.leadCost && Boolean(formik.errors.leadCost)}
                                            helperText={formik.touched.leadCost && formik.errors.leadCost}

                                        />
                                    </MDBox>
                                    <MDBox
                                        mb={2}
                                        mx={{ lg: 1 }}
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        gap={{ xs: 2, md: 4 }}
                                    >
                                        <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="text"
                                            label="Buyer Id"
                                            variant="standard"
                                            value={formik.values.buyerId}
                                            id="buyerId"
                                            autoComplete="buyerId"
                                            onChange={formik.handleChange}
                                            error={formik.touched.buyerId && Boolean(formik.errors.buyerId)}
                                            helperText={formik.touched.buyerId && formik.errors.buyerId}

                                        />

                                        {/* <MDInput
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                            type="number"
                                            label="Credit"
                                            variant="standard"
                                            value={formik.values.credits}
                                            id="credits"
                                            autoComplete="credits"
                                            onChange={formik.handleChange}
                                            error={formik.touched.credits && Boolean(formik.errors.credits)}
                                            helperText={formik.touched.credits && formik.errors.credits}
                                        /> */}
                                    </MDBox>

                                    <MDBox
                                        mb={2}
                                        mx={{ lg: 1 }}
                                        display="flex"
                                        flexDirection={{ xs: "column", md: "row" }}
                                        gap={{ xs: 2, md: 4 }}
                                    >


                                        <MDBox
                                            display="flex"
                                            justifyContent={{ md: "flex-start" }}
                                            alignItems="center"
                                            lineHeight={1}
                                            sx={{
                                                width: { md: 500, lg: 700 },
                                            }}
                                        >
                                            {/* <MDInput
                                                sx={{
                                                    width: { md: 500, lg: 700 },
                                                }}
                                                type="number"
                                                label="Credit"
                                                variant="standard"
                                                value={formik.values.credits}
                                                id="credits"
                                                autoComplete="credits"
                                                onChange={formik.handleChange}
                                                error={formik.touched.credits && Boolean(formik.errors.credits)}
                                                helperText={formik.touched.credits && formik.errors.credits}
                                            /> */}
                                            <MDBox sx={{ display: "flex", flexDirection: "column" }}>
                                                <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 15, mr: 2, fontWeight: "bold" }}>Payment</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="paymentMethod"
                                                    value={formik.values.paymentMethod}
                                                    onChange={formik.handleChange}
                                                    id="paymentMethod"
                                                    autoComplete="paymentMethod"
                                                    error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
                                                    helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
                                                >
                                                    <FormControlLabel value="auto charge" control={<Radio />} label="Auto charge" />
                                                    <FormControlLabel value="weekly payment" control={<Radio />} label="Weekly Payment" />
                                                    <FormControlLabel value="add credits manually" control={<Radio />} label="Manual Top Up" />

                                                </RadioGroup>
                                            </MDBox>


                                        </MDBox>
                                    </MDBox>

                                    <MDBox mt={4} mb={1} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                        <MDButton color="info" type="submit" isLoading={loading}>
                                            Save
                                        </MDButton>
                                        <MDButton color="info" type="reset" onClick={() => formik.resetForm()}>
                                            Reset
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                            </MDBox>



                        </Card>
                        <Card sx={{ mt: 3 }}>
                            <MDBox p={3} display="flex" justifyContent="space-between">
                                <MDTypography variant="h5">Credits: £{user?.credits || 0} </MDTypography>
                                {/* <MDTypography color="dark">Back</MDTypography> */}
                                <MDButton color="dark" onClick={handleOpen}>
                                    <Icon sx={{ fontWeight: 'bold' }}>add</Icon>
                                    &nbsp;add More Credit
                                </MDButton>
                            </MDBox>

                        </Card>
                        <BasicModal open={open} handleClose={handleClose}>
                            <AddMoreCreditsForUser handleCloseModal={handleClose} id={id[2]} />
                        </BasicModal>
                    </Grid>
                </Grid>
            </MDBox>
        </MDBox>
    );
}

export default UserDetailEdit;
