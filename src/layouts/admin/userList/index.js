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
  getUserPreference,
} from 'services/Admin.Services';
import Loader from 'components/Loader';
import ExpandedRow from './subExpandedRow';
import Configurator from 'components/Configurator';

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

  const [columnsLoading, setColumnsLoading] = React.useState('idle');
  const [columnsFields, setColumnsFields] = useState(null);
  const [changeColumn, setChangeColumn] = useState('');

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
    const callbackFn = async () => {
      setColumnsLoading('pending');
      const result = await getUserPreference();
      const { data } = result.data;
      data.columns = data.columns.sort((a, b) => a.index - b.index);
      setColumnsFields(data);
      setColumnsLoading('success');
    };
    callbackFn();
  }, []);

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
      Header: 'Action',
      accessor: 'leadsAutoChargePaused',
      width: '14%',
      Cell: (props) => {
        return (
          <>
            <MDButton
              variant="text"
              color="info"
              onClick={() => handleOpen(props.row.original)}
            >
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </>
        );
      },
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

  const columnsSet = React.useMemo(() => {
    const result = columnsFields?.columns
      ?.filter((item) => item.isVisible)
      ?.map((column) => {
        switch (column.name) {
          case 'leadCost':
            return {
              Header: 'Lead CPL',
              accessor: 'leadCost',
              draggable: true,
              Cell: (props) =>
                props.row.original.leadCost
                  ? `£ ${props.row.original.leadCost}`
                  : '-',
            };

          default:
            return {
              Header: column?.name,
              accessor: column?.name,
              draggable: true,
              Cell: (props) => {
                return props.row.original[column?.name]
                  ? props.row.original[column?.name] ?? '-'
                  : props.row.original.businessDetailsId[column?.name] ?? '-';
              },
            };
        }
      });
    // result &&
    //   result.push({
    //     Header: 'Expand',
    //     id: 'expander',
    //     accessor: 'expander',

    //   });

    return result;
  }, [columnsFields?.columns]);

  // let newData = React.useMemo(
  //   () =>
  //     data?.data?.data?.map((data) => {
  //       return {
  //         ...data,
  //         expander: (
  //           <span {...row.getToggleRowExpandedProps()}>
  //             {row.isExpanded ? (
  //               <Icon sx={{ fontSize: 100 }}>add_circle</Icon>
  //             ) : (
  //               <Icon sx={{ fontSize: 100 }}>add_circle</Icon>
  //             )}
  //           </span>
  //         ),
  //       };
  //     }),
  //   [data?.data?.data]
  // );

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
    return <ExpandedRow row={row} copyUrl={copyUrl} />;
  }, []);

  return (
    <MDBox py={0}>
      <MDBox>
        <Grid container spacing={0}>
          {columnsLoading === 'success' || !columnsSet === 'undefined' ? (
            <>
              <Grid item xs={12} lg={12}>
                {columnsLoading === 'success' && isSuccess && (
                  <>
                    <DataTable
                      tableType="userTable"
                      table={{
                        columns: columnsSet,
                        rows: selectedData || rows,
                      }}
                      tableTitle="Clients"
                      canSearch
                      queryPageIndex={queryPageIndex}
                      queryPageSize={queryPageSize}
                      pageCount={Math.ceil(
                        data?.data?.meta?.total / queryPageSize
                      )}
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
                      columnPreference={columnsFields}
                      setColumnsFields={setColumnsFields}
                      renderSubRowComponent={renderSubRowComponent}
                      
                    />
                    {/* <BasicModal open={open} handleClose={handleClose} >
                <UserEdit userId={userId} handleUserEdit={handleUserEdit} handleModalClose={handleClose} />
              </BasicModal> */}
                  </>
                )}
              </Grid>

            </>
          ) : (
            <Grid
              item
              xs={12}
              lg={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '75vh',
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Loader size={100} color="info" />
              </Card>
            </Grid>
          )}
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default UserLists;
