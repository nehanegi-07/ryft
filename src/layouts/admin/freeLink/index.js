import React, { useState, useEffect, useReducer } from 'react';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import DataTable from 'components/TablesV2/DataTable';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';
import { getUsers } from 'services/Admin.Services';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { notifySuccess, notifyError } from 'components/Messages';
import MDTypography from 'components/MDTypography';
// import Switch from "@mui/material/Switch";
import Switch from 'components/MDSwitch';
import { useFormik } from 'formik';
import { updateIsActiveForUser } from 'services/Admin.Services';
import Divider from '@mui/material/Divider';
import { Autocomplete, Card } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MDInput from 'components/MDInput';
import CustomizedSwitches from 'components/MDSwitch';
import BasicModal from 'components/Modal';
import FreeLinkCredit from './FreeLinkCredit';
import { getFreeLinks } from 'services/Admin.Services';
import MDBadge from 'components/MDBadge';
import { deleteFreeLink } from 'services/Admin.Services';
import ViewUsers from './ViewUsers';

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

function FreeLinks() {
  const navigate = useHistory();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState('idle');
  const [viewUserData, setViewUserData] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const [id, setId] = useState(null);
  const queryClient = useQueryClient();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUser = () => setOpenUser(true);
  const handleCloseUser = () => setOpenUser(false);

  const handleViewUser = (e, data) => {
    setViewUserData(data);
    handleOpenUser();
  };

  const [
    { queryPageIndex, queryPageSize, queryPageFilter, totalCount },
    dispatch,
  ] = useReducer(reducer, initialState);

  const { isLoading, error, data, isSuccess } = useQuery(
    ['freeLinks', queryPageIndex, queryPageSize, queryPageFilter],
    () => getFreeLinks(queryPageIndex, queryPageSize, queryPageFilter),
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

  //   const handleOpen = (row) => {
  //     navigate.push(`/userupdate/${row._id}`);
  //   };

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
      notifySuccess('URL Copied');
    });
  };

  const { mutate: deleteFreeLinks } = useMutation(deleteFreeLink, {
    onSettled: () => queryClient.invalidateQueries('freeLinks'),
    onSuccess: () => {
      notifySuccess('Deleted Successfully');
    },
    onError: () => {
      notifyError('Something Went Wrong');
    },
  });

  const destroyedLink = async (e, id) => {
    try {
      deleteFreeLinks(id);
    } catch (err) {
      console.log('err', err);
    }
  };

  const columns = [
    {
      Header: 'Free Code Link',
      accessor: 'code',
      draggable: true,
      Cell: (props) =>
        props.row.original.code ? (
          <>
            {process.env.REACT_APP_LINK_URL}/signup?code=
            {props.row.original.code}
            <MDButton
              variant="text"
              color="info"
              onClick={() =>
                copyUrl(
                  `${process.env.REACT_APP_LINK_URL}/signup?code=${props.row.original.code}`
                )
              }
            >
              <Icon>copy</Icon>
            </MDButton>
          </>
        ) : (
          '-'
        ),
    },
    {
      Header: 'Free Credits',
      accessor: 'freeCredits',
      draggable: true,
      Cell: (props) => {
        return props.row.original.freeCredits
          ? `£ ${props.row.original.freeCredits}`
          : '-';
      },
    },
    {
      Header: 'Status',
      accessor: 'isUsed',
      draggable: true,
      Cell: (props) =>
        props.row.original.isUsed ? (
          <MDTypography variant="caption" color="text" fontWeight="bold">
            <span style={{ color: '#ffb100' }}>USED</span>
          </MDTypography>
        ) : (
          <MDTypography variant="caption" color="text" fontWeight="bold">
            <span style={{ color: '#43A047' }}>UNUSED</span>
          </MDTypography>
        ),
    },
    // {
    //   Header: 'Used Date',
    //   accessor: 'usedAt',
    //   draggable: true,
    //   Cell: (props) => {
    //     return props.row.original?.usedAt
    //       ? `${new Date(props.row.original?.usedAt).toDateString()}`
    //       : '-';
    //   },
    // },
    {
      Header: 'Users',
      accessor: 'lastName',
      draggable: true,
      Cell: (props) => {
        return (
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width:"100%"
            }}
          >
            <p style={{ width: '100%', textAlign: 'center' }}>
              {props.row.original?.useCounts
                ? props.row.original.useCounts
                : "-"}
            </p>
            {props.row.original?.useCounts===0?null:
              <MDBadge
              color="info"
              sx={{cursor:"pointer"}}
              badgeContent="View User"
              onClick={(e) => handleViewUser(e,props.row.original.user)}
              container
            />
            }
          </MDBox>
        );
      },
    },
    {
      Header: 'Action',
      accessor: 'isDisabled',
      Cell: (props) => {
        return props.row.original?.isDisabled ? (
          <MDButton variant="text" color="info" sx={{cursor:"not-allowed"}}>
            <MDBadge color="dark" badgeContent="Expired" container />
          </MDButton>
        ) : (
          <MDButton
            variant="text"
            color="info"
            onClick={(e) => destroyedLink(e, props.row.original._id)}
          >
            <MDBadge color="info" badgeContent="Destroy" container />
          </MDButton>
        );
      },
    },
  ];

  return (
    <MDBox py={0} height="85vh" sx={{ overflowY: 'hidden' }}>
      <MDBox>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <>
              <DataTable
                tableType="freeLinks"
                table={{ columns: columns, rows: rows }}
                tableTitle="Promo Links"
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
                generateFreeLink={
                  <MDBox>
                    <MDButton
                      sx={{ p: '4px 11px 4px 11px' }}
                      mt={2}
                      onClick={() => handleOpen()}
                      color="dark"
                    >
                      <Icon>add</Icon> Generate Link
                    </MDButton>
                  </MDBox>
                }
                isLoading={isLoading}
                dragColumn={false}
              />
              <BasicModal open={open} handleClose={handleClose}>
                <FreeLinkCredit handleCloseModal={handleClose} />
              </BasicModal>
              <BasicModal open={openUser} handleClose={handleOpenUser} width={600} height={320}>
                <ViewUsers handleCloseModal={handleCloseUser} viewUserData={viewUserData} />
              </BasicModal>
            </>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default FreeLinks;
