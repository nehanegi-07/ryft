import React,{useState} from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "react-query";
import { notifyError } from "components/Messages";
import { notifySuccess } from "components/Messages";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { updateLeadsDetail } from "services/User.Services";

function FeedBackNmgForm({ handleCloseModal, value, leadId }) {

    const queryClient = useQueryClient();
    const [loading, setLoading] = useState("idle")
    const initState = {
        feedbackForNMG: `${value}` || "",
        // leadId: `${leadId}` || ""
    };

    const formik = useFormik({
        initialValues: initState,
        onSubmit: (values) => {
            setLoading("pending")
            mutate({ leadId: leadId, data: values });
        },
    });

    const { mutate } = useMutation(updateLeadsDetail, {
        onSettled: () => queryClient.invalidateQueries('userleadsforadmin'),
        onSuccess: () => {
            setLoading("success")
            notifySuccess("Saved Successfully ")
            handleCloseModal();
        },
        onError: (error) => {
            notifyError("Something Went Wrong")
            setLoading("error")
        },
    });

    return (
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
                // coloredShadow="info"
                mx={6}
                mt={-3}
                p={1}
                mb={1}
                textAlign="center"
                textGradient
            >
                <MDTypography variant="h5" fontWeight="medium" color="white">
                    Feedback For NMG
                </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
                    <MDBox mb={2}>
                        <MDInput
                            type="text"
                            label="Feedback For NMG "
                            variant="standard"
                            value={formik.values.feedbackForNMG}
                            id="feedbackForNMG"
                            autoComplete="feedbackForNMG"
                            onChange={formik.handleChange}
                            error={formik.touched.feedbackForNMG && Boolean(formik.errors.feedbackForNMG)}
                            helperText={formik.touched.feedbackForNMG && formik.errors.feedbackForNMG}
                            fullWidth
                        />
                    </MDBox>
                    <MDBox mt={4} mb={1} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <MDButton color="info" type="submit" isLoading={loading} loaderColor="dark">
                            Save
                        </MDButton>
                        <MDButton color="info" type="reset" onClick={() => formik.resetForm()}>
                            Reset
                        </MDButton>
                    </MDBox>
                </MDBox>
            </MDBox>
        </Card>

    );
}

export default FeedBackNmgForm;
