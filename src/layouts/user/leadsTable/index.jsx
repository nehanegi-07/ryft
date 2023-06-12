import React, { useReducer, useState, useEffect, useMemo, useRef } from 'react';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import DataTable from 'components/Tables/DataTable';
import {
  getUserLeads,
  updateLeadsDetail,
  getLeadsColumns,
  changeColumnVisibility,
} from 'services/User.Services';
import Loader from 'components/Loader';
import Icon from '@mui/material/Icon';
import MDButton from 'components/MDButton';
import BasicModal from 'components/Modal';
import MDTypography from 'components/MDTypography';
import LeadDetail from './LeadDetail';
import Tooltip from '@mui/material/Tooltip';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Autocomplete from '@mui/material/Autocomplete';
import MDInput from 'components/MDInput';
import FeedBackNmgForm from './component/FeedBackNMG_Modal';
import ClientNoteOneForm from './component/ClientNote1_Modal';
import { notifyError, notifySuccess } from 'components/Messages';
import ClientNoteThreeForm from './component/ClientNote3_Modal';
import ClientNoteTwoForm from './component/ClientNote2_Modal';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ArchiveIcon from '@mui/icons-material/Archive';
import MDBadge from 'components/MDBadge';
import { Card } from '@mui/material';

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

const invalidLeadOption = [
  'Select Option',
  'Out of Area',
  'Out of Hours',
  'Outside of Agreed Criteria',
  'Fake Name',
  'Fake Email',
  'Fake Number',
  'Duplicate',
];

const archivedLabel = [`Show Archived`, 'Hide Archived'];

const leadRemarks = ['Good', 'Bad'];

function UserLeads() {
  const queryClient = useQueryClient();
  const [{ queryPageIndex, queryPageSize, queryPageFilter }, dispatch] =
    useReducer(reducer, initialState);
  const [showLead, setShowLead] = useState(null);
  const [id, setId] = useState(null);
  const [value, setValue] = useState(null);
  const [columnsFields, setColumnsFields] = useState(null);

  const [loading, setLoading] = React.useState('idle');
  const [columnsLoading, setColumnsLoading] = React.useState('idle');
  const [status, setStatus] = useState(null);
  const [tableData, setTableData] = React.useState([]);
  const [currentStatus, setCurrentStatus] = React.useState(null);
  //Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackForNMGModalOpen, setFeedbackForNMGModalOpen] = useState(false);
  const [note1ModalOpen, setNote1ModalOpen] = useState(false);
  const [note2ModalOpen, setNote2ModalOpen] = useState(false);
  const [note3ModalOpen, setNote3ModalOpen] = useState(false);
  const [changeColumn, setChangeColumn] = useState('');
  const [archiveModal, setArchiveModal] = useState(false);
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
      const result = await getUserLeads(
        queryPageIndex,
        1200000000,
        queryPageFilter,
        false
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

  const ChangeLeadRemark = async (e, values, id) => {
    setId(id);
    try {
      mutate({ leadId: id, data: { leadRemarks: values } });
    } catch (err) {
      console.log('err', err);
    }
  };

  const ChangeInvalidLeadReason = async (e, values, id) => {
    setId(id);
    try {
      mutate({ leadId: id, data: { invalidLeadReason: values } });
    } catch (err) {
      console.log('err', err);
    }
  };

  const { isLoading, data, isSuccess } = useQuery(
    ['users', queryPageIndex, queryPageSize, queryPageFilter, status],
    () => getUserLeads(queryPageIndex, queryPageSize, queryPageFilter, status),
    {
      cacheTime: 0,
      keepPreviousData: true,
      // staleTime: Infinity,
    }
  );

  useEffect(() => {
    if (!data) return;
    setTableData(data?.data?.data);
  }, [data?.data?.data]);

  const { mutate } = useMutation(updateLeadsDetail, {
    onSettled: () => queryClient.invalidateQueries('users'),
    onSuccess: () => {
      setLoading('pending');
      notifySuccess('Saved Successfully');
      setLoading('success');
      setArchiveModal(false);
    },
    onError: (error) => {
      setLoading('error');
      notifyError('Something Went Wrong');
    },
  });

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

  useEffect(() => {
    const callbackFn = async () => {
      setColumnsLoading('pending');
      const result = await getLeadsColumns();
      const { data } = result.data;
      data.columns = data.columns.sort((a, b) => a.index - b.index);
      setColumnsFields(data);
      setColumnsLoading('success');
    };
    callbackFn();
  }, [changeColumn]);

  const columnsSet = useMemo(() => {
    const result = columnsFields?.columns
      ?.filter((item) => item.isVisible)
      ?.map((column) => {
        switch (column.name) {
          // case 'jobtitle':
          //   return {
          //     Header: 'Job title',
          //     accessor: 'jobtitle',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.jobtitle ?? '-'}` || '';
          //     },
          //   };

          // case 'firstname':
          //   return {
          //     Header: 'First Name',
          //     accessor: 'firstname',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.firstname ?? '-'} ` || '';
          //     },
          //   };

          // case 'lastname':
          //   return {
          //     Header: 'Last Name',
          //     accessor: 'lastname',
          //     draggable: true,
          //     Cell: (props) => {
          //       return ` ${props.row.original.leads?.lastname ?? '-'}` || '';
          //     },
          //   };

          // case 'gender':
          //   return {
          //     Header: 'gender',
          //     accessor: 'gender',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.gender ?? '-'}` || '';
          //     },
          //   };

          // case 'dob':
          //   return {
          //     Header: 'DOB',
          //     accessor: 'dob',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.dob ?? '-'}` || '';
          //     },
          //   };

          // case 'county':
          //   return {
          //     Header: 'Country',
          //     accessor: 'county',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.county ?? '-'}` || '';
          //     },
          //   };

          // case 'company':
          //   return {
          //     Header: 'Company',
          //     accessor: 'company',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.company ?? '-'}` || '';
          //     },
          //   };

          // case 'fax':
          //   return {
          //     Header: 'Fax',
          //     accessor: 'fax',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.fax ?? '-'}` || '';
          //     },
          //   };

          // case 'ipaddress':
          //   return {
          //     Header: 'Ip Address',
          //     accessor: 'ipaddress',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.ipaddress ?? '-'}` || '';
          //     },
          //   };

          case 'status':
            return {
              Header: 'Status',
              accessor: 'status',
              draggable: true,
              width: '30%',
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
                    {props.row.original?.status === 'Archived' ? (
                      <ArchiveIcon />
                    ) : null}{' '}
                    {props.row.original?.status ?? '-'}
                  </>
                );
              },
            };

          // case 'source':
          //   return {
          //     Header: 'Source',
          //     accessor: 'source',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.source ?? '-'}` || '';
          //     },
          //   };

          // case 'optindate':
          //   return {
          //     Header: 'Optine Date',
          //     accessor: 'optindate',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.optindate ?? '-'}` || '';
          //     },
          //   };

          // case 'optinurl':
          //   return {
          //     Header: 'Option Url',
          //     accessor: 'optinurl',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.optinurl ?? '-'}` || '';
          //     },
          //   };

          // case 'phone1':
          //   return {
          //     Header: 'Phone 1',
          //     accessor: 'phone1',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.phone1 ?? '-'}` || '';
          //     },
          //   };

          case 'invalidLeadReason':
            return {
              Header: 'Invalid Lead Reason',
              accessor: 'invalidLeadReason',
              draggable: true,
              width: '30%',
              Cell: (props) => {
                return (
                  <>
                    {props.row.original.status === 'Report Rejected' ||
                    props.row.original.status === 'Report Accepted' ? (
                      <MDTypography
                        component="span"
                        variant="body3"
                        color={
                          props.row.original.invalidLeadReason !== ''
                            ? 'white'
                            : ''
                        }
                        sx={{ cursor: 'not-allowed' }}
                      >
                        {props.row.original.invalidLeadReason ?? '-'}
                      </MDTypography>
                    ) : (
                      <Autocomplete
                        disableClearable
                        value={`${props.row.original.invalidLeadReason}`}
                        options={invalidLeadOption}
                        onChange={(event, newValue) =>
                          ChangeInvalidLeadReason(
                            event,
                            newValue,
                            props.row.original._id
                          )
                        }
                        size="small"
                        sx={{ width: '11rem' }}
                        fullWidth
                        renderInput={(params) => (
                          <MDInput
                            sx={{ input: { cursor: 'pointer' } }}
                            color={
                              props.row.original.invalidLeadReason !== ''
                                ? 'white'
                                : ''
                            }
                            {...params}
                            fullWidth
                          />
                        )}
                      />
                    )}
                  </>
                );
              },
            };

          case 'leadRemarks':
            return {
              Header: 'Good/Bad Lead ',
              accessor: 'leadRemarks',
              draggable: true,
              Cell: (props) => {
                return (
                  <>
                    {props.row.original.status === 'Report Rejected' ||
                    props.row.original.status === 'Report Accepted' ? (
                      <MDBox sx={{ cursor: 'not-allowed', width: '100%' }}>
                        <MDTypography
                          component="span"
                          variant="body3"
                          color={
                            props.row.original.invalidLeadReason !== ''
                              ? 'white'
                              : ''
                          }
                        >
                          {props.row.original.leadRemarks ?? '-'}
                        </MDTypography>
                      </MDBox>
                    ) : (
                      <Autocomplete
                        sx={{ cursor: 'pointer', width: '5rem' }}
                        disableClearable
                        value={`${props.row.original.leadRemarks}`}
                        options={leadRemarks}
                        onChange={(event, newValue) =>
                          ChangeLeadRemark(
                            event,
                            newValue,
                            props.row.original._id
                          )
                        }
                        size="small"
                        fullWidth
                        renderInput={(params) => (
                          <MDInput
                            sx={{ input: { cursor: 'pointer' } }}
                            color={
                              props.row.original.invalidLeadReason !== ''
                                ? 'white'
                                : ''
                            }
                            {...params}
                            fullWidth
                          />
                        )}
                      />
                    )}
                  </>
                );
              },
            };

          case 'feedbackForNMG':
            return {
              Header: 'Feedback For NMG',
              accessor: 'feedbackForNMG',
              draggable: true,
              Cell: (props) => {
                return (
                  <>
                    {props.row.original.status === 'Report Rejected' ||
                    props.row.original.status === 'Report Accepted' ? (
                      <MDTypography
                        component="span"
                        variant="body3"
                        color={
                          props.row.original.invalidLeadReason !== ''
                            ? 'white'
                            : ''
                        }
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
                        color={
                          props.row.original.invalidLeadReason !== ''
                            ? 'white'
                            : ''
                        }
                        isLoading={loading}
                      />
                    )}
                  </>
                );
              },
            };

          case 'clientNotes1':
            return {
              Header: 'Client Notes 1',
              accessor: 'clientNotes1',
              draggable: true,
              Cell: (props) => {
                return (
                  <>
                    {props.row.original.status === 'Report Rejected' ||
                    props.row.original.status === 'Report Accepted' ? (
                      <MDTypography
                        component="span"
                        variant="body3"
                        color={
                          props.row.original.invalidLeadReason !== ''
                            ? 'white'
                            : ''
                        }
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
                          props.row.original.invalidLeadReason !== ''
                            ? 'white'
                            : ''
                        }
                      />
                    )}
                  </>
                );
              },
            };

          case 'clientNotes2':
            return {
              Header: 'Client Notes 2',
              accessor: 'clientNotes2',
              draggable: true,
              Cell: (props) => {
                return (
                  <>
                    {props.row.original.status === 'Report Rejected' ||
                    props.row.original.status === 'Report Accepted' ? (
                      <MDTypography
                        component="span"
                        variant="body3"
                        color={
                          props.row.original.invalidLeadReason !== ''
                            ? 'white'
                            : ''
                        }
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
                          props.row.original.invalidLeadReason !== ''
                            ? 'white'
                            : ''
                        }
                      />
                    )}
                  </>
                );
              },
            };

          case 'clientNotes3':
            return {
              Header: 'Client Notes 3',
              accessor: 'clientNotes3',
              draggable: true,
              getCellProps: (props) => {},
              Cell: (props) => {
                return (
                  <>
                    {props.row.original.status === 'Report Rejected' ||
                    props.row.original.status === 'Report Accepted' ? (
                      <MDBox sx={{ cursor: 'not-allowed', width: '100%' }}>
                        <MDTypography
                          component="span"
                          variant="body3"
                          color={
                            props.row.original.invalidLeadReason !== ''
                              ? 'white'
                              : ''
                          }
                        >
                          {props.row.original.clientNotes3 ?? '-'}
                        </MDTypography>
                      </MDBox>
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
                          props.row.original.invalidLeadReason !== ''
                            ? 'white'
                            : ''
                        }
                      />
                    )}
                  </>
                );
              },
            };

          // case 'email':
          //   return {
          //     Header: 'Email',
          //     accessor: 'email',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.email ?? '-'}` || '';
          //     },
          //   };

          // case 'title':
          //   return {
          //     Header: 'Title',
          //     accessor: 'title',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.title ?? '-'}` || '';
          //     },
          //   };

          // case 'building':
          //   return {
          //     Header: 'Building',
          //     accessor: 'building',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.building ?? '-'}` || '';
          //     },
          //   };

          // case 'street1':
          //   return {
          //     Header: 'Street 1',
          //     accessor: 'street1',
          //     draggable: true,
          //     Cell: (props) => {
          //       console.log('props===>', props.row.original.leads?.street1);
          //       return `${props.row.original.leads?.street1 ?? '-'}` || '';
          //     },
          //   };

          // case 'street2':
          //   return {
          //     Header: 'Street 2',
          //     accessor: 'street2',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.street2 ?? '-'}` || '';
          //     },
          //   };

          // case 'towncity':
          //   return {
          //     Header: 'TownCity',
          //     accessor: 'towncity',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.towncity ?? '-'}` || '';
          //     },
          //   };

          // case 'postcode':
          //   return {
          //     Header: 'PostCode',
          //     accessor: 'postcode',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.postcode ?? '-'}` || '';
          //     },
          //   };

          // case 'phone2':
          //   return {
          //     Header: 'Phone 2',
          //     accessor: 'phone2',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.phone2 ?? '-'}` || '';
          //     },
          //   };

          // case 'phone3':
          //   return {
          //     Header: 'Phone 3',
          //     accessor: 'phone3',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.phone3 ?? '-'}` || '';
          //     },
          //   };

          // case 'c2':
          //   return {
          //     Header: 'C2',
          //     accessor: 'c2',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.c2 ?? '-'}` || '';
          //     },
          //   };

          // case 'c3':
          //   return {
          //     Header: 'C3',
          //     accessor: 'c3',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.c3 ?? '-'}` || '';
          //     },
          //   };

          // case 'sid':
          //   return {
          //     Header: 'SID',
          //     accessor: 'sid',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.sid ?? '-'}` || '';
          //     },
          //   };

          // case 'ssid':
          //   return {
          //     Header: 'ssid',
          //     accessor: 'ssid',
          //     draggable: true,
          //     Cell: (props) => {
          //       return `${props.row.original.leads?.ssid ?? '-'}` || '';
          //     },
          //   };

          // case 'reportedAt':
          //   return {
          //     Header: 'Status Updated Date',
          //     accessor: 'reportedAt',
          //     draggable: true,
          //     Cell: (props) => {
          //       if (props.row.original.reportedAt) {
          //         if (props.row.original.reportAcceptedAt) {
          //           return new Date(props.row.original.reportedAt).toDateString();
          //         } else if (props.row.original.reportRejectedAt) {
          //           return new Date(props.row.original.acceptedAt).toDateString();
          //         }
          //       }
          //       else{
          //         return "-"
          //       }
          //     }
          //   };
          default:

            return {
              Header:column?.name,
              accessor: column?.name,
              draggable: true,
              Cell: (props) => {
                return(
                  props.row.original[column?.name]?props.row.original[column?.name]??'-':props.row.original.leads[column?.name]??'-'
                )
              },
            };
        }
      });

    result &&
      result.push({
        Header: 'Archived',
        accessor: 'archived',
      });

    return result;
  }, [
    ChangeInvalidLeadReason,
    ChangeLeadRemark,
    columnsFields?.columns,
    loading,
  ]);

  const dropdownData = useMemo(
    () => columnsFields?.columns?.filter((column) => !column.isVisible),
    [columnsFields]
  );

  const columnUpdate = async (payload) => {
    setColumnsLoading('pending');
    const result = await changeColumnVisibility({ columns: payload });
    const { data } = result.data;
    setColumnsFields(data);
    setColumnsLoading('success');
  };

  const archiveSpecificLead = (id, status) => {
    if (status !== 'Report Accepted' && status !== 'Report Rejected') {
      setCurrentStatus(status);
      setId(id);
      setArchiveModal(true);
    }
  };
  const handleArchivedLead = () => {
    try {
      mutate({
        leadId: id,
        data: { status: currentStatus === 'Valid' ? 'Archived' : 'Valid' },
      });
    } catch (err) {
      console.log('err', err);
    }
  };

  let newData = useMemo(
    () =>
      data?.data?.data?.map((data) => {
        return {
          ...data,
          archived: (
            <MDButton
              variant="text"
              color="info"
              onClick={() => {
                archiveSpecificLead(data._id, data.status);
              }}
              sx={{
                cursor:
                  data.status !== 'Report Accepted' &&
                  data.status !== 'Report Rejected'
                    ? 'pointer'
                    : 'not-allowed',
              }}
            >
              <MDBadge
                color="info"
                badgeContent={
                  data.status === 'Archived' ? 'UnArchive' : 'Archive'
                }
                container
              />
            </MDButton>
          ),
        };
      }),
    [data?.data?.data]
  );

  const { mutate: columnUpdateMutate } = useMutation(changeColumnVisibility, {
    onSettled: () => queryClient.invalidateQueries('users', 'leadColumns'),
    onSuccess: (res) => {},
    onError: (error) => {
      notifyError('Something Went Wrong');
    },
  });

  const updateColumnDropdown = (selectedObject, key) => {
    console.log("column field---->",selectedObject,key)
    let selectedColumn;
    if (typeof selectedObject === 'string') {
      selectedColumn = columnsFields?.columns?.find(
        (item) => item.name === selectedObject
      );
    }
    let updatedColumn =
      typeof selectedObject === 'string' ? selectedColumn : selectedObject;
    let result = columnsFields?.columns?.map((column) => {
      if (column.name === updatedColumn.name) {
        return {
          ...updatedColumn,
          isVisible: !updatedColumn.isVisible,
        };
      }
      return column;
    });

    console.log("result",result)

    setColumnsFields((prev) => ({ ...prev, columns: result }));
    columnUpdateMutate({ key: key, columns: { columns: result } });
    //Call API here
  };

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
      <Grid container spacing={3}>
        {columnsLoading === 'success' || !columnsSet === 'undefined' ? (
          <Grid item xs={12} lg={12}>
            {columnsLoading === 'success' && isSuccess && (
              <DataTable
                tableType="userleadsTable"
                table={{
                  columns: columnsSet,
                  rows: newData,
                }}
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
                columnDropDown={dropdownData}
                onUpdateDropdown={updateColumnDropdown}
                changeInColumns={setChangeColumn}
                originalColumnsFields={columnsFields.columns}
                handleArchived={handleArchived}
                archivedToggleLabel={archivedLabel}
                exportButtonTitle="Export Leads"
                csvClick={csvClick}
                csvData={csvLeadsData}
                csvInstance={csvInstance}
                handleRowStyle={handleRowStyle}
                // columnUpdateMutate={columnUpdateMutate}
                columnUpdateMutate={columnUpdate}
              />
            )}

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
                <Tooltip title={''} placement="top" onClick={handleModalClose}>
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
        <BasicModal
          open={archiveModal}
          handleClose={() => setArchiveModal(false)}
        >
          <MDBox
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <MDTypography variant="h6" fontWeight="medium">
              Are You Sure You want to{' '}
              {currentStatus === 'Archived' ? 'UnArchived' : 'Archived'}?
            </MDTypography>

            <MDBox
              mt={4}
              mb={1}
              sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}
            >
              <MDButton
                color="info"
                onClick={() => handleArchivedLead()}
                isLoading={loading}
                loaderColor="dark"
              >
                {loading === 'pending' ? 'qamwjmq' : 'yes'}
              </MDButton>
              <MDButton
                color="info"
                type="reset"
                onClick={() => setArchiveModal(false)}
              >
                No
              </MDButton>
            </MDBox>
          </MDBox>
        </BasicModal>
      </Grid>
    </MDBox>
  );
}

export default UserLeads;
