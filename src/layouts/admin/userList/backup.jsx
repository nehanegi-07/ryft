import React, { useState, useEffect, useReducer } from 'react';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import DataTable from 'components/TablesV2/DataTable';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';

import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { notifySuccess, notifyError } from 'components/Messages';
import MDTypography from 'components/MDTypography';
// import Switch from "@mui/material/Switch";
import Switch from 'components/MDSwitch';
import { useFormik } from 'formik';
import Divider from '@mui/material/Divider';
import { Autocomplete, Card } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MDInput from 'components/MDInput';
import CustomizedSwitches from 'components/MDSwitch';

import {
  getUser,
  getUsers,
  getUserForAdmin,
  updateIsActiveForUser,
} from 'services/Admin.Services';
import Loader from 'components/Loader';

const initialState = {
  queryPageIndex: 0,
  queryPageSize: 10,
  totalCount: null,
  queryPageFilter: '',
};

const PAGE_CHANGED = 'PAGE_CHANGED';
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
const PAGE_FILTER_CHANGED = 'PAGE_FILTER_CHANGED';
const TOTAL_COUNT_CHANGED = 'TOTAL_COUNT_CHANGED';

const reducer = (state, { type, payload }) => {
  switch (type) {
    case PAGE_CHANGED:
      return {
        ...state,
        queryPageIndex: payload,
      };
    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        queryPageSize: payload,
      };
    case PAGE_FILTER_CHANGED:
      return {
        ...state,
        queryPageFilter: payload,
      };
    case TOTAL_COUNT_CHANGED:
      return {
        ...state,
        totalCount: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

function UserLists() {
  const navigate = useHistory();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState('idle');
  const [id, setId] = useState(null);
  const [sortingOrder, setSortingOrder] = useState('Newest to oldest');
  const [leadsType, setLeadsType] = useState(false);
  const [users, setUsers] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const queryClient = useQueryClient();

  const [
    { queryPageIndex, queryPageSize, queryPageFilter, totalCount },
    dispatch,
  ] = useReducer(reducer, initialState);

  // getUserPreference

  const { isLoading, error, data, isSuccess } = useQuery(
    [
      'users',
      queryPageIndex,
      queryPageSize,
      queryPageFilter,
      sortingOrder,
      leadsType,
    ],
    () =>
      getUsers(
        queryPageIndex,
        queryPageSize,
        queryPageFilter,
        sortingOrder,
        leadsType
      ),
    {
      keepPreviousData: true,
      // staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      setRows(data.data.data);
    }
  }, [isSuccess, data]);

  const handleOpen = (row) => {
    navigate.push(`/userupdate/${row._id}`);
  };

  useEffect(() => {
    const callbackFn = async () => {
      const result = await getUserForAdmin();
      const { data } = result.data;
      setUsers(data);
    };
    callbackFn();
  }, [selectedUserId]);

  useEffect(() => {
    if (selectedUserId === null) return;
    const callbackFn = async () => {
      const result = await getUser(selectedUserId);
      const { data } = result.data;

      setSelectedData([data]);
    };
    callbackFn();
  }, [selectedUserId]);

  const changeUser = (e, user) => {
    setSelectedUserId(user?._id);
    console.log('selecteduser', e, user);
  };

  const { mutate } = useMutation(updateIsActiveForUser, {
    onSettled: () => queryClient.invalidateQueries('users'),
    onSuccess: (res) => {
      setLoading('success');
      notifySuccess(
        res?.data?.data?.isActive
          ? 'User Access to Platform has been activated successfully'
          : 'User Access to Platform has been deactivated successfully'
      );
    },
    onError: (error) => {
      setLoading('error');
      notifyError(
        `${
          error?.response?.data?.error?.message
            ? error.response.data.error.message
            : 'Something Went Wrong'
        }`
      );
    },
  });

  const handleIsActive = (id, active) => {
    setId(id);
    try {
      setLoading('pending');
      mutate({ id: id, data: { isActive: !active } });
    } catch (err) {
      console.log('err', err);
    }
  };

  const handlePaginationEvents = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url).then(() => {
      notifySuccess('Url Copied ');
    });
  };

  const columns = [
    {
      Header: 'Company Name',
      accessor: 'companyName',
      draggable: true,
      // width: "10%",
      Cell: (props) =>
        props.row.original.companyName ? props.row.original.companyName : '-',
    },
    {
      Header: 'name',
      accessor: 'name',
      // width: "3%",
      draggable: true,
      Cell: (props) => {
        return (
          `${props.row.original.firstName} ${props.row.original.lastName}` || ''
        );
      },
    },
    // { Header: "email", accessor: "email", draggable: true },
    // { Header: "phone number", accessor: "salesPhoneNumber", draggable: true },
    {
      Header: 'buyer id',
      accessor: 'buyerId',
      // width: "10%",
      draggable: true,
      Cell: (props) =>
        props.row.original.buyerId ? props.row.original.buyerId : '-',
    },

    {
      Header: 'Lead CPL',
      accessor: 'leadCost',
      draggable: true,
      Cell: (props) =>
        props.row.original.leadCost ? `£ ${props.row.original.leadCost}` : '-',
    },
    {
      Header: 'credit',
      accessor: 'credits',
      draggable: true,
      Cell: (props) =>
        props.row.original.credits ? `£ ${props.row.original.credits}` : '-',
    },
    // {
    //   Header: 'auto charge',
    //   accessor: 'autoCharge',
    //   draggable: true,
    //   Cell: (props) => {
    //     return props.row.original.autoCharge === true ? 'ON' : 'OFF';
    //   },
    // },
    // {
    //   Header: "Url", accessor: "currentCredit", draggable: true,
    //   Cell: (props) => {

    //     return (
    //       <>
    //         {process.env.REACT_APP_API_KEY}/leads/{props.row.original.buyerId}
    //         <MDButton variant="text" color="info" onClick={() => copyUrl(`${process.env.REACT_APP_API_KEY}/leads/${props.row.original.buyerId}`)}>
    //           <Icon>copy</Icon>
    //         </MDButton>
    //       </>
    //     )

    //   }
    // },
    // {
    //   Header: "Active", accessor: "isActive", width: "14%", draggable: true,
    //   Cell: (props) => {
    //     return (
    //       <>
    //         <MDBox display="flex" gap="1">
    //           <MDBox display="flex">
    //             <Switch
    //               checked={props.row.original.isActive}
    //               onChange={() => handleIsActive(props.row.original._id, props.row.original.isActive)}
    //             />
    //             {props.row.original._id===id && loading === "pending" ? <Loader size={30} color="info" /> : null}
    //           </MDBox>
    //         </MDBox>
    //       </>

    //     )
    //   }
    // },
    {
      Header: "Action", accessor: "leadsAutoChargePaused", width: "14%",
      Cell: (props) => {
        return (
          <>
            <MDButton variant="text" color="info" onClick={() => handleOpen(props.row.original)}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </>

        )
      }
    },
    {
      // Build our expander column
      id: 'expander', // Make sure it has an ID
      Header: 'Expand',
      Cell: ({ row }) => (
        // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
        // to build the toggle for expanding a row
        // Use Cell to render an expander for each row.
        // We can use the getToggleRowExpandedProps prop-getter
        // to build the expander.
        <span {...row.getToggleRowExpandedProps()}>
          {row.isExpanded ? (
            <Icon sx={{ fontSize: 100 }}>add_circle</Icon>
          ) : (
            <Icon sx={{ fontSize: 100 }}>add_circle</Icon>
          )}
        </span>
      ),
    },
  ];

  const handleSortingOrder = (e, value) => {
    setSortingOrder(value);
  };

  const handleArchivedLeads = (e, value) => {
    if (value === 'Archived clients') {
      setLeadsType(true);
    } else {
      setLeadsType(false);
    }
  };

  const renderSubRowComponent = React.useCallback((row) => {

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
                      console.log('key====>', key, value);
                      if (
                        key === 'businessDetailsId' ||
                        key === 'userLeadsDetailsId' ||
                        key === 'rowIndex' ||
                        key === 'isArchived'
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
                                type="email"
                                // label="Email"
                                variant="standard"
                                value={value ?? 0}
                                id="email"
                                autoComplete="email"
                                textAlign="end"
                                // onChange={formik.handleChange}
                                // error={
                                //   formik.touched.email &&
                                //   Boolean(formik.errors.email)
                                // }
                                // helperText={
                                //   formik.touched.email && formik.errors.email
                                // }
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
                      } else if (key === '_id') {
                        return (
                          <MDBox
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '50%',
                              pr: 10,
                              pl: 2,
                              mb: 1,
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
                                  type="email"
                                  // label="Email"
                                  variant="standard"
                                  value={value}
                                  id="email"
                                  autoComplete="email"
                                  textAlign="end"
                                  // onChange={formik.handleChange}
                                  // error={
                                  //   formik.touched.email &&
                                  //   Boolean(formik.errors.email)
                                  // }
                                  // helperText={
                                  //   formik.touched.email && formik.errors.email
                                  // }
                                />
                              </MDBox>

                              {/* <MDTypography
                              variant="caption"
                              color="text"
                              fontWeight="regular"
                              fontType="primarysmall"
                            >
                              {value ?? '-'}
                            </MDTypography> */}
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
              {/* <Grid xs={12} md={6} xl={6}>
              <MDBox
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  pr: 10,
                  pl: 2,
                }}
              >
                <MDTypography
                  variant="caption"
                  fontType="primarysmall"
                  fontWeight="bold"
                >
                  LEAD CPL
                </MDTypography>
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="regular"
                  fontType="primarysmall"
                >
                  {row?.row?.original?.leadCost
                    ? `£ ${row?.row?.original?.leadCost}`
                    : '-'}
                </MDTypography>
              </MDBox>
              <MDBox
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  pr: 10,
                  pl: 2,
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
            </Grid> */}
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
                  checked={false}
                  // onChange={(e) => setShowDeleteIcon(e.target.checked)}
                />
                <MDTypography variant="caption" color="text" fontWeight="bold">
                  <span style={{ color: '#6BEB98' }}>ACTIVE</span>
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
                    options={['it Industry', 'other']}
                    value={''}
                    defaultValue={''}
                    // onChange={(event, value) => (formik.values.businessIndustry = value)}
                    renderInput={(params) => (
                      <MDInput {...params} fullWidth label="Autocharge" />
                    )}
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
                    type="email"
                    label=""
                    value={''}
                    id="email"
                    autoComplete="email"
                    // onChange={formik.handleChange}
                    // error={formik.touched.email && Boolean(formik.errors.email)}
                    // helperText={formik.touched.email && formik.errors.email}
                    fullWidth
                  />
                </MDBox>
              </Card>
              <MDButton color="lighDark" sx={{ width: '100%', height: '20px' }}>
                ARCHIVE THIS CLIENT
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
              <MDButton background="transparent" type="submit">
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
  }, []);

  return (
    <MDBox py={0}>
      <MDBox>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            {/* {!isLoading? */}
            <>
              <DataTable
                tableType="userTable"
                table={{ columns: columns, rows: selectedData || rows }}
                tableTitle="Clients"
                canSearch
                queryPageIndex={queryPageIndex}
                queryPageSize={queryPageSize}
                pageCount={Math.ceil(data?.data?.meta?.total / queryPageSize)}
                queryPageFilter={queryPageFilter}
                sortingOrder={sortingOrder}
                leadsType={leadsType}
                handleSortingOrder={handleSortingOrder}
                handleArchivedLeads={handleArchivedLeads}
                handlePaginationEvents={handlePaginationEvents}
                entriesPerPage={{
                  defaultValue: 10,
                  entries: [10, 25, 50, 100],
                }}
                changeUser={changeUser}
                users={users}
                isLoading={isLoading}
                dragColumn={false}
                renderSubRowComponent={renderSubRowComponent}
              />
              {/* <BasicModal open={open} handleClose={handleClose} >
                <UserEdit userId={userId} handleUserEdit={handleUserEdit} handleModalClose={handleClose} />
              </BasicModal> */}
            </>
            {/* :
              <MDBox textAlign="center"><Loader size={25} color="info"/></MDBox>
            } */}
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default UserLists;
