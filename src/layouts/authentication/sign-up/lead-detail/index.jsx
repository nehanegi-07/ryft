import React from "react";
import { useHistory,Redirect} from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import { useFormik } from "formik";
import { leadDetailsInvalidationSchema } from "../../../../validator/index";
import { useMutation } from "react-query";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "components/Messages";
import logo from "assets/images/main-logo/logo.png";
import Grid from "@mui/material/Grid";
import { leadsDetailsRegister } from "services/Authentication.Services";

function LeadDetails() {
    const user = JSON.parse(localStorage.getItem('id'));
    const businessId = JSON.parse(localStorage.getItem('business_Id'));
    const role = JSON.parse(localStorage.getItem('user'));

    const navigate = useHistory();
    const [loading, setLoading] = React.useState('idle')
    const initState = {
        total: "",
        monthly: "",
        weekly: "",
        daily: "",
        paymentMethod: "auto charge" ,
        leadSchedule: [{
            day: "",
            openTime: "00:00" || "",
            closeTime: "00:00" || ""
        }, {
            day: "",
            openTime: "00:00" || "",
            closeTime: "00:00" || ""
        }, {
            day: "",
            openTime: "00:00" || "",
            closeTime: "00:00" || ""
        }, {
            day: "",
            openTime: "00:00" || "",
            closeTime: "00:00" || ""
        }, {
            day: "",
            openTime: "00:00" || "",
            closeTime: "00:00" || ""
        }, {
            day: "",
            openTime: "00:00" || "",
            closeTime: "00:00" || ""
        }, {
            day: "",
            openTime: "00:00" || "",
            closeTime: "00:00" || ""
        }],
        postcodeTargettingList: "",
        userId: user?.id || ""
    };


    const leadScheduleData = [
        {
            value: "Monday",
            place: 0,
        },
        {
            value: "Tuesday",
            place: 1,
        },
        {
            value: "Wednesday",
            place: 2,
        },
        {
            value: "THURSDAY",
            place: 3,
        },
        {
            value: "FRIDAY",
            place: 4,
        },
        {
            value: "SATURDAY",
            place: 5,
        },
        {
            value: "SUNDAY",
            place: 6,
        }
    ]
    const formik = useFormik({
        initialValues: initState,
        validationSchema: leadDetailsInvalidationSchema,
        onSubmit: (values) => {
            setLoading("pending")
            mutate(values)
        },
    });

    const { mutate } = useMutation(leadsDetailsRegister, {
        onSuccess: (res) => {
            setLoading("pending")
            notifySuccess("Leads Detail Saved Successfully")
            setLoading("success")
            let detail = JSON.stringify({
                id: res.data.data._id,
            });
            localStorage.setItem("lead_id", detail)
            navigate.push("/signup/creditcard")
        },
        onError: (error) => {
            setLoading("error")
            notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something went wrong"}`);
        }
    });
    if (role) return <Redirect from="/leaddetails" to="/dashboard" />;
    if (!businessId) return <Redirect from="/leaddetails" to="/businessdetails" />;
    if (!businessId && !user) return <Redirect from="/leaddetails" to="/signup" />;

    return (
        <BasicLayout logo={logo} xs={11} sm={9} md={7} lg={5} xl={4}>
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
                    <MDTypography variant="h4" fontWeight="medium" color="white">  Lead Details
                    </MDTypography>
                </MDBox>
                <MDBox pt={2} pb={3} px={3}>
                    <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
                        {/* <MDBox mb={1} mt={2}>
                            <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 15 }}>Payment Method</FormLabel>
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
                                <FormControlLabel value="add credits manually" control={<Radio />} label="Add Credits Manually" />

                            </RadioGroup>
                        </MDBox> */}

                        <MDBox mb={2}>
                            <MDInput
                                type="number"
                                label="Total"
                                variant="standard"
                                value={formik.values.total}
                                id="total"
                                autoComplete="total"
                                onChange={formik.handleChange}
                                error={formik.touched.total && Boolean(formik.errors.total)}
                                helperText={formik.touched.total && formik.errors.total}
                                fullWidth
                            />
                        </MDBox>

                        < Grid container spacing={3} >
                            <Grid item xs={12} sm={6}>
                                <MDInput
                                    type="text"
                                    label="Monthly"
                                    variant="standard"
                                    value={formik.values.monthly}
                                    id="monthly"
                                    autoComplete="monthly"
                                    onChange={formik.handleChange}
                                    error={formik.touched.monthly && Boolean(formik.errors.monthly)}
                                    helperText={formik.touched.monthly && formik.errors.monthly}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <MDInput
                                    type="text"
                                    label="Weekly"
                                    variant="standard"
                                    value={formik.values.weekly}
                                    id="weekly"
                                    autoComplete="weekly"
                                    onChange={formik.handleChange}
                                    error={formik.touched.weekly && Boolean(formik.errors.weekly)}
                                    helperText={formik.touched.weekly && formik.errors.weekly}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <MDInput
                                    type="text"
                                    label="Daily"
                                    variant="standard"
                                    value={formik.values.daily}
                                    id="daily"
                                    autoComplete="daily"
                                    onChange={formik.handleChange}
                                    error={formik.touched.daily && Boolean(formik.errors.daily)}
                                    helperText={formik.touched.daily && formik.errors.daily}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <MDBox mb={3} mt={2}>
                            <MDInput
                                type="text"
                                label="Postcode Targetting List"
                                variant="standard"
                                value={formik.values.postcodeTargettingList}
                                id="postcodeTargettingList"
                                autoComplete="postcodeTargettingList"
                                onChange={formik.handleChange}
                                error={formik.touched.postcodeTargettingList && Boolean(formik.errors.postcodeTargettingList)}
                                helperText={formik.touched.postcodeTargettingList && formik.errors.postcodeTargettingList}
                                fullWidth
                            />
                        </MDBox>

                        {leadScheduleData.map((item) => {

                            return (
                                < Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <MDBox display="flex" alignItems="center">

                                            <Checkbox
                                                defaultChecked={""}
                                                name={`leadSchedule[${item.place}].day`}
                                                value={item.value}
                                                id={`leadSchedule[${item.place}].day`}
                                                autoComplete={`leadSchedule[${item.place}].day`}
                                                onChange={(e) => formik.setFieldValue(`leadSchedule[${item.place}].day`, e.target.value)}
                                                error={formik.touched.leadSchedule && Boolean(formik.errors.leadSchedule)}
                                                helperText={formik.touched.leadSchedule && formik.errors.leadSchedule}
                                                fullWidth />
                                            <MDBox ml={1}>
                                                <MDTypography variant="caption" fontWeight="medium" color="text">
                                                    {item.value}
                                                </MDTypography>
                                            </MDBox>
                                        </MDBox>

                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <MDInput
                                            type="time"
                                            label="Open Time"
                                            variant="standard"
                                            name={`leadSchedule[${item.place}].openTime`}
                                            value={formik.values.leadSchedule[item.place].openTime}
                                            id={`leadSchedule[${item.place}].openTime`}
                                            autoComplete={`leadSchedule[${item.place}].openTime`}
                                            onChange={formik.handleChange}
                                            error={formik.touched.leadSchedule && Boolean(formik.errors.leadSchedule)}
                                            helperText={formik.touched.leadSchedule && formik.errors.leadSchedule}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={3}>
                                        <MDInput
                                            type="time"
                                            label="Close Time"
                                            variant="standard"
                                            name={`leadSchedule[${item.place}].closeTime`}
                                            value={formik.values.leadSchedule[item.place].closeTime}
                                            id={`leadSchedule[${item.place}].closeTime`}
                                            autoComplete={`leadSchedule[${item.place}].closeTime`}
                                            onChange={formik.handleChange}
                                            error={formik.touched.leadSchedule && Boolean(formik.errors.leadSchedule)}
                                            helperText={formik.touched.leadSchedule && formik.errors.leadSchedule}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            )
                        })}


                        <MDBox mt={4} mb={1} textAlign="center">
                            <MDButton variant="gradient" color="primary" type="submit" isLoading={loading}>
                                NEXT
                            </MDButton>
                        </MDBox>
                        <ToastContainer />
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout >
    );
}

export default LeadDetails;
