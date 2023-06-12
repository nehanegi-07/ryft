import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import Card from '@mui/material/Card';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDInput from 'components/MDInput';
import MDButton from 'components/MDButton';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { notifySuccess, notifyError } from 'components/Messages';
import {
  updateleadAlertFrequency,
  getUserDetail,
} from 'services/User.Services';
import Tooltip from '@mui/material/Tooltip';
import { Autocomplete, Grid, Icon, TextField } from '@mui/material';

function NotificationSetting() {
  const navigate = useHistory();
  const queryClient = useQueryClient();
  const [loading, setLoading] = React.useState('idle');
  const [user, setUser] = useState('');
  const [leadFrequency, setLeadFrequency] = React.useState(null);

  const { isLoading, error, data, isSuccess } = useQuery(
    ['getNotification'],
    () => getUserDetail(),
    {
      keepPreviousData: true,
      // staleTime: Infinity,
    }
  );

  useEffect(() => {
    setUser(data?.data?.data);
    setLeadFrequency(data?.data?.data?.userLeadsDetailsId?.leadAlertsFrequency)
  }, [data]);

  const changeLeadFrequency = (e, newValue) => {
    setLeadFrequency(newValue);
  };

  const { mutate } = useMutation(updateleadAlertFrequency, {
    onSettled: () => queryClient.invalidateQueries('getNotification'),
    onSuccess: (res) => {
      setLoading('pending');
      notifySuccess('Email Alert Updated');
      setLoading('success');
    },
    onError: (error) => {
      setLoading('error');
      notifyError(
        `${
          error?.response?.data?.error?.message
            ? error.response.data.error.message
            : 'Something went wrong'
        }`
      );
    },
  });

  const submitLeadFrequencyAlert = () => {
    mutate({
      data: { leadAlertsFrequency: leadFrequency },
      id: user?.userLeadsDetailsId?._id,
    });
  };

  const notificationStatus = ['instant', 'daily'];

  return (
    <MDBox py={3}>
      <MDBox>
        <Grid
          container
          spacing={3}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Grid item xs={12} md={12} lg={6} component="form">
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h5">Notification Settings</MDTypography>
              </MDBox>
              <MDBox pt={2} pb={3} px={2}>
                <MDBox>
                  <MDBox mb={2} mx={{ lg: 1 }}>
                    <Autocomplete
                      disableClearable
                      options={notificationStatus}
                      value={leadFrequency || ""}
                      defaultValue={leadFrequency ||""}
                      size="small"
                      onChange={(event, newValue) =>
                        changeLeadFrequency(event, newValue)
                      }
                      renderInput={(params) => (
                        <MDInput {...params} label="Alert Frequency" />
                      )}
                    />
                  </MDBox>

                  <MDBox
                    mt={4}
                    mb={1}
                    sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
                  >
                    <MDButton
                      color="info"
                      onClick={() => submitLeadFrequencyAlert()}
                    >
                      Submit
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}
export default NotificationSetting;
