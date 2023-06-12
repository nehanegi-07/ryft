import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import { businessDetailsValidationSchema } from 'validator';
import {
  getUserDetail,
  updateUserBusinessDetail,
} from 'services/User.Services';
import { auth } from "services/Authentication.Services";
import { useMutation } from 'react-query';
import { notifyError, notifySuccess } from 'components/Messages';
import MDTypography from 'components/MDTypography';
import PhoneField from 'components/PhoneField';
import { Autocomplete, Checkbox, Icon } from '@mui/material';
import BasicModal from 'components/Modal';
import InviteUser from './AddUserModal';
import MDAvatar from 'components/MDAvatar';
import Tooltip from '@mui/material/Tooltip';
import Dropzone from 'react-dropzone';
import { useUser } from "context";
import './index.css';
import LeadSetting from './LeadSetting';

function UserBusinessProfile() {

  const {setUser:authUser}=useUser();

  const [user, setUser] = useState(null);
  const [open, setOpen] = React.useState(false);

  const [file, setFile] = React.useState(
    user?.businessDetailsId?.businessLogo || ''
  );
  const userLeadFrequency = user?.userLeadsDetailsId?.leadAlertsFrequency || '';
  const userLeadId = user?.userLeadsDetailsId?._id || '';

  useEffect(() => {
    const callbackFn = async () => {
      const result = await getUserDetail();
      const { data } = result.data;
      setUser(data);
    };
    callbackFn();
  }, []);

  const initState = {
    businessIndustry: user?.businessDetailsId?.businessIndustry || '',
    businessName: user?.businessDetailsId?.businessName || '',
    // businessOpeningHours: [{
    //   day: "",
    //   openTime: "00:00" || "",
    //   closeTime: "00:00" || ""
    // }, {
    //   day: "",
    //   openTime: "00:00" || "",
    //   closeTime: "00:00" || ""
    // }, {
    //   day: "",
    //   openTime: "00:00" || "",
    //   closeTime: "00:00" || ""
    // }, {
    //   day: "",
    //   openTime: "00:00" || "",
    //   closeTime: "00:00" || ""
    // }, {
    //   day: "",
    //   openTime: "00:00" || "",
    //   closeTime: "00:00" || ""
    // }, {
    //   day: "",
    //   openTime: "00:00" || "",
    //   closeTime: "00:00" || ""
    // }, {
    //   day: "",
    //   openTime: "00:00" || "",
    //   closeTime: "00:00" || ""
    // }],
    businessOpeningHours: user?.businessDetailsId?.businessOpeningHours || [
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
    businessPostCode: user?.businessDetailsId?.businessPostCode || '',
    businessSalesNumber: user?.businessDetailsId?.businessSalesNumber || '',
    businessCountry: user?.businessDetailsId?.businessCountry || '',
    businessAddress: user?.businessDetailsId?.businessAddress || '',
    businessCity: user?.businessDetailsId?.businessCity || '',
    // businessLogo:user?.businessDetailsId?.businessLogo || ""
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
      value: 'Thrusday',
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);




  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initState,
    validationSchema: businessDetailsValidationSchema,
    onSubmit: (values) => {
      mutate({ businessId: user?.businessDetailsId?._id, data: values });
    },
  });

  const setAuth = async () => {
    const result = await auth();
    const { data } = result.data
     authUser(data)
  }


  const { mutate } = useMutation(updateUserBusinessDetail, {
    onSuccess: (res) => {

      notifySuccess('Bussiness Details Updated Successfully ');
      setAuth()
    },
    onError: (error) => {
      notifyError(
        `${
          error?.response?.data?.error?.message
            ? error.response.data.error.message
            : 'Something Went Wrong'
        }`
      );
    },
  });

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

  return (
    <MDBox py={3}>
      <MDBox>
        <Grid
          container
          spacing={3}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item xs={12} md={12} lg={8}>
            <Card>
              <MDBox
                p={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDTypography variant="h5">Business Details</MDTypography>
                <MDBox>
                  <MDButton
                    variant="gradient"
                    color="dark"
                    onClick={() => handleOpen()}
                  >
                    <Icon sx={{ fontWeight: 'bold' }}>add</Icon>
                    &nbsp;Add Team Members
                  </MDButton>

                </MDBox>
              </MDBox>
              <MDBox pt={1} pb={3} px={2}>
                <MDBox
                  component="form"
                  role="form"
                  onSubmit={formik.handleSubmit}
                >
                  <MDBox
                    mb={2}
                    mx={{ lg: 1 }}
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap={{ xs: 2, md: 4 }}
                  >
                    <Autocomplete
                      disableClearable
                      options={businessIndustries}
                      value={formik.values.businessIndustry}
                      defaultValue={formik.values.businessIndustry}
                      sx={{ width: { md: 500, lg: 700 } }}
                      onChange={(event, value) => {
                        formik.setFieldValue('businessIndustry', value);
                      }}
                      renderInput={(params) => (
                        <MDInput
                          {...params}
                          fullWidth
                          label="Business Industry"
                          // sx={{
                          //   width: { md: 500, lg: 700 },
                          // }}
                          variant="standard"
                          error={Boolean(
                            formik.touched.businessIndustry &&
                              formik.errors.businessIndustry
                          )}
                          helperText={
                            formik.touched.businessIndustry &&
                            formik.errors.businessIndustry
                          }
                          // onBlur={formik.handleBlur}
                        />
                      )}
                    />
                    {/* <MDInput
                      sx={{
                        width: { md: 500, lg: 700 },
                      }}
                      variant="standard"
                      type="text"
                      label="Business Industry"
                      value={formik.values.businessIndustry}
                      id="businessIndustry"
                      autoComplete="businessIndustry"
                      onChange={formik.handleChange}
                      error={formik.touched.businessIndustry && Boolean(formik.errors.businessIndustry)}
                      helperText={formik.touched.businessIndustry && formik.errors.businessIndustry}
                    /> */}

                    <MDInput
                      type="text"
                      sx={{
                        width: { md: 500, lg: 700 },
                      }}
                      variant="standard"
                      label="Business Name"
                      value={formik.values.businessName}
                      id="businessName"
                      autoComplete="businessName"
                      onChange={formik.handleChange}
                      error={
                        formik.touched.businessName &&
                        Boolean(formik.errors.businessName)
                      }
                      helperText={
                        formik.touched.businessName &&
                        formik.errors.businessName
                      }
                    />
                  </MDBox>

                  <MDBox
                    mb={2}
                    mx={{ lg: 1 }}
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap={{ xs: 2, md: 4 }}
                  >
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
                      error={
                        formik.touched.businessAddress &&
                        Boolean(formik.errors.businessAddress)
                      }
                      helperText={
                        formik.touched.businessAddress &&
                        formik.errors.businessAddress
                      }
                    />
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
                      error={
                        formik.touched.businessCity &&
                        Boolean(formik.errors.businessCity)
                      }
                      helperText={
                        formik.touched.businessCity &&
                        formik.errors.businessCity
                      }
                    />
                  </MDBox>

                  <MDBox
                    mb={2}
                    mx={{ lg: 1 }}
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap={{ xs: 2, md: 4 }}
                  >
                    <MDInput
                      sx={{
                        width: { md: 500, lg: 700 },
                      }}
                      type="text"
                      label="Business PostCode"
                      value={formik.values.businessPostCode}
                      variant="standard"
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
                    />
                    <MDInput
                      sx={{
                        width: { md: 500, lg: 700 },
                      }}
                      type="text"
                      label="Business Country"
                      value={formik.values.businessCountry}
                      variant="standard"
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
                    />
                  </MDBox>
                  <MDBox mb={2}>
                    <PhoneField
                      dataCy="user-phone"
                      defaultCountry={'us'}
                      type="text"
                      label="Business Sales Number"
                      value={formik.values.businessSalesNumber}
                      variant="standard"
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
                      fullWidth
                    />
                    {/* <MDInput
                      sx={{
                        width: { md: 500, lg: 700 },
                      }}
                      type="text"
                      label="Business Opening Hours"
                      value={formik.values.businessOpeningHours}
                      variant="standard"
                      id="businessOpeningHours"
                      autoComplete="businessOpeningHours"
                      onChange={formik.handleChange}
                      error={formik.touched.businessOpeningHours && Boolean(formik.errors.businessOpeningHours)}
                      helperText={formik.touched.businessOpeningHours && formik.errors.businessOpeningHours}
                    /> */}
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
                          <Grid item xs={12} sm={3}>
                            <MDBox display="flex" alignItems="center">
                              <Checkbox
                                checked={
                                  formik.values.businessOpeningHours[item.place]
                                    .day.length
                                    ? true
                                    : false
                                }
                                name={`businessOpeningHours[${item.place}].day`}
                                value={item.value}
                                // id={`businessOpeningHours[${item.place}].day`}
                                // autoComplete={`businessOpeningHours[${item.place}].day`}
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
                          <Grid item xs={6} sm={4}>
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
                          <Grid item xs={6} sm={4}>
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

                    {/*
                    {businessOpeningHoursData.map((item) => {

                      return (
                        < Grid container spacing={3}>
                          <Grid item xs={12} sm={3}>
                            <MDBox display="flex" alignItems="center">

                              <Checkbox
                                defaultChecked={`businessOpeningHours[${item.place}].day` !== "" ? true : false}
                                name={`businessOpeningHours[${item.place}].day`}
                                value={item.value}
                                id={`businessOpeningHours[${item.place}].day`}
                                autoComplete={`businessOpeningHours[${item.place}].day`}
                                onChange={(e) => formik.setFieldValue(`businessOpeningHours[${item.place}].day`, e.target.value)}
                                error={formik.touched.businessOpeningHours && Boolean(formik.errors.businessOpeningHours)}
                                helperText={formik.touched.businessOpeningHours && formik.errors.businessOpeningHours}
                                fullWidth />
                              <MDBox ml={1}>
                                <MDTypography variant="caption" fontWeight="medium" color="text">
                                  {item.value}
                                </MDTypography>
                              </MDBox>
                            </MDBox>

                          </Grid>
                          <Grid item xs={6} sm={4}>
                            <MDInput
                              type="time"
                              label="Open Time"
                              variant="standard"
                              name={`businessOpeningHours[${item.place}].openTime`}
                              value={formik.values.businessOpeningHours[item.place].openTime}
                              id={`businessOpeningHours[${item.place}].openTime`}
                              autoComplete={`businessOpeningHours[${item.place}].openTime`}
                              onChange={formik.handleChange}
                              error={formik.touched.businessOpeningHours && Boolean(formik.errors.businessOpeningHours)}
                              helperText={formik.touched.businessOpeningHours && formik.errors.businessOpeningHours}
                              fullWidth
                            />
                          </Grid>
                          <Grid item xs={6} sm={4}>
                            <MDInput
                              type="time"
                              label="Close Time"
                              variant="standard"
                              name={`businessOpeningHours[${item.place}].closeTime`}
                              value={formik.values.businessOpeningHours[item.place].closeTime}
                              id={`businessOpeningHours[${item.place}].closeTime`}
                              autoComplete={`businessOpeningHours[${item.place}].closeTime`}
                              onChange={formik.handleChange}
                              error={formik.touched.businessOpeningHours && Boolean(formik.errors.businessOpeningHours)}
                              helperText={formik.touched.businessOpeningHours && formik.errors.businessOpeningHours}
                              fullWidth
                            />
                          </Grid>
                        </Grid>
                      )
                    })} */}
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
                        formik.touched.businessLogo &&
                        formik.errors.businessLogo
                      }
                      fullWidth
                    >
                      {
                        !user?.businessDetailsId?.businessLogo ? (
                          <>
                            Upload File here
                            <Icon>upload</Icon>
                          </>
                        ) : file ? (
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            container
                            justifyContent="center"
                          >
                            <MDBox
                              position="relative"
                              height="max-content"
                              mx="auto"
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
                                mr={-14}
                                mb={-1}
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
                                  {/* <MDButton variant="gradient" color="info" size="small" iconOnly>
                                    <Icon>edit</Icon>
                                  </MDButton> */}
                                </Tooltip>
                              </MDBox>
                            </MDBox>
                          </Grid>
                        ) : (
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            container
                            justifyContent="center"
                          >
                            <MDBox
                              position="relative"
                              height="max-content"
                              mx="auto"
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <MDAvatar
                                src={`${process.env.REACT_APP_IMAGE_URL}${user?.businessDetailsId?.businessLogo}`}
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
                                  {/* <MDButton variant="gradient" color="info" size="small" iconOnly>
                                    <Icon>edit</Icon>
                                  </MDButton> */}
                                </Tooltip>
                              </MDBox>
                            </MDBox>
                          </Grid>
                        )

                        // user?.businessDetailsId?.businessLogo
                      }
                    </Dropzone>
                  </MDBox>

                  <MDBox
                    mt={4}
                    mb={1}
                    sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
                  >
                    <MDButton color="info" type="submit">
                      Save
                    </MDButton>
                    <MDButton
                      color="info"
                      type="reset"
                      onClick={() => formik.resetForm()}
                    >
                      Reset
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
              <BasicModal
                open={open}
                handleClose={handleClose}
                width={600}
                height={320}
              >
                <InviteUser handleCloseModal={handleClose} />
              </BasicModal>

            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default UserBusinessProfile;
