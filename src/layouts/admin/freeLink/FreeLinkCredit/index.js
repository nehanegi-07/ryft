import React from 'react';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import { InputAdornment } from '@mui/material';
import { useFormik } from 'formik';
import { useMutation, useQueryClient } from 'react-query';
import { notifyError } from 'components/Messages';
import { notifySuccess } from 'components/Messages';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';
import { generateFreeLink } from 'services/Admin.Services';

function FreeLinkCredit({ handleCloseModal }) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState('idle');
  const initState = {
    freeCredits: null,
    maxUseCounts:null
  };

  const formik = useFormik({
    initialValues: initState,
    // validationSchema: creditCardvalidationSchema,
    onSubmit: (values) => {
      setLoading('pending');
      mutate(values);
    },
  });

  const { mutate } = useMutation(generateFreeLink, {
    onSettled: () => queryClient.invalidateQueries('freeLinks'),
    onSuccess: (res) => {
      setLoading('success');
      handleCloseModal();
      notifySuccess('Free Link Generated Successfully ');
    },
    onError: (error) => {
      notifyError(
        `${
          error?.response?.data?.error?.message
            ? error.response.data.error.message
            : 'Something Went Wrong'
        }`
      );
      setLoading('error');
    },
  });

  return (
    <Card>
      <MDTypography
        variant="body2"
        color="secondary"
        display="flex"
        justifyContent="end"
      >
        <Tooltip title={''} placement="top" onClick={handleCloseModal}>
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
          Free Link Credit
        </MDTypography>
      </MDBox>
      <MDBox pt={4} pb={3} px={3}>
        <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
          <MDBox mb={2} sx={{ position: 'relative' }}>
            <MDInput
              fullWidth
              type="number"
              label="Free Credit"
              variant="standard"
              value={formik.values.freeCredits}
              id="freeCredits"
              autoComplete="freeCredits"
              onChange={formik.handleChange}
              error={
                formik.touched.freeCredits && Boolean(formik.errors.freeCredits)
              }
              helperText={
                formik.touched.freeCredits && formik.errors.freeCredits
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              }}
            />

            <MDInput
              fullWidth
              type="number"
              sx={{mt:2}}
              label="Maximum Use Count"
              variant="standard"
              value={formik.values.maxUseCounts}
              id="maxUseCounts"
              autoComplete="maxUseCounts"
              onChange={formik.handleChange}
              error={
                formik.touched.maxUseCounts && Boolean(formik.errors.maxUseCounts)
              }
              helperText={
                formik.touched.maxUseCounts && formik.errors.maxUseCounts
              }
            />
          </MDBox>
          <MDBox mt={3} mb={0} textAlign="left">
            <MDTypography variant="button" color="text" fontWeight="bold">
              <i> Add Credit for Free Link</i>
            </MDTypography>
          </MDBox>
          <MDBox mt={4} mb={1}>
            <MDButton
              color="secondary"
              type="submit"
              isLoading={loading}
              fullWidth
            >
              Add
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default FreeLinkCredit;
