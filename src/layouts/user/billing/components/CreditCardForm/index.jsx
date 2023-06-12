import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { InputAdornment } from '@mui/material';
import { useFormik } from "formik";
import { creditCardvalidationSchema } from "validator";
import { addCardDetailSaved } from "services/User.Services";
import { useMutation, useQueryClient } from "react-query";
import { notifyError } from "components/Messages";
import { notifySuccess } from "components/Messages";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { useUser } from "context";

function CreditCardForm({ handleCloseModal }) {
  const { user } = useUser()
  const queryClient = useQueryClient()

  const initState = {
    cardHolderName: `${user?.firstName} ${user?.lastName} ` || "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    // amount: 500,
    isDefault: false,
  };

  const formik = useFormik({
    initialValues: initState,
    validationSchema: creditCardvalidationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  const { mutate } = useMutation(addCardDetailSaved,{
    onSuccess: (res) => {
      handleCloseModal();
      notifySuccess("New Card Added Successfully")
    },
    onError: (error) => {
      notifyError(`${(error?.response?.data?.error?.message) ? error.response.data.error.message : "Something Went Wrong"}`)
    },
    onSettled: () => queryClient.invalidateQueries('cardsDetailForBilling'),
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
          Add New Card
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Card Holder's Name"
              variant="standard"
              value={formik.values.cardHolderName}
              id="cardHolderName"
              autoComplete="cardHolderName"
              onChange={formik.handleChange}
              error={formik.touched.cardHolderName && Boolean(formik.errors.cardHolderName)}
              helperText={formik.touched.cardHolderName && formik.errors.cardHolderName}
              fullWidth
            />
          </MDBox>
          <MDBox mb={2}>
            <MDInput
              type="text"
              label="Card Number"
              variant="standard"
              value={formik.values.cardNumber}
              id="cardNumber"
              autoComplete="cardNumber"
              onChange={formik.handleChange}
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
              fullWidth
            />
          </MDBox>

          <MDBox mb={2} display="flex" gap={{ xs: 2, md: 4 }}>
            <MDBox mb={2} display="flex" gap={{ xs: 2, md: 4 }}>
              <MDInput
                width={{ md: 200 }}
                type="text"
                label="Expiry Month"
                variant="standard"
                value={formik.values.expiryMonth}
                id="expiryMonth"
                autoComplete="expiryMonth"
                onChange={formik.handleChange}
                error={formik.touched.expiryMonth && Boolean(formik.errors.expiryMonth)}
                helperText={formik.touched.expiryMonth && formik.errors.expiryMonth}
              />

              <MDInput
                width={{ md: 200 }}
                type="text"
                label="Expiry Year"
                variant="standard"
                value={formik.values.expiryYear}
                id="expiryYear"
                autoComplete="expiryYear"
                onChange={formik.handleChange}
                error={formik.touched.expiryYear && Boolean(formik.errors.expiryYear)}
                helperText={formik.touched.expiryYear && formik.errors.expiryYear}
              />
            </MDBox>

            <MDInput
              width={{ md: 700 }}
              type="text"
              label="CVV Code"
              variant="standard"
              value={formik.values.cvc}
              id="cvc"
              autoComplete="cvc"
              onChange={formik.handleChange}
              error={formik.touched.cvc && Boolean(formik.errors.cvc)}
              helperText={formik.touched.cvc && formik.errors.cvc}
            />
          </MDBox>
          {/* <MDBox mb={2} sx={{ position: "relative" }}>
            <MDInput
              type="text"
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

          </MDBox> */}

          <MDBox mt={4} mb={1}>
            <MDButton color="secondary" type="submit" fullWidth>
              Save
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>

  );
}

export default CreditCardForm;
