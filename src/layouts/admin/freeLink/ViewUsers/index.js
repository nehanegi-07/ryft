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
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { useMaterialUIController } from 'context';

function ViewUsers({ handleCloseModal, viewUserData }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const borderBottom = {
    borderBottom: ({ borders: { borderWidth }, palette: { light } }) =>
      `${borderWidth[1]} solid ${light.main}`,
  };

  return (
    <Card sx={{ height: '100%' }}>
      <MDBox
        p={3}
        lineHeight={0}
        sx={{ height: '20%', display: 'flex', justifyContent: 'space-between' }}
      >
        <MDTypography variant="h5">Promo Link Users</MDTypography>
        <Tooltip title={''} placement="top" onClick={handleCloseModal}>
          <Icon>close</Icon>
        </Tooltip>
      </MDBox>
      <MDBox p={2} sx={{ height: '80%', overflowY: 'scroll' }}>
        <MDBox width="100%" overflow="auto">
          <Table sx={{ minWidth: '100%', height: '90%' }}>
            <MDBox
              component="thead"
              sx={{
                height: '20%',
                position: 'sticky',
                top: 0,
                backgroundColor: 'white',
              }}
            >
              <TableRow>
                <MDBox
                  component="th"
                  width={{ xs: '45%', md: '50%' }}
                  py={1.5}
                  px={1}
                  textAlign="left"
                  sx={borderBottom}
                >
                  <MDTypography variant="h6" color="text" fontWeight="medium">
                    Name
                  </MDTypography>
                </MDBox>
                <MDBox
                  component="th"
                  py={1.5}
                  pl={3}
                  pr={1}
                  textAlign="left"
                  sx={borderBottom}
                >
                  <MDTypography variant="h6" color="text" fontWeight="medium">
                    Used Date
                  </MDTypography>
                </MDBox>
              </TableRow>
            </MDBox>
            <TableBody sx={{ height: '80%', overflowY: 'scroll' }}>
              {viewUserData?.map((users, index) => {
                return (
                  <TableRow>
                    <MDBox
                      component="td"
                      textAlign="left"
                      p={1}
                      sx={borderBottom}
                    >
                      <MDTypography
                        variant="body2"
                        color="text"
                        fontWeight="regular"
                      >
                        {users?.userId?.firstName}{" "} {users?.userId?.lastName}
                      </MDTypography>
                    </MDBox>
                    <MDBox
                      component="td"
                      textAlign="left"
                      py={1}
                      pr={1}
                      pl={3}
                      sx={borderBottom}
                    >
                      <MDTypography
                        variant="body2"
                        color="text"
                        fontWeight="regular"
                      >
                        {new Date(users?.userId?.createdAt).toDateString()}
                      </MDTypography>
                    </MDBox>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default ViewUsers;
