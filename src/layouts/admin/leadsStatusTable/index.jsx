import React, { useReducer, useState, useEffect, useCallback, useRef } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DataTable from "components/Tables/DataTable";
import { getUserLeads, updateLeadsDetail } from "services/User.Services";
import { InputAdornment, TextField, CircularProgress } from "@mui/material";
import Loader from "components/Loader";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import BasicModal from "components/Modal";
import MDTypography from "components/MDTypography";
import LeadDetail from "./LeadDetail";
import Tooltip from "@mui/material/Tooltip";
import { useMutation, useQueryClient, useQuery } from "react-query";
import MDBadge from "components/MDBadge";
import Autocomplete from "@mui/material/Autocomplete";
import { notifyError, notifySuccess } from "components/Messages";
import { getLeads } from "services/Admin.Services";
import { getUserLeadsById } from "services/Admin.Services";
import { getUserForAdmin } from "services/Admin.Services";
import MDInput from "components/MDInput";

const initialState = {
  queryPageIndex: 0,
  queryPageSize: 10,
  totalCount: null,
  queryPageFilter: ''
};

const PAGE_CHANGED = 'PAGE_CHANGED';
const PAGE_SIZE_CHANGED = 'PAGE_SIZE_CHANGED';
const PAGE_FILTER_CHANGED = 'PAGE_FILTER_CHANGED'
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



function ChangeLeadsStatusByAdmin() {
  const queryClient = useQueryClient();
  const [{ queryPageIndex, queryPageSize, queryPageFilter }, dispatch] =
    useReducer(reducer, initialState);


  const [showLead, setShowLead] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = React.useState('idle')
  const [users, setUsers] = useState(null)
  const [selectedData, setSelectedData] = useState(null)
  const [rows, setRows] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [csvData, setCsvData] = useState(false);
  const Reported = "Reported";
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
        Reported
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
      c3: lead?.leads?.c3, company: lead?.leads?.company,
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
      updatedAt: lead?.updatedAt, _id: lead?._id,
    });
  });


  const invalidLeadOption = [
    "Select Option",
    "Out of Area",
    "Out of Hours",
    "Outside of Agreed Criteria",
    "Fake Name",
    "Fake Email",
    "Fake Number",
    "Duplicate"
  ]

  const status = [
    "Report Rejected", "Report Accepted"
  ]


  const ChangeLeadStatus = async (e, values, id) => {
    setId(id)
    try {
      mutate({ leadId: id, data: { status: values } })
    } catch (err) {
      console.log('err', err);
    }
  };


  useEffect(() => {
    const callbackFn = async () => {
      const result = await getUserForAdmin();
      const { data } = result.data
      setUsers(data);
    }
    callbackFn()
  }, [selectedUserId])



  const [modalOpen, setModalOpen] = useState(false);
  const { isLoading, data, isSuccess } = useQuery(
    ['reportedLeadsforadmin', queryPageIndex, queryPageSize, queryPageFilter],
    () => getLeads(queryPageIndex, queryPageSize, queryPageFilter, Reported),
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
    if (selectedUserId === null) return
    const callbackFn = async () => {
      const result = await getUserLeadsById(queryPageIndex, queryPageSize, queryPageFilter, selectedUserId);
      const { data } = result.data
      setSelectedData(data);
    }
    callbackFn()
  }, [selectedUserId])


  const { mutate } = useMutation(updateLeadsDetail, {
    onSettled: () => queryClient.invalidateQueries('reportedLeadsforadmin'),
    onSuccess: () => {
      setLoading("pending")
      notifySuccess("Saved Successfully ")
      setLoading("success")
    },
    onError: (error) => {
      setLoading("error")
      notifyError("Something Went Wrong")
    },
  });

  const changeUser = (e, user) => {
    setSelectedUserId(user?._id)
  }

  const handlePaginationEvents = (type, payload) => {
    dispatch({ type: type, payload: payload });
  }

  const handleModalOpen = (row) => {
    setShowLead(row?.leads)
    setModalOpen(true);
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }


  const columns = [
    {
      Header: "Job title", accessor: "jobtitle", Cell: (props) => {
        return (
          `${props.row.original.leads?.jobtitle ?? "-"} ` || ""
        )
      }
    },
    {
      Header: "name", accessor: "name", Cell: (props) => {
        return (
          `${props.row.original.leads?.firstname ?? "-"} ${props.row.original.leads?.lastname ?? "-"}` || ""
        )
      }
    },
    {
      Header: "gender", accessor: "gender", Cell: (props) => {
        return (
          `${props.row.original.leads?.gender ?? "-"}` || ""
        )
      }
    },
    {
      Header: "DOB", accessor: "dob", Cell: (props) => {
        return (
          `${props.row.original.leads?.dob ?? "-"}` || ""
        )
      }
    },
    {
      Header: "Country", accessor: "county", Cell: (props) => {
        return (
          `${props.row.original.leads?.county ?? "-"}` || ""
        )
      }
    },
    {
      Header: "phone number", accessor: "phone1", Cell: (props) => {
        return (
          `${props.row.original.leads?.phone1 ?? "-"}` || ""
        )
      }
    },
    {
      Header: "Invalid Lead Reason", accessor: "invalidLeadReason", width: "30%", Cell: (props) => {
        return (
          `${props.row.original.invalidLeadReason ?? "-"}` || ""
        )
      }
    },
    {
      Header: "Good/Bad Lead ", accessor: "leadRemarks", Cell: (props) => {
        return (
          `${props.row.original.leadRemarks ?? "-"}` || ""
        )
      }
    },
    {
      Header: "Feedback For NMG", accessor: "feedbackForNMG", Cell: (props) => {
        return (

          `${props.row.original.feedbackForNMG ?? "-"}` || ""

        )
      }
    },
    {
      Header: "Client Notes 1", accessor: "clientNotes1", Cell: (props) => {
        return (
          `${props.row.original.clientNotes1 ?? "-"}` || ""
        )
      }
    },
    {
      Header: "Client Notes 2", accessor: "clientNotes2", Cell: (props) => {
        return (
          `${props.row.original.clientNotes2 ?? "-"}` || ""
        )
      }
    },
    {
      Header: "Client Notes 3", accessor: "clientNotes3", Cell: (props) => {
        return (
          `${props.row.original.clientNotes3 ?? "-"}` || ""
        )
      }
    },
    {
      Header: "Reported Date", accessor: "reportedAt", Cell: (props) => {
        return (
          `${new Date(props.row.original.reportedAt).toDateString()}` || ""
        )
      }
    },

    {
      Header: "Status", accessor: "status", width: "14%",
      Cell: (props) => {

        return (
          <>

            {props.row.original.status === "Report Rejected" || props.row.original.status === "Report Accepted" ?
              <MDTypography component="span"
                variant="body3" color="white" sx={{ cursor: "not-allowed" }}>
                {props.row.original.status ?? "-"}
              </MDTypography>
              :
              <Autocomplete
                sx={{ cursor: 'pointer', width: "11rem" }}
                disableClearable
                value={`${props.row.original.status}`}
                options={status}
                onChange={(event, newValue) => ChangeLeadStatus(event, newValue, props.row.original._id)}
                size="small"
                renderInput={(params) => <MDInput sx={{ input: { cursor: 'pointer' } }}
                  color={props.row.original.invalidLeadReason !== "" ? "white" : ""}
                  {...params} fullWidth />}

              />}

          </>
        )
      }
    },

    {
      Header: "View Details", accessor: "Details", width: "14%",
      Cell: (props) => {

        return (
          <MDButton variant="text" color="info" onClick={() => handleModalOpen(props.row.original)}>
            <MDBadge color="info" badgeContent="Details" container />
          </MDButton>

        )
      }
    },
  ];

  const handleRowStyle = (row) => {
    const backgroundColor = row?.original?.invalidLeadReason !== "" && row?.original?.invalidLeadReason !== undefined ?
      "#C24641"
      : null

    const cursorStyle = row.original.status === "Report Rejected" ||
      row.original.status === "Report Accepted"
      ? "not-allowed"
      : "pointer"
    return {
      backgroundColor: backgroundColor,
      cursorStyle: cursorStyle
    }
  }
  return (

    <MDBox py={3}>
      <MDBox>
        <Grid container spacing={3}>

          <Grid item xs={12} lg={12}>

            <DataTable
              tableType="adminleadsStatusTable"
              selectedOption={
                <Autocomplete
                  id="users-list"
                  options={users}
                  getOptionLabel={(users) => `${users?.firstName} ${users?.lastName}`}
                  clearOnEscape
                  sx={{ width: 250 }}
                  size="small"
                  onChange={(event, newValue) => changeUser(event, newValue)}
                  pt={2}
                  renderInput={(params) => <MDInput {...params} mt={2} label="User List" />}
                />
              }
              dragColumn={false}
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
              handleRowStyle={handleRowStyle}
            />


            <BasicModal open={modalOpen} handleClose={handleModalClose} width={600} height={560}>
              <MDBox mx={1}>
                <MDBox display="flex" justifyContent="space-between" alignItems="center" px={0}>
                  <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                  </MDTypography>
                  <MDTypography variant="body2" color="secondary">
                    <Tooltip title={""} placement="top" onClick={handleModalClose}>
                      <Icon>close</Icon>
                    </Tooltip>
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" flexDirection="column" flexWrap="wrap" px={0} sx={{ height: "460px" }}>
                  {showLead ? Object.entries(showLead)?.map(([key, item]) => {
                    return (
                      <>
                        <LeadDetail item={key} value={item} />
                      </>
                    )
                  })
                    : ""
                  }
                </MDBox>
              </MDBox>
            </BasicModal>

          </Grid>
        </Grid>
      </MDBox >
    </MDBox >

  );
}

export default ChangeLeadsStatusByAdmin;
