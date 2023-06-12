import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useMutation, useQuery } from "react-query";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { userLeadsSettingSave, getLeadDetail } from "services/Admin.Services";
import Loader from "components/Loader";
import { notifySuccess } from "components/Messages";
import Icon from "@mui/material/Icon";
import InputAdornment from '@mui/material/InputAdornment';

function Settings() {

  const [autoChargeFields, setAutoChargeFields] = useState(null)
  const copyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      notifySuccess("LeadByte Key Copied")
    })
  }

  useEffect(() => {
    const callbackFn = async () => {
      const result = await getLeadDetail();
      const { data } = result.data
      setAutoChargeFields(data);
    }
    callbackFn()
  }, [])

  const initState = {
    amount:autoChargeFields?.amount||"",
    thresholdValue: autoChargeFields?.thresholdValue || "",
    defaultLeadAmount: autoChargeFields?.defaultLeadAmount || "",
    leadByteKey: autoChargeFields?.leadByteKey || ""
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initState,
    // validationSchema: signUpvalidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const { mutate } = useMutation(userLeadsSettingSave, {
    onSuccess: (res) => {
      toast.success("Successfully Saved!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
    onError: (error) => {
      toast.error(`${error.response.data.data.message}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    },
  });

  return (
    <MDBox py={3}>
      <MDBox>
        <Grid container spacing={3} sx={{ display: "flex", justifyContent: "center" }}>
          <Grid item xs={12} lg={6}>
            <Card id="change-password">
              <MDBox p={3}>
                <MDTypography variant="h5">User Lead Settings</MDTypography>
              </MDBox>
              <MDBox component="form" pb={3} px={3} onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <MDInput
                      label="Auto Charge Amount"
                      type="text"
                      value={formik.values.amount}
                      id="amount"
                      autoComplete="amount"
                      onChange={formik.handleChange}
                      error={formik.touched.amount && Boolean(formik.errors.amount)}
                      helperText={formik.touched.amount && formik.errors.amount}
                      fullWidth
                      InputProps={{
                        startAdornment:<InputAdornment position="start">£</InputAdornment>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Threshold Amount in % (left)"
                      type="text"
                      value={formik.values.thresholdValue}
                      id="thresholdValue"
                      autoComplete="thresholdValue"
                      onChange={formik.handleChange}
                      error={formik.touched.thresholdValue && Boolean(formik.errors.thresholdValue)}
                      helperText={formik.touched.thresholdValue && formik.errors.thresholdValue}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MDInput
                      label="Lead CPL"
                      type="text"
                      value={formik.values.defaultLeadAmount}
                      id="defaultLeadAmount"
                      autoComplete="defaultLeadAmount"
                      onChange={formik.handleChange}
                      error={formik.touched.defaultLeadAmount && Boolean(formik.errors.defaultLeadAmount)}
                      helperText={formik.touched.defaultLeadAmount && formik.errors.defaultLeadAmount}
                      InputProps={{
                        startAdornment:<InputAdornment position="start">£</InputAdornment>,
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: "flex", alignItems: "center" }}>
                    <span style={{ width: "90%", fontSize: "14px" }}>
                      <MDTypography variant="button" fontWeight="medium" gutterBottom sx={{ mr: 0.5 }}>LeadByte Key:{" "}</MDTypography>   {autoChargeFields?.leadByteKey}
                    </span>
                    <MDButton variant="outlined" color="info" onClick={() => copyUrl(`${autoChargeFields?.leadByteKey}`)} iconOnly circular>
                      <Icon sx={{ fontWeight: "bold" }}>copy</Icon>
                    </MDButton>
                  </Grid>
                </Grid>
                <MDBox mt={4} mb={1} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                  <MDButton variant="gradient" color="primary" type="submit">
                    Save
                  </MDButton>
                  <MDButton color="info" type="reset" onClick={() => formik.resetForm()}>
                    Reset
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default Settings;
