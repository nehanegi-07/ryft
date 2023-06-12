import React from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useMutation } from "react-query";
import { notifySuccess, notifyError } from "components/Messages";
import { updateleadAlertFrequency } from "services/User.Services";
import Tooltip from "@mui/material/Tooltip";
import { Autocomplete, Icon, TextField } from "@mui/material";

function LeadSetting({ handleCloseModal, userLeadFrequency, leadId }) {

    const navigate = useHistory();
    const [loading, setLoading] = React.useState('idle')
    const [leadFrequency, setLeadFrequency] = React.useState("")

    const changeLeadFrequency = (e, newValue) => {
        setLeadFrequency(newValue)
    }



    const { mutate } = useMutation(updateleadAlertFrequency, {
        onSuccess: (res) => {
            setLoading("pending")
            notifySuccess("Email Alert Updated")
            navigate.push("/user/businessprofile")
            setLoading("success")
        },
        onError: (error) => {
            setLoading("error")
            notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something went wrong"}`);
        }
    });

    const submitLeadFrequencyAlert = () => {
        mutate({ data: { leadAlertsFrequency: leadFrequency }, id: leadId })
    }

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
                        Notification Settings
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <Autocomplete
                                id="users-list"
                                options={["instant", "daily"]}
                                defaultValue={userLeadFrequency}
                                value={userLeadFrequency}
                                // getOptionLabel={(users) => `${users?.firstName} ${users?.lastName}`}
                                disableClearable
                                size="small"
                                onChange={(event, newValue) => changeLeadFrequency(event, newValue)}
                                renderInput={(params) => <TextField {...params} label="Alert Frequency" />}
                            />
                        </MDBox>


                        <MDBox mt={4} mb={1}>
                            <MDButton color="secondary" onClick={submitLeadFrequencyAlert} fullWidth isLoading={loading}>
                                Submit
                            </MDButton>
                        </MDBox>


                    </MDBox>
                </MDBox>
            </Card>
        </MDBox>

    );
}

export default LeadSetting;
