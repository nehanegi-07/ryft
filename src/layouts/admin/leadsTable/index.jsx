import React, {
  useReducer,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import DataTable from 'components/Tables/DataTable';
import { getUserLeads, updateLeadsDetail } from 'services/User.Services';
import { InputAdornment, TextField, CircularProgress } from '@mui/material';
import Loader from 'components/Loader';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';
import BasicModal from 'components/Modal';
import MDTypography from 'components/MDTypography';
import LeadDetail from './LeadDetail';
import Tooltip from '@mui/material/Tooltip';
import { useQuery } from 'react-query';
import MDBadge from 'components/MDBadge';
import Autocomplete from '@mui/material/Autocomplete';
import MDInput from 'components/MDInput';
import FeedBackNmgForm from './component/FeedBackNMG_Modal';
import ClientNoteOneForm from './component/ClientNote1_Modal';
import ClientNoteThreeForm from './component/ClientNote3_Modal';
import ClientNoteTwoForm from './component/ClientNote2_Modal';
import { getLeads } from 'services/Admin.Services';
import { getUsers } from 'services/Admin.Services';
import { getUserLeadsById } from 'services/Admin.Services';
import { getUserForAdmin } from 'services/Admin.Services';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArchiveIcon from '@mui/icons-material/Archive';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
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

function UserLeadsForAdmin() {
  const [{ queryPageIndex, queryPageSize, queryPageFilter }, dispatch] =
    useReducer(reducer, initialState);

  const [showLead, setShowLead] = useState(null);
  console.log("showLead",showLead)
  const [id, setId] = useState(null);
  const [value, setValue] = useState(null);
  const [loading, setLoading] = React.useState('idle');
  const [users, setUsers] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [status, setStatus] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackForNMGModalOpen, setFeedbackForNMGModalOpen] = useState(false);
  const [note1ModalOpen, setNote1ModalOpen] = useState(false);
  const [note2ModalOpen, setNote2ModalOpen] = useState(false);
  const [note3ModalOpen, setNote3ModalOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [csvData, setCsvData] = useState(false);

  const csvInstance = useRef();

  useEffect(() => {
    if (csvData && csvInstance.current && csvInstance.current.link) {
      setTimeout(() => {
        csvInstance.current.link.click();
        setCsvData(false);
      });
    }
  }, [csvData]);

  const csvClick = () => {
    const callbackFn = async () => {
      const result = await getLeads(
        queryPageIndex,
        1200000000,
        queryPageFilter,
        status
      );
      const { data } = result.data;
      setCsvData({ data });
    };
    callbackFn();
  };

  let csvLeadsData = [];
  const manipulateCSVData = csvData?.data?.map((lead) => {
    return csvLeadsData.push({
      bid: lead?.bid,
      clientNotes1: lead?.clientNotes1,
      clientNotes2: lead?.clientNotes2,
      clientNotes3: lead?.clientNotes3,
      createdAt: lead?.createdAt,
      feedbackForNMG: lead?.feedbackForNMG,
      invalidLeadReason: lead?.invalidLeadReason,
      leadRemarks: lead?.leadRemarks,
      building: lead?.leads?.building,
      c1: lead?.leads?.c1,
      c2: lead?.leads?.c2,
      c3: lead?.leads?.c3,
      company: lead?.leads?.company,
      county: lead?.leads?.country,
      dob: lead?.leads?.dob,
      email: lead?.leads?.email,
      fax: lead?.leads?.fax,
      firstname: lead?.leads?.firstname,
      gender: lead?.leads?.gender,
      ipaddress: lead?.leads?.ipaddress,
      jobtitle: lead?.leads?.jobtitle,
      lastname: lead?.leads?.lastname,
      optindate: lead?.leads?.optindate,
      optinurl: lead?.leads?.optinurl,
      phone1: lead?.leads?.phone1,
      phone2: lead?.leads?.phone2,
      phone3: lead?.leads?.phone3,
      postcode: lead?.leads?.postcode,
      sid: lead?.leads?.sid,
      source: lead?.leads?.source,
      ssid: lead?.leads?.ssid,
      street1: lead?.leads?.street1,
      street2: lead?.leads?.street2,
      title: lead?.leads?.title,
      towncity: lead?.leads?.towncity,
      leadsCost: lead?.leadsCost,
      rowIndex: lead?.rowIndex,
      status: lead?.status,
      updatedAt: lead?.updatedAt,
      _id: lead?._id,
    });
  });

  const handleArchived = (value) => {
    if (value) {
      setStatus('Archived');
    } else {
      setStatus(null);
    }
  };

  useEffect(() => {
    const callbackFn = async () => {
      const result = await getUserForAdmin();
      const { data } = result.data;
      setUsers(data);
    };
    callbackFn();
  }, [selectedUserId]);

  const archivedLabel = [`Show Archived`, 'Hide Archived'];

  const { isLoading, data, isSuccess } = useQuery(
    [
      'userleadsforadmin',
      queryPageIndex,
      queryPageSize,
      queryPageFilter,
      status,
    ],
    () => getLeads(queryPageIndex, queryPageSize, queryPageFilter, status),
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

  useEffect(() => {
    if (selectedUserId === null) return;
    const callbackFn = async () => {
      const result = await getUserLeadsById(
        queryPageIndex,
        queryPageSize,
        queryPageFilter,
        selectedUserId
      );
      const { data } = result.data;
      setSelectedData(data);
    };
    callbackFn();
  }, [selectedUserId]);

  const changeUser = (e, user) => {
    setSelectedUserId(user?._id);
  };

  const handlePaginationEvents = (type, payload) => {
    dispatch({ type: type, payload: payload });
  };

  const handleModalOpen = (row) => {
    setShowLead(row?.leads);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleNMGModalOpen = (row, id, value) => {
    setShowLead(row?.leads);
    setValue(value);
    setId(id);
    setFeedbackForNMGModalOpen(true);
  };

  const handleNMGModalClose = () => {
    setFeedbackForNMGModalOpen(false);
  };

  const handleNote1ModalOpen = (row, id, value) => {
    setShowLead(row?.leads);
    setId(id);
    setValue(value);
    setNote1ModalOpen(true);
  };

  const handleNote1ModalClose = () => {
    setNote1ModalOpen(false);
  };

  const handleNote2ModalOpen = (row, id, value) => {
    setShowLead(row?.leads);
    setId(id);
    setValue(value);
    setNote2ModalOpen(true);
  };

  const handleNote2ModalClose = () => {
    setNote2ModalOpen(false);
  };

  const handleNote3ModalOpen = (row, id, value) => {
    setShowLead(row?.leads);
    setId(id);
    setValue(value);
    setNote3ModalOpen(true);
  };

  const handleNote3ModalClose = () => {
    setNote3ModalOpen(false);
  };

  const columns = [
    {
      Header: 'Status',
      accessor: 'status',
      width: '14%',
      Cell: (props) => {
        const color = () => {
          switch (props.row.original?.status) {
            case 'Valid':
              return '#85d6b4';

            case 'Reported':
              return 'grey';

            case 'Report Rejected':
              return '#f08e8e';

            case 'Report Accepted':
              return '#85d6b4';

            default:
              return;
          }
        };
        return (
          <>
            {props.row.original?.status === 'Reported' ? (
              <FiberManualRecordIcon style={{ color: color() }} />
            ) : null}
            {props.row.original?.status === 'Valid' ? (
              <FiberManualRecordIcon style={{ color: color() }} />
            ) : null}
            {props.row.original?.status === 'Report Accepted' ? (
              <ThumbUpIcon style={{ color: color() }} />
            ) : null}
            {props.row.original?.status === 'Report Rejected' ? (
              <ThumbDownIcon style={{ color: color() }} />
            ) : null}
            {props.row.original?.status === 'Archived' ? <ArchiveIcon /> : null}{' '}
            {props.row.original?.status ?? '-'}
          </>
        );
      },
    },
    {
      Header: 'Status Updated At',
      accessor: 'reportedAt',
      Cell: (props) => {
        if (props.row.original.reportedAt) {
          if (props.row.original.reportAcceptedAt) {
            return new Date(props.row.original.reportedAt).toDateString();
          } else if (props.row.original.reportRejectedAt) {
            return new Date(props.row.original.acceptedAt).toDateString();
          }
        }else{
          return "-"
        }

      },
    },
    {
      Header: 'Job title',
      accessor: 'jobtitle',
      Cell: (props) => {
        return `${props.row.original.leads?.jobtitle ?? '-'}` || '';
      },
    },
    {
      Header: 'name',
      accessor: 'name',
      Cell: (props) => {
        return (
          `${props.row.original.leads?.firstname} ${props.row.original.leads?.lastname}` ||
          ''
        );
      },
    },
    {
      Header: 'gender',
      accessor: 'gender',
      Cell: (props) => {
        return `${props.row.original.leads?.gender ?? '-'}` || '';
      },
    },
    {
      Header: 'DOB',
      accessor: 'dob',
      Cell: (props) => {
        return `${props.row.original.leads?.dob ?? '-'}` || '';
      },
    },
    {
      Header: 'Country',
      accessor: 'county',
      Cell: (props) => {
        return `${props.row.original.leads?.county ?? '-'}` || '';
      },
    },
    {
      Header: 'phone number',
      accessor: 'phone1',
      Cell: (props) => {
        return `${props.row.original.leads?.phone1 ?? '-'}` || '';
      },
    },
    {
      Header: 'Invalid Lead Reason',
      accessor: 'invalidLeadReason',
      width: '30%',
      Cell: (props) => {
        return `${props.row.original.invalidLeadReason ?? '-'}` || '';
      },
    },
    {
      Header: 'Good/Bad Lead ',
      accessor: 'leadRemarks',
      Cell: (props) => {
        return `${props.row.original.leadRemarks ?? '-'}` || '';
      },
    },
    {
      Header: 'Feedback For NMG',
      accessor: 'feedbackForNMG',
      Cell: (props) => {
        return (
          <>
            {props.row.original.status === 'Report Rejected' ||
            props.row.original.status === 'Report Accepted' ? (
              <MDTypography
                component="span"
                variant="body3"
                color="white"
                sx={{ cursor: 'not-allowed' }}
              >
                {props.row.original.feedbackForNMG ?? '-'}
              </MDTypography>
            ) : (
              <MDInput
                type="text"
                value={props.row.original.feedbackForNMG}
                onClick={() =>
                  handleNMGModalOpen(
                    props.row.original,
                    props.row.original._id,
                    props.row.original.feedbackForNMG
                  )
                }
                sx={{ input: { cursor: 'pointer' } }}
                isLoading={loading}
                color={
                  props.row.original.invalidLeadReason !== '' ? 'white' : ''
                }
              />
            )}
          </>
        );
      },
    },
    {
      Header: 'Client Notes 1',
      accessor: 'clientNotes1',
      Cell: (props) => {
        return (
          <>
            {props.row.original.status === 'Report Rejected' ||
            props.row.original.status === 'Report Accepted' ? (
              <MDTypography
                component="span"
                variant="body3"
                color="white"
                sx={{ cursor: 'not-allowed' }}
              >
                {props.row.original.clientNotes1 ?? '-'}
              </MDTypography>
            ) : (
              <MDInput
                type="text"
                value={props.row.original.clientNotes1}
                onClick={() =>
                  handleNote1ModalOpen(
                    props.row.original,
                    props.row.original._id,
                    props.row.original.clientNotes1
                  )
                }
                sx={{ input: { cursor: 'pointer' } }}
                color={
                  props.row.original.invalidLeadReason !== '' ? 'white' : ''
                }
              />
            )}
          </>
        );
      },
    },
    {
      Header: 'Client Notes 2',
      accessor: 'clientNotes2',
      Cell: (props) => {
        return (
          <>
            {props.row.original.status === 'Report Rejected' ||
            props.row.original.status === 'Report Accepted' ? (
              <MDTypography
                component="span"
                variant="body3"
                color="white"
                sx={{ cursor: 'not-allowed' }}
              >
                {props.row.original.clientNotes2 ?? '-'}
              </MDTypography>
            ) : (
              <MDInput
                type="text"
                value={props.row.original.clientNotes2}
                onClick={() =>
                  handleNote2ModalOpen(
                    props.row.original,
                    props.row.original._id,
                    props.row.original.clientNotes2
                  )
                }
                sx={{ input: { cursor: 'pointer' } }}
                color={
                  props.row.original.invalidLeadReason !== '' ? 'white' : ''
                }
              />
            )}
          </>
        );
      },
    },
    {
      Header: 'Client Notes 3',
      accessor: 'clientNotes3',
      Cell: (props) => {
        return (
          <>
            {props.row.original.status === 'Report Rejected' ||
            props.row.original.status === 'Report Accepted' ? (
              <MDTypography
                component="span"
                variant="body3"
                color="white"
                sx={{ cursor: 'not-allowed' }}
              >
                {props.row.original.clientNotes3 ?? '-'}
              </MDTypography>
            ) : (
              <MDInput
                type="text"
                value={props.row.original.clientNotes3}
                onClick={() =>
                  handleNote3ModalOpen(
                    props.row.original,
                    props.row.original._id,
                    props.row.original.clientNotes3
                  )
                }
                sx={{ input: { cursor: 'pointer' } }}
                color={
                  props.row.original.invalidLeadReason !== '' ? 'white' : ''
                }
              />
            )}
          </>
        );
      },
    },

    // color={props.row.original.invalidLeadReason !== "" && props.row.original.status!=="Report Rejected"? "white" : ""}
    // {...params} fullWidth />}
    // disabled={props.row.original.status==="Report Rejected"?true:false}
    {
      Header: 'View Details',
      accessor: 'Details',
      width: '14%',
      Cell: (props) => {
        return (
          <MDButton
            variant="text"
            color="info"
            onClick={() => handleModalOpen(props.row.original)}
          >
            <MDBadge color="info" badgeContent="Details" container />
          </MDButton>
        );
      },
    },
  ];

  const handleRowStyle = (row) => {
    const backgroundColor =
      row?.original?.invalidLeadReason !== '' &&
      row?.original?.invalidLeadReason !== undefined
        ? '#C24641'
        : null;

    const cursorStyle =
      row.original.status === 'Report Rejected' ||
      row.original.status === 'Report Accepted'
        ? 'not-allowed'
        : 'pointer';
    return {
      backgroundColor: backgroundColor,
      cursorStyle: cursorStyle,
    };
  };
  return (
    <MDBox py={3}>
      <MDBox>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <DataTable
              tableType="adminleadsTable"
              selectedOption={
                <>
                  <Autocomplete
                    id="users-list"
                    options={users}
                    getOptionLabel={(users) =>
                      `${users?.firstName} ${users?.lastName}`
                    }
                    // clearOnEscape
                    size="small"
                    sx={{ width: 250 }}
                    renderInput={(params) => (
                      <TextField {...params} label="User List" />
                    )}
                    onChange={(event, newValue) => changeUser(event, newValue)}
                  />
                </>
              }
              table={{ columns: columns, rows: selectedData ?? rows }}
              tableTitle="New Leads"
              canSearch
              queryPageIndex={queryPageIndex}
              queryPageSize={queryPageSize}
              pageCount={Math.ceil(data?.data?.meta?.total / queryPageSize)}
              queryPageFilter={queryPageFilter}
              handlePaginationEvents={handlePaginationEvents}
              isLoading={isLoading}
              entriesPerPage={{
                defaultValue: 10,
                entries: [10, 25, 50, 100],
              }}
              exportButtonTitle="Export Leads"
              csvClick={csvClick}
              csvData={csvLeadsData}
              csvInstance={csvInstance}
              archivedToggleLabel={archivedLabel}
              handleArchived={handleArchived}
              handleRowStyle={handleRowStyle}
              dragColumn={false}
            />

            <BasicModal
              open={modalOpen}
              handleClose={handleModalClose}
              width={600}
              height={560}
            >
              <MDBox mx={1}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  px={0}
                >
                  <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    textTransform="capitalize"
                  ></MDTypography>
                  <MDTypography variant="body2" color="secondary">
                    <Tooltip
                      title={''}
                      placement="top"
                      onClick={handleModalClose}
                    >
                      <Icon>close</Icon>
                    </Tooltip>
                  </MDTypography>
                </MDBox>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  flexWrap="wrap"
                  px={0}
                  sx={{ height: '460px' }}
                >
                  {showLead
                    ? Object.entries(showLead)?.map(([key, item]) => {
                        return (
                          <>
                            <LeadDetail item={key} value={item} />
                          </>
                        );
                      })
                    : ''}
                </MDBox>
              </MDBox>
            </BasicModal>

            <BasicModal
              open={feedbackForNMGModalOpen}
              handleClose={handleNMGModalClose}
              width={450}
              height={300}
            >
              <FeedBackNmgForm
                handleCloseModal={handleNMGModalClose}
                value={value}
                leadId={id}
              />
            </BasicModal>

            <BasicModal
              open={note1ModalOpen}
              handleClose={handleNote1ModalClose}
              width={450}
              height={300}
            >
              <ClientNoteOneForm
                handleCloseModal={handleNote1ModalClose}
                value={value}
                leadId={id}
              />
            </BasicModal>

            <BasicModal
              open={note3ModalOpen}
              handleClose={handleNote1ModalClose}
              width={450}
              height={300}
            >
              <ClientNoteThreeForm
                handleCloseModal={handleNote3ModalClose}
                value={value}
                leadId={id}
              />
            </BasicModal>

            <BasicModal
              open={note2ModalOpen}
              handleClose={handleNote1ModalClose}
              width={450}
              height={300}
            >
              <ClientNoteTwoForm
                handleCloseModal={handleNote2ModalClose}
                value={value}
                leadId={id}
              />
            </BasicModal>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

export default UserLeadsForAdmin;
