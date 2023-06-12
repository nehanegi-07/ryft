import React from "react";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { InputAdornment } from '@mui/material';
import { useFormik } from "formik";
import { creditCardvalidationSchema } from "validator";
import { addCardDetailSaved, addCreditAmount } from "services/User.Services";
import { useMutation, useQueryClient } from "react-query";
import { notifyError } from "components/Messages";
import { notifySuccess } from "components/Messages";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { useUser } from "context";
import { auth } from "services/Authentication.Services";

function CreditForm({ handleCloseModal }) {
  const { user } = useUser()
  const {setUser}=useUser()
  const queryClient = useQueryClient()
  const [loading, setLoading] = React.useState("idle")

  const initState = {
    amount: null,
  };

  const formik = useFormik({
    initialValues: initState,
    // validationSchema: creditCardvalidationSchema,
    onSubmit: (values) => {
      setLoading("pending")
      mutate(values);
    },
  });

    const setAuth = async () => {
      const result = await auth();
      const { data } = result.data
      setUser(data)
    }



  const { mutate } = useMutation(addCreditAmount, {
    onSettled: () => queryClient.invalidateQueries({query:['usersDetailonBilling','transactionInvoiceData']}),
    onSuccess: (res) => {
      setLoading("success")
      handleCloseModal();
      setAuth()
      notifySuccess("Credit Added Successfully ")
    },
    onError: (error) => {
      notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something Went Wrong"}`)
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
          Add Credit
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
          <MDBox mb={2} sx={{ position: "relative" }}>
            <MDInput
              type="number"
              label="Amount"
              variant="standard"
              value={formik.values.amount}
              id="amount"
              autoComplete="amount"
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
            />

          </MDBox>
          <MDBox mt={3} mb={0} textAlign="left">
            <MDTypography variant="button" color="text" fontWeight="bold">
              <i> Will be using default selected card for Payment</i>
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton color="secondary" type="submit" isLoading={loading} fullWidth>
              Add
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>

  );
}

export default CreditForm;
