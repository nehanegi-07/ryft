import React from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import MDAvatar from 'components/MDAvatar';
import Tooltip from '@mui/material/Tooltip';
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import { useFormik } from 'formik';
import { businessDetailsValidationSchema } from '../../../../validator/index';
import Checkbox from '@mui/material/Checkbox';
import { useMutation } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { notifySuccess, notifyError } from 'components/Messages';
import logo from 'assets/images/main-logo/logo.png';
import { businessDetailsRegister } from 'services/Authentication.Services';
import PhoneField from 'components/PhoneField';
// import Dropzone from "react-dropzone";'react-dropzone'
import Dropzone from 'react-dropzone';
import './index.css';

import Grid from '@mui/material/Grid';
import { Autocomplete, Icon, TextField } from '@mui/material';

function BusinessDetails() {
  const user = JSON.parse(localStorage.getItem('id'));
  const role = JSON.parse(localStorage.getItem('user'));

  const navigate = useHistory();
  const [loading, setLoading] = React.useState('idle');
  const [file, setFile] = React.useState(null);

  const initState = {
    businessIndustry: null,
    businessName: '',
    businessSalesNumber: '',
    businessAddress: '',
    businessCity: '',
    businessCountry: '',
    businessPostCode: '',
    businessOpeningHours: [
      {
        day: '',
        openTime: '00:00' || '',
        closeTime: '00:00' || '',
      },
      {
        day: '',
        openTime: '00:00' || '',
        closeTime: '00:00' || '',
      },
      {
        day: '',
        openTime: '00:00' || '',
        closeTime: '00:00' || '',
      },
      {
        day: '',
        openTime: '00:00' || '',
        closeTime: '00:00' || '',
      },
      {
        day: '',
        openTime: '00:00' || '',
        closeTime: '00:00' || '',
      },
      {
        day: '',
        openTime: '00:00' || '',
        closeTime: '00:00' || '',
      },
      {
        day: '',
        openTime: '00:00' || '',
        closeTime: '00:00' || '',
      },
    ],
    // businessLogo:"",
    userId: user?.id || '',
  };

  const businessOpeningHoursData = [
    {
      value: 'Monday',
      place: 0,
    },
    {
      value: 'Tuesday',
      place: 1,
    },
    {
      value: 'Wednesday',
      place: 2,
    },
    {
      value: 'Thursday',
      place: 3,
    },
    {
      value: 'Friday',
      place: 4,
    },
    {
      value: 'Saturday',
      place: 5,
    },
    {
      value: 'Sunday',
      place: 6,
    },
  ];

  const businessIndustries = [
    'Boilers',
    'Business Brokerage',
    'Business Energy',
    'Business Loans',
    'Debt Management',
    'ECO4',
    'Education',
    'Investment',
    'Garden Rooms',
    'Hearing Aids',
    'Mortgage',
    'Radiators',
    'Other',
    'Solar Panels',
    'Spray Foam',
    'Payment Processing',
    'Windows & Doors',
    'Wealth Management',
    'Will Writing'
  ];


  const formik = useFormik({
    initialValues: initState,
    validationSchema: businessDetailsValidationSchema,
    onSubmit: (values) => {
      setLoading('pending');
      mutate(values);
    },
  });

  const { mutate } = useMutation(businessDetailsRegister, {
    onSuccess: (res) => {
      notifySuccess('Business Details Saved Successfully');
      setLoading('success');
      let detail = JSON.stringify({
        id: res.data.data._id,
      });
      localStorage.setItem('business_Id', detail);
      navigate.push('/leaddetails');
    },
    onError: (error) => {
      setLoading('error');
      notifyError(
        `${
          error?.response?.data?.error?.message
            ? error.response.data.error.message === 'VALIDATIONS_ERROR'
              ? 'Logo Required'
              : error.response.data.error.message
            : 'Something went wrong'
        }`
      );
    },
  });
  if (role) return <Redirect from="/businessdetails" to="/dashboard" />;
  if (!user) return <Redirect from="/businessdetails" to="/signup" />;
  return (
    <BasicLayout logo={logo} xs={11} sm={9} md={7} lg={5} xl={4}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          mx={{ lg: 10, xs: 5, md: 5 }}
          mt={-3}
          p={1}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={''}>
            Your Business Details
          </MDTypography>
        </MDBox>
        <MDBox pt={2} pb={1} px={1}>
          <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
            <MDBox
              mb={2}
              mx={{ lg: 1 }}
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              gap={{ xs: 2, md: 4 }}
              justifyContent="center"
            >
              {/* <MDInput
                                type="text"
                                label="Business Industry"
                                variant="standard"
                                width={{ md: 700 }}
                                value={formik.values.businessIndustry}
                                id="businessIndustry"
                                autoComplete="businessIndustry"
                                onChange={formik.handleChange}
                                error={formik.touched.businessIndustry && Boolean(formik.errors.businessIndustry)}
                                helperText={formik.touched.businessIndustry && formik.errors.businessIndustry}
                                fullWidth
                            /> */}

              <Autocomplete
                disableClearable
                options={businessIndustries}
                value={formik.values.businessIndustry}
                defaultValue={formik.values.businessIndustry}
                sx={{ width: { md: 590 } }}
                onChange={(event, value) =>
                  (formik.values.businessIndustry = value)
                }
                renderInput={(params) => (
                  <MDInput
                    {...params}
                    fullWidth
                    label="Business Industry"
                    variant="standard"
                    error={Boolean(
                      formik.touched.businessIndustry &&
                        formik.errors.businessIndustry
                    )}
                    helperText={
                      formik.touched.businessIndustry &&
                      formik.errors.businessIndustry
                    }
                    onBlur={formik.handleBlur}
                  />
                )}
              />

              <MDInput
                type="text"
                width={{ md: 700 }}
                label="Business Name"
                variant="standard"
                value={formik.values.businessName}
                id="businessName"
                autoComplete="businessName"
                onChange={formik.handleChange}
                error={
                  formik.touched.businessName &&
                  Boolean(formik.errors.businessName)
                }
                helperText={
                  formik.touched.businessName && formik.errors.businessName
                }
                fullWidth
              />
              {/* <MDInput
                            type="text"
                            width={{ md: 700 }}
                            label="Last Name"
                            value={formik.values.lastName}
                            id="lastName"
                            autoComplete="lastName"
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                        /> */}
            </MDBox>

            <MDBox
              mb={2}
              mx={{ lg: 1 }}
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              gap={{ xs: 2, md: 4 }}
              justifyContent="center"
            >
              <MDInput
                type="text"
                label="Business Address"
                variant="standard"
                width={{ md: 700 }}
                value={formik.values.businessAddress}
                id="businessAddress"
                autoComplete="businessAddress"
                onChange={formik.handleChange}
                error={
                  formik.touched.businessAddress &&
                  Boolean(formik.errors.businessAddress)
                }
                helperText={
                  formik.touched.businessAddress &&
                  formik.errors.businessAddress
                }
                fullWidth
              />
              <PhoneField
                dataCy="user-phone"
                defaultCountry="gb"
                type="text"
                label="Business Sales Number"
                value={formik.values.businessSalesNumber}
                id="businessSalesNumber"
                autoComplete="businessSalesNumber"
                onChange={formik.handleChange('businessSalesNumber')}
                error={
                  formik.touched.businessSalesNumber &&
                  Boolean(formik.errors.businessSalesNumber)
                }
                helperText={
                  formik.touched.businessSalesNumber &&
                  formik.errors.businessSalesNumber
                }
                fullWidth={true}
              />
            </MDBox>
            <MDBox
              mb={2}
              mx={{ lg: 1 }}
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              gap={{ xs: 2, md: 4 }}
              justifyContent="center"
            >
              <MDInput
                type="text"
                label="Business City"
                variant="standard"
                value={formik.values.businessCity}
                id="businessCity"
                autoComplete="businessCity"
                onChange={formik.handleChange}
                error={
                  formik.touched.businessCity &&
                  Boolean(formik.errors.businessCity)
                }
                helperText={
                  formik.touched.businessCity && formik.errors.businessCity
                }
                fullWidth
              />
              <MDInput
                type="text"
                label="Business Country"
                variant="standard"
                value={formik.values.businessCountry}
                id="businessCountry"
                autoComplete="businessCountry"
                onChange={formik.handleChange}
                error={
                  formik.touched.businessCountry &&
                  Boolean(formik.errors.businessCountry)
                }
                helperText={
                  formik.touched.businessCountry &&
                  formik.errors.businessCountry
                }
                fullWidth
              />
            </MDBox>

            <MDBox
              mb={2}
              mx={{ lg: 1 }}
              display="flex"
              flexDirection={{ xs: 'column', md: 'row' }}
              gap={{ xs: 2, md: 4 }}
              justifyContent="center"
            >
              <MDInput
                type="text"
                label="Business Postcode"
                variant="standard"
                value={formik.values.businessPostCode}
                id="businessPostCode"
                autoComplete="businessPostCode"
                onChange={formik.handleChange}
                error={
                  formik.touched.businessPostCode &&
                  Boolean(formik.errors.businessPostCode)
                }
                helperText={
                  formik.touched.businessPostCode &&
                  formik.errors.businessPostCode
                }
                fullWidth
              />
            </MDBox>
            <MDBox mb={2} mx={{ lg: 1 }}>
              <MDTypography
                variant="caption"
                fontWeight="medium"
                color="text"
                sx={{ fontSize: '14px' }}
              >
                Business Opening Hours
              </MDTypography>

              {businessOpeningHoursData.map((item) => {
                return (
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <MDBox display="flex" alignItems="center">
                        <Checkbox
                          defaultChecked={''}
                          name={`businessOpeningHours[${item.place}].day`}
                          value={item.value}
                          id={`businessOpeningHours[${item.place}].day`}
                          autoComplete={`businessOpeningHours[${item.place}].day`}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `businessOpeningHours[${item.place}].day`,
                              e.target.value
                            )
                          }
                          error={
                            formik.touched.businessOpeningHours &&
                            Boolean(formik.errors.businessOpeningHours)
                          }
                          helperText={
                            formik.touched.businessOpeningHours &&
                            formik.errors.businessOpeningHours
                          }
                          fullWidth
                        />
                        <MDBox ml={1}>
                          <MDTypography
                            variant="caption"
                            fontWeight="medium"
                            color="text"
                          >
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
                        name={`businessOpeningHours[${item.place}].openTime`}
                        value={
                          formik.values.businessOpeningHours[item.place]
                            .openTime
                        }
                        id={`businessOpeningHours[${item.place}].openTime`}
                        autoComplete={`businessOpeningHours[${item.place}].openTime`}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.businessOpeningHours &&
                          Boolean(formik.errors.businessOpeningHours)
                        }
                        helperText={
                          formik.touched.businessOpeningHours &&
                          formik.errors.businessOpeningHours
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <MDInput
                        type="time"
                        label="Close Time"
                        variant="standard"
                        name={`businessOpeningHours[${item.place}].closeTime`}
                        value={
                          formik.values.businessOpeningHours[item.place]
                            .closeTime
                        }
                        id={`businessOpeningHours[${item.place}].closeTime`}
                        autoComplete={`businessOpeningHours[${item.place}].closeTime`}
                        onChange={formik.handleChange}
                        error={
                          formik.touched.businessOpeningHours &&
                          Boolean(formik.errors.businessOpeningHours)
                        }
                        helperText={
                          formik.touched.businessOpeningHours &&
                          formik.errors.businessOpeningHours
                        }
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                );
              })}
            </MDBox>

            <MDBox mb={2}>
              <Dropzone
                className="dropzone"
                type="file"
                multiple={false}
                onDrop={(e) => {
                  formik.setFieldValue('businessLogo', e[0]);
                  setFile(e[0]);
                }}
                accept="image/*"
                label="Business Logo(Upload)"
                id="businessLogo"
                autoComplete="businessLogo"
                error={
                  formik.touched.businessLogo &&
                  Boolean(formik.errors.businessLogo)
                }
                helperText={
                  formik.touched.businessLogo && formik.errors.businessLogo
                }
                fullWidth
              >
                {file === null ? (
                  <>
                    Upload Company Logo Here
                    <Icon>upload</Icon>
                  </>
                ) : (
                  <Grid item xs={12} sm={4} container justifyContent="center">
                    <MDBox
                      position="relative"
                      height="max-content"
                      mx="auto"
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <MDAvatar
                        src={file?.preview}
                        alt="profile picture"
                        size="xxl"
                        variant="rounded"
                      />
                      <MDBox
                        alt="spotify logo"
                        position="absolute"
                        right={0}
                        bottom={0}
                        mr={-12}
                        mb={-1}
                        sx={{
                          width: '250px',
                          height: '51px',
                        }}
                      >
                        <Tooltip title="Edit" placement="top">
                          <MDButton
                            variant="gradient"
                            color="dark"
                            p={1}
                            height={10}
                          >
                            UPLOAD NEW LOGO &nbsp;
                            <Icon>edit</Icon>
                          </MDButton>
                        </Tooltip>
                      </MDBox>
                    </MDBox>
                  </Grid>
                )}
              </Dropzone>
            </MDBox>

            <MDBox mt={4} mb={1} textAlign="center">
              <MDButton
                variant="gradient"
                color="primary"
                type="submit"
                isLoading={loading}
              >
                NEXT
              </MDButton>
            </MDBox>
            <ToastContainer />
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default BusinessDetails;
