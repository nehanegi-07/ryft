import React, { useState, useEffect, useReducer } from 'react';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import DataTable from 'components/Tables/DataTable';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';
import { getUsers } from 'services/Admin.Services';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { notifySuccess, notifyError } from 'components/Messages';
import MDTypography from 'components/MDTypography';
import Switch from '@mui/material/Switch';
import { useFormik } from 'formik';
import { updateIsActiveForUser } from 'services/Admin.Services';
import Tooltip from '@mui/material/Tooltip';
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
  const queryClient = useQueryClient();

  const [
    { queryPageIndex, queryPageSize, queryPageFilter, totalCount },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { isLoading, error, data, isSuccess } = useQuery(
    ['users', queryPageIndex, queryPageSize, queryPageFilter],
    () => getUsers(queryPageIndex, queryPageSize, queryPageFilter),
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
      notifySuccess('Url Copied Successfully');
    });
  };

  const columns = [
    {
      Header: 'Company Name',
      accessor: 'businessName',
      draggable: true,
      width: '10%',
      Cell: (props) =>
        props.row.original?.businessDetailsId?.businessName
          ? props.row.original.businessDetailsId?.businessName
          : '-',
    },
    {
      Header: 'name',
      accessor: 'name',
      width: '3%',
      draggable: true,
      Cell: (props) => {
        return (
          `${props.row.original.firstName} ${props.row.original.lastName}` || ''
        );
      },
    },
    { Header: 'email', accessor: 'email', draggable: true },
    {
      Header: 'phone number',
      accessor: 'businessSalesNumber',
      draggable: true,
      Cell: (props) => {
        return (
          props.row.original.businessDetailsId.businessSalesNumber||"-"
        )
      }
    },
    {
      Header: 'buyer id',
      accessor: 'buyerId',
      width: '10%',
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
    {
      Header: 'auto charge',
      accessor: 'autoCharge',
      draggable: true,
      Cell: (props) => {
        return props.row.original.autoCharge === true ? 'ON' : 'OFF';
      },
    },
    {
      Header: 'Url',
      accessor: 'currentCredit',
      draggable: true,
      Cell: (props) => {
        return (
          <>
            {process.env.REACT_APP_API_KEY}/leads/{props.row.original.buyerId}
            <MDButton
              variant="text"
              color="info"
              onClick={() =>
                copyUrl(
                  `${process.env.REACT_APP_API_KEY}/leads/${props.row.original.buyerId}`
                )
              }
            >
              <Icon>copy</Icon>
            </MDButton>
          </>
        );
      },
    },
    {
      Header: 'Active',
      accessor: 'isActive',
      width: '14%',
      draggable: true,
      Cell: (props) => {
        return (
          <>
            <MDBox display="flex" gap="1">
              <MDBox display="flex">
                <Switch
                  checked={props.row.original.isActive}
                  onChange={() =>
                    handleIsActive(
                      props.row.original._id,
                      props.row.original.isActive
                    )
                  }
                />
                {props.row.original._id === id && loading === 'pending' ? (
                  <Loader size={30} color="info" />
                ) : null}
              </MDBox>
            </MDBox>
          </>
        );
      },
    },
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
  ];

  return (
    <MDBox py={3}>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            {/* {!isLoading? */}
            <>
              <DataTable
                tableType="userTable"
                table={{ columns: columns, rows: rows }}
                tableTitle="Customer List"
                canSearch
                queryPageIndex={queryPageIndex}
                queryPageSize={queryPageSize}
                pageCount={Math.ceil(data?.data?.meta?.total / queryPageSize)}
                queryPageFilter={queryPageFilter}
                handlePaginationEvents={handlePaginationEvents}
                entriesPerPage={{
                  defaultValue: 10,
                  entries: [10, 25, 50, 100],
                }}
                isLoading={isLoading}
                dragColumn={false}
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
