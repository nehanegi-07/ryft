import React, { useState, useEffect } from 'react';
import Switch from 'components/MDSwitch';
import Icon from '@mui/material/Icon';
import { Autocomplete, Card, Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import MDTypography from 'components/MDTypography';
import { notifySuccess, notifyError } from 'components/Messages';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from 'services/Admin.Services';

const ExpandedRow = ({ row, copyUrl }) => {
  const userId = row?.row?.original?._id;

  const queryClient = useQueryClient();

  const [userData, setUserData] = useState({});

  const { mutate } = useMutation(updateUser, {
    onSettled: () => queryClient.invalidateQueries('users'),
    onSuccess: (res) => {
      notifySuccess('Saved Successfully ');
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

  const handleChange = (e, key) => {
    setUserData((prev) => {
      return {
        ...prev,
        [key]: e.target.value,
      };
    });
  };

  const handlePaymentMethodChange = (e, value) => {
    setUserData((prev) => {
      return {
        ...prev,
        paymentMethod: value,
      };
    });
  };

  const handleUserNotes = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        userNotes: e.target.value,
      };
    });
  };

  const handleArchive = (e, isArchived) => {
    setUserData((prev) => {
      return {
        ...prev,
        isArchived: !isArchived,
      };
    });
  };

  const handleActiveUserStatus = (e) => {
    setUserData((prev) => {
      return {
        ...prev,
        isActive: e.target.checked,
      };
    });
  };

  const updateClientData = (e) => {
    console.log('i am update the client field');
    mutate({ id: userId, data: userData });
  };

  return (
    <>
      <MDBox
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <MDBox
          mt={2}
          mb={2}
          sx={{
            width: 'auto',
            display: 'flex',
            flexDirection: 'row',
            xs: { flexDirection: 'column' },
          }}
        >
          <Grid container xs={12} md={8} xl={8} height="350px">
            <Grid
              xs={12}
              md={12}
              xl={12}
              height="100%"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
              }}
            >
              {row?.row?.original
                ? Object.entries(row?.row?.original)?.map(([key, value]) => {
                    if (
                      key === 'businessDetailsId' ||
                      key === 'userLeadsDetailsId' ||
                      key === 'rowIndex' ||
                      key === 'isArchived' ||
                      key === 'role' ||
                      key === 'xeroContactId' ||
                      key === 'paymentMethod'
                    ) {
                      return null;
                    } else if (key === 'leadCost') {
                      return (
                        <MDBox
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '50%',
                            pr: 10,
                            pl: 2,
                            mb: 0.5,
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontType="primarysmall"
                            fontWeight="bold"
                          >
                            LEAD CPL
                          </MDTypography>
                          <MDBox width="auto" mx={{ lg: 1 }}>
                            <MDInput
                              fullWidth
                              type="text"
                              variant="standard"
                              defaultValue={value}
                              id={key}
                              autoComplete={key}
                              textAlign="end"
                              onChange={(e) => {
                                handleChange(e, key);
                              }}
                              readOnly={true}
                            />
                          </MDBox>
                          {/* <MDTypography
                   variant="caption"
                   color="text"
                   fontWeight="regular"
                   fontType="primarysmall"
                 >
                   £ {value ?? '-'}
                 </MDTypography> */}
                        </MDBox>
                      );
                    } else if (key === 'buyerId') {
                      return (
                        <MDBox
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '50%',
                            pr: 10,
                            pl: 2,
                            mb: 1.5,
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontType="primarysmall"
                            fontWeight="bold"
                          >
                            {key.toUpperCase()}
                          </MDTypography>
                          <MDTypography
                            variant="caption"
                            color="text"
                            fontWeight="regular"
                            fontType="primarysmall"
                          >
                            {value ?? 0}
                          </MDTypography>
                        </MDBox>
                      );
                    } else if (key === '_id') {
                      return (
                        <MDBox
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '50%',
                            pr: 10,
                            pl: 2,
                            mb: 1.5,
                          }}
                        >
                          <MDTypography
                            variant="caption"
                            fontType="primarysmall"
                            fontWeight="bold"
                          >
                            WEBSITE URL
                          </MDTypography>
                          <MDTypography
                            variant="caption"
                            color="text"
                            fontWeight="regular"
                            fontType="primarysmall"
                          >
                            {process.env.REACT_APP_API_KEY}/leads/
                            {row?.row?.original.buyerId}
                            <Icon
                              color="info"
                              sx={{}}
                              onClick={() =>
                                copyUrl(
                                  `${process.env.REACT_APP_API_KEY}/leads/${row?.row?.original.buyerId}`
                                )
                              }
                            >
                              copy
                            </Icon>
                          </MDTypography>
                        </MDBox>
                      );
                    } else {
                      return (
                        <>
                          <MDBox
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '50%',
                              pr: 10,
                              pl: 2,
                              mb: 0.5,
                            }}
                          >
                            <MDTypography
                              variant="caption"
                              fontType="primarysmall"
                              fontWeight="bold"
                            >
                              {key.toUpperCase()}
                            </MDTypography>

                            <MDBox width="auto" mx={{ lg: 1 }}>
                              <MDInput
                                fullWidth
                                type="text"
                                // label="Email"
                                variant="standard"
                                defaultValue={value}
                                textAlign="end"
                                onChange={(e) => {
                                  handleChange(e, key);
                                }}
                              />
                            </MDBox>
                          </MDBox>
                        </>
                      );
                    }
                  })
                : ''}
            </Grid>
            {/* <Divider
     orientation="vertical"
     sx={{ ml: -2, mr: 1, width: '1px', color: 'black' }}
     flexItem
   /> */}
          </Grid>
          <Grid container xs={12} md={4} xl={4} pr={2} height="fit-content">
            <Card
              sx={{
                width: '100%',
                height: '50px',
                px: 4,
                backgroundColor: '#00000014',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Switch
                checked={row?.row?.original?.isActive}
                onChange={(e) => handleActiveUserStatus(e)}
              />
              <MDTypography variant="caption" color="text" fontWeight="bold">
                <span style={{ color: '#6BEB98' }}>
                  {row?.row?.original?.isActive ? 'ACTIVE' : 'UNACTIVE'}
                </span>
              </MDTypography>
            </Card>
            <Card
              sx={{
                width: '100%',
                height: '210px',
                px: 4,
                backgroundColor: 'dark',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <MDBox sx={{ display: 'flex', alignItems: 'center' }}>
                <MDTypography
                  variant="caption"
                  color="blueText"
                  fontWeight="bold"
                  sx={{ fontSize: '14px', mt: '5px' }}
                >
                  £ 4,700 credit
                </MDTypography>
                <StarIcon
                  fontSize="small"
                  height={10}
                  width={30}
                  sx={{ color: '#182CEC', ml: 1 }}
                />
              </MDBox>
              <MDBox>
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  color="text"
                  sx={{ fontSize: '12px' }}
                >
                  PAYMENT METHOD
                </MDTypography>
                <Autocomplete
                  size="medium"
                  disableClearable
                  defaultValue={row?.row?.original?.paymentMethod}
                  value={row?.row?.original?.paymentMethod}
                  options={[
                    'auto charge',
                    'weekly payment',
                    'add credits manually',
                  ]}
                  onChange={(event, value) =>
                    handlePaymentMethodChange(event, value)
                  }
                  renderInput={(params) => <MDInput {...params} fullWidth />}
                />
                <MDTypography
                  variant="caption"
                  fontWeight="medium"
                  color="text"
                  sx={{ fontSize: '12px' }}
                >
                  YOUR NOTES
                </MDTypography>
                <MDInput
                  type="text"
                  label=""
                  defaultValue={row?.row?.original?.userNotes}
                  id="userNotes"
                  autoComplete="userNotes"
                  onChange={(e) => handleUserNotes(e)}
                  fullWidth
                />
              </MDBox>
            </Card>
            <MDButton
              color="lighDark"
              sx={{ width: '100%', height: '20px' }}
              onClick={(e) => handleArchive(e, row?.row?.original?.isArchived)}
            >
              {row?.row?.original?.isArchived === true
                ? 'UNARCHIVE THIS CLIENT'
                : ' ARCHIVE THIS CLIENT'}
            </MDButton>
          </Grid>
        </MDBox>

        <Grid xs={12}>
          {' '}
          <MDBox
            mt={4}
            mb={1}
            sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
          >
            <MDButton
              background="transparent"
              onClick={(e) => updateClientData()}
            >
              Save Changes
            </MDButton>
            <MDButton
              type="reset"
              // onClick={() => formik.resetForm()}
            >
              Discard Changes
            </MDButton>
          </MDBox>
        </Grid>
      </MDBox>
    </>
  );
};

export default ExpandedRow;
