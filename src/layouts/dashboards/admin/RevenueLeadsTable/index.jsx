import React, { useReducer, useState } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DataTable from "components/Tables/DataTable";
import { useQuery } from "react-query";
import { getLeadsRevenue } from "services/User.Services";
import Loader from "components/Loader";
import Icon from "@mui/material/Icon";
import MDButton from "components/MDButton";
import BasicModal from "components/Modal";
import MDTypography from "components/MDTypography";
import DataTableWithOutDrag from "components/Tables/DataTable/TableWithoutDrag";

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

function LeadsRevenue() {

    const [{ queryPageIndex, queryPageSize, queryPageFilter }, dispatch] =
        useReducer(reducer, initialState);

    const { isLoading, data, isSuccess } = useQuery(
        ['users', queryPageIndex, queryPageSize, queryPageFilter],
        () => getLeadsRevenue(queryPageIndex, queryPageSize, queryPageFilter),
        {
            keepPreviousData: true,
            // staleTime: Infinity,
        }
    );


    const handlePaginationEvents = (type, payload) => {
        dispatch({ type: type, payload: payload });
    }



    const columns = [
        {
            Header: "Country", accessor: "_id", width: "50%", Cell: (props) => {

                return (
                    `${props.row.original._id.country}` || ""
                )
            }
        },
        {
            Header: "Revenue", accessor: "total", width: "50%", Cell: (props) => {
                return (
                    `${props.row.original.total}` || ""
                )
            }
        },
        // { Header: "", accessor: "R", width: "20%" },
        // { Header: "", accessor: "P", width: "20%" },
        // { Header: "", accessor: "N", width: "20%" },


    ];

    return (

        <MDBox py={3}>
            <MDBox>
                <Grid container spacing={3}>
                    {isLoading === false ?
                        <Grid item xs={12} lg={12}>
                            {isSuccess &&
                                <DataTableWithOutDrag
                                    table={{ columns: columns, rows: data?.data?.data }}
                                    //   tableTitle="User Leads List"

                                    queryPageIndex={queryPageIndex}
                                    queryPageSize={queryPageSize}
                                    pageCount={Math.ceil(data?.data?.meta?.total / queryPageSize)}
                                    queryPageFilter={queryPageFilter}
                                    handlePaginationEvents={handlePaginationEvents}
                                    entriesPerPage={{
                                        defaultValue: 10,
                                        entries: [5, 10, 15, 20, 25],
                                    }}
                                    canSearch

                                />
                            }

                        </Grid> : <Loader size="19" color="info" />
                    }

                </Grid>
            </MDBox>
        </MDBox>

    );
}

export default LeadsRevenue;
