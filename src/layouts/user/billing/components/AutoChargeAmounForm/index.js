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
import { updateUserDetail } from "services/User.Services";

function AutoChargeAmountForm({ handleCloseModal, autoChargeAmount }) {
 
    const { user } = useUser()

  const initState = {
    autoChargeAmount:"",
  };
    
      const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: initState,
    // validationSchema: creditCardvalidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

    const { mutate } = useMutation(updateUserDetail, {
    onSettled: () => queryClient.invalidateQueries('usersDetailonBilling'),
    onSuccess: (res) => {
      handleCloseModal();
      notifySuccess("AutoCharge Updated Successfully  ")
    },
    onError: (error) => {
      notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something Went Wrong"}`)
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
          Update Auto Charge Amount
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
          <MDBox mb={2} sx={{ position: "relative" }}>
            <MDInput
              type="number"
              label="AutoCharge Amount"
              variant="standard"
              value={formik.values.autoChargeAmount}
              id="autoChargeAmount"
              autoComplete="autoChargeAmount"
              onChange={formik.handleChange}
              error={formik.touched.autoChargeAmount && Boolean(formik.errors.autoChargeAmount)}
              helperText={formik.touched.autoChargeAmount && formik.errors.autoChargeAmount}
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">£</InputAdornment>,
              }}
            />

          </MDBox>
          
          <MDBox mt={4} mb={1}>
            <MDButton color="secondary" type="submit" fullWidth>
              Add
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>

  );
}

export default AutoChargeAmountForm;
