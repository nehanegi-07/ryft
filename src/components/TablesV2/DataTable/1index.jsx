import React, { useMemo, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Paper from "@mui/material/Paper";
import ToggleSwitch from "components/ToggleSwitch";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import {
  useTable,
  usePagination,
  useGlobalFilter,
  useColumnOrder,
  useAsyncDebounce,
  useSortBy,
  useExpanded,
} from "react-table";
import Switch from "@mui/material/Switch";
import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import { Search } from "@mui/icons-material";
import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "components/MDBox";
import TableCell from "@mui/material/TableCell";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDPagination from "components/MDPagination";
import DataTableHeadCell from "./DataTableHeadCell";
import DataTableBodyCell from "./DataTableBodyCell";
import { useQueryClient, useMutation, useQuery } from "react-query";
import Loader from "components/Loader";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { updateUserRowByDrag } from "services/Admin.Services";
import {
  updateLeadsRowByDrag,
  changeColumnVisibility,
} from "services/User.Services";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import Fullscreen from "fullscreen-react";
import { useNavbar } from "context";
import MDButton from "components/MDButton";
import { notifyError, notifySuccess } from "components/Messages";
import { CSVLink } from "react-csv";
import "./index.css";
import { IconButton, TextField } from "@mui/material";
function DataTable({
  queryPageIndex,
  queryPageSize,
  pageCount,
  queryPageFilter,
  handlePaginationEvents,
  handleRowStyle,
  entriesPerPage,
  canSearch,
  generateFreeLink,
  showTotalEntries,
  dragRow,
  renderSubRowComponent,
  setIsEnter,
  table,
  pagination,
  isSorted,
  noEndBorder,
  tableTitle,
  tableType,
  isLoading,
  selectedOption,
  columnDropDown,
  changeInColumns,
  originalColumnsFields,
  onUpdateDropdown,
  handleArchived,
  showArchived,
  archivedToggleLabel,
  csvData,
  csvInstance,
  csvClick,
  exportButtonTitle,
  columnUpdateMutate,
  dragColumn = true,
}) {
  const [data, setData] = useState(table.rows);
  const [columnDragData, setColumnDragData] = useState(originalColumnsFields);
  const handle = useFullScreenHandle();
  const queryClient = useQueryClient();
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  useEffect(() => {
    setData(table.rows);
  }, [table.rows]);
  const defaultValue = entriesPerPage.defaultValue
    ? entriesPerPage.defaultValue
    : 10;
  const entries = entriesPerPage.entries
    ? entriesPerPage.entries.map((el) => el.toString())
    : ["10", "25", "50", "100"];
  const columns = useMemo(() => table?.columns, [table]);
  // const [expanded, setExpanded] = React.useState({})

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: queryPageIndex,
        pageSize: queryPageSize,
      },
      manualPagination: true,
      // getSubRows: row => row.subRows,
      //  onExpandedChange: setExpanded,
      //   getExpandedRowModel:getExpandedRowModel(),
      pageCount: pageCount,
    },

    //
    //
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination,
    useColumnOrder
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize, expanded },
  } = tableInstance;
  // Set the default value for the entries per page when component mounts
  useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);
  // Set the entries per page value based on the select value
  const setEntriesPerPage = (value) => setPageSize(value);
  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <MDPagination
      item
      key={option}
      onClick={() => gotoPage(Number(option))}
      active={pageIndex === option}
    >
      {" "}
      {option + 1}
    </MDPagination>
  ));
  // Handler for the input to set the pagination index
  const handleInputPagination = ({ target: { value } }) =>
    value > pageOptions.length || value < 0
      ? gotoPage(0)
      : gotoPage(Number(value));
  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option + 1);
  // Setting value for the pagination input
  const handleInputPaginationValue = ({ target: value }) =>
    gotoPage(Number(value.value - 1));
  // Search input value state
  const [search, setSearch] = useState(queryPageFilter);
  const onSearchChange = useAsyncDebounce((value) => {
    handlePaginationEvents("PAGE_FILTER_CHANGED", value);
  }, 800);
  // A function that sets the sorted value for the table
  const setSortedValue = (column) => {
    let sortedValue;
    if (isSorted && column.isSorted) {
      sortedValue = column.isSortedDesc ? "desc" : "asce";
    } else if (isSorted) {
      sortedValue = "none";
    } else {
      sortedValue = false;
    }
    return sortedValue;
  };
  useEffect(() => {
    handlePaginationEvents("PAGE_CHANGED", pageIndex);
    //dispatch({ type: PAGE_CHANGED, payload: pageIndex });
  }, [pageIndex]);
  useEffect(() => {
    handlePaginationEvents("PAGE_SIZE_CHANGED", pageSize);
    //dispatch({ type: PAGE_SIZE_CHANGED, payload: pageSize });
    gotoPage(0);
  }, [pageSize, gotoPage]);
  useEffect(() => {
    if (data?.count) {
      handlePaginationEvents("TOTAL_COUNT_CHANGED", data.count);
      // dispatch({
      //   type: TOTAL_COUNT_CHANGED,
      //   payload: data.count,
      // });
    }
  }, [data?.count]);
  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = data[dragIndex];
    setData(
      update(data, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    );
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <FullScreen handle={handle} className={handle.active ? "component" : ""}>
        <MDBox>
          <MDBox
            sx={{ position: "sticky", top: 0, backgroundColor: "#EEF0F3" }}
          >
            {tableTitle ? (
              <MDBox sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <MDTypography
                fontWeight="medium"
                color="secondary"
                fontSize="45px"
                mt={2}
                ml={2}
                mb={2}
              >
                {tableTitle}
                </MDTypography>
              {generateFreeLink?generateFreeLink:null}
              </MDBox>
            ) : (
              ""
            )}

            {tableTitle === "Clients" ? (
              <MDBox
                sx={{
                  display: "flex",
                  pl: 1.7,
                  justifyContent: "space-between",
                }}
              >
                <MDBox sx={{ display: "flex" }}>
                  <MDBox sx={{ display: "flex", alignItems: "center" }}>
                    <FiberManualRecordIcon style={{ color: "#6BEB98" }} />
                    <MDTypography
                      variant="caption"
                      color="text"
                      fontWeight="bold"


                      sx={{ pl: 1,sm:{fontSize:"8px"},md:{fontSize:"13px"} }}
                    >
                      <span style={{ color: "#6BEB98" }}>ACTIVE CLIENT</span>
                    </MDTypography>
                  </MDBox>
                  <MDBox sx={{ display: "flex", alignItems: "center", pl: 6 }}>
                    <FiberManualRecordIcon style={{ color: "#FFA800" }} />
                    <MDTypography
                      variant="caption"
                      color="text"
                      fontWeight="bold"
                      fontSize="13px"
                      sx={{ pl: 1 }}
                    >
                      <span style={{ color: "#FFA800" }}>PAUSED CLIENT</span>
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBox
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {handle.active ? (
                    <FullscreenExitIcon
                      onClick={handle.exit}
                      fontSize="large"
                    />
                  ) : (
                    <>
                      <MDTypography
                        variant="caption"
                        color="text"
                        fontWeight="bold"
                        fontSize="13px"
                        sx={{ pr: 1 }}
                      >
                        View full screen
                      </MDTypography>
                      <FullscreenIcon
                        onClick={handle.enter}
                        fontSize="medium"
                      />
                    </>
                  )}
                </MDBox>
              </MDBox>
            ) : null}

            <MDBox
              sx={{
                mt: 2,
                p: "10px 0px 0px 10px",
                height: "60px",
                display: "flex",
                // justifyContent: "space-between",
                gap:1
              }}
            >
              <Paper
                component="form"
                onSubmit={() => {}}
                sx={{
                  borderRadius: "5px",

                  pl: 2,
                  boxShadow: "none",

                  width: "20vw",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <input
                  placeholder="SEARCH"
                  style={{
                    border: "none",
                    outline: "none",
                  }}
                  value={search}
                  onChange={({ currentTarget }) => {
                    setSearch(currentTarget.value);
                    onSearchChange(currentTarget.value);
                  }}
                />
                <IconButton type="submit" sx={{ p: "5px 0px 5px 0px", mr: 2 }}>
                  <Search />
                </IconButton>
              </Paper>
              {entriesPerPage || canSearch ? (
                <>
                  {entriesPerPage && (

                      <Autocomplete
                        disableClearable
                        value={pageSize.toString()}
                        options={entries}
                        onChange={(event, newValue) => {
                          setEntriesPerPage(parseInt(newValue, 10));
                        }}
                        size="small"
                        sx={{ width: "15vh" }}
                        renderInput={(params) => (
                          <TextField
                            sx={{
                              backgroundColor: "#fff",
                              p: "7px 0px 7px 0px",
                              borderRadius: "5px",
                              "& fieldset": { border: "none" },
                            }}
                            {...params}
                          />
                        )}
                      />


                  )}
                </>
              ) : (
                ""
              )}
              <Autocomplete
                disableClearable
                value={"Newest to oldest"}
                options={["Newest to oldest", "Oldest to new"]}
                onChange={(event, newValue) => {
                  ""
                }}
                size="small"
                sx={{ width:"15vw" }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      backgroundColor: "#fff",
                      p: "7px 0px 7px 0px",
                      borderRadius: "5px",
                      "& fieldset": { border: "none" },
                    }}
                    {...params}
                  />
                )}
              />
              <Autocomplete
                disableClearable
                value={"Newest to oldest"}
                options={["Newest to oldest", "Oldest to new"]}
                onChange={(event, newValue) => {
                  ""
                }}
                size="small"
                sx={{ width: "15vw" }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      backgroundColor: "#fff",
                      p: "7px 0px 7px 0px",
                      borderRadius: "5px",
                      "& fieldset": { border: "none" },
                    }}
                    {...params}
                  />
                )}
              />
              <Autocomplete
                disableClearable
                value={"Newest to oldest"}
                options={["Newest to oldest", "Oldest to new"]}
                onChange={(event, newValue) => {
                 ""
                }}
                size="small"
                sx={{ width: "15vw" }}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      backgroundColor: "#fff",
                      p: "7px 0px 7px 0px",
                      borderRadius: "5px",
                      "& fieldset": { border: "none" },
                    }}
                    {...params}
                  />
                )}
              />

              <MDBox>
                <MDButton
                  sx={{ p: "4px 11px 4px 11px", height: "46px" }}
                  onClick={() => csvClick()}
                  color="dark"
                  height="100px"
                >
                  <FileDownloadIcon />
                  Export Clients
                </MDButton>
              </MDBox>
            </MDBox>

            {/* {entriesPerPage || canSearch ? (
                <MDBox alignItems="center" pt={""} pl={3}>
                  {entriesPerPage && (
                    <MDBox display="flex" alignItems="center">
                      <Autocomplete
                        disableClearable
                        value={pageSize.toString()}
                        options={entries}
                        onChange={(event, newValue) => {
                          setEntriesPerPage(parseInt(newValue, 10));
                        }}
                        size="small"
                        sx={{ width: "5rem" }}
                        renderInput={(params) => <MDInput {...params} />}
                      />
                      <MDTypography variant="caption" color="secondary">
                        &nbsp;&nbsp;entries per page
                      </MDTypography>
                    </MDBox>
                  )}
                </MDBox>
              ) : (
                ""
              )} */}

            {/* <MDBox sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <MDBox>
                {entriesPerPage || canSearch ? (
                  <MDBox alignItems="center" pt={''} pl={3}>
                    {entriesPerPage && (
                      <MDBox display="flex" alignItems="center">
                        <Autocomplete
                          disableClearable
                          value={pageSize.toString()}
                          options={entries}
                          onChange={(event, newValue) => {
                            setEntriesPerPage(parseInt(newValue, 10));
                          }}
                          size="small"
                          sx={{ width: '5rem' }}
                          renderInput={(params) => <MDInput {...params} />}
                        />
                        <MDTypography variant="caption" color="secondary">
                          &nbsp;&nbsp;entries per page
                        </MDTypography>
                      </MDBox>
                    )}
                    {canSearch && (
                      <MDBox width="12rem" mt={2}>
                        <MDInput
                          placeholder="SEARCH"
                          value={search}
                          sx={{background:"#FFFFFF"}}
                          size="small"
                          fullWidth
                          onChange={({ currentTarget }) => {
                            setSearch(currentTarget.value);
                            onSearchChange(currentTarget.value);
                          }}
                        />
                      </MDBox>
                    )}
                  </MDBox>
                ) : null}
              </MDBox>
              <MDBox>
                {tableTitle === 'New Leads' ? (
                  <MDBox ml={3} display="flex">
                    {csvData ? (
                      <CSVLink
                        data={csvData}
                        filename={'my-file.csv'}
                        ref={csvInstance}
                      />
                    ) : undefined}
                    {tableType === 'userleadsTable' ||
                    tableType === 'adminleadsTable' ? (
                      <MDBox width="8rem" mt={3}>
                        <ToggleSwitch
                          id="id"
                          defaultChecked={showArchived}
                          disabled={false}
                          Text={archivedToggleLabel}
                          onToggleChange={(e) =>
                            handleArchived(e.target.checked)
                          }
                        />
                      </MDBox>
                    ) : (
                      ''
                    )}
                    {exportButtonTitle ? (
                      <MDButton
                        variant="gradient"
                        onClick={() => csvClick()}
                        color="dark"
                        sx={{ height: '10px', mt: 3.5 }}
                      >
                        <FileDownloadIcon />
                        &nbsp;{exportButtonTitle}
                      </MDButton>
                    ) : null}
                    {selectedOption ? (
                      <MDBox ml={1} mr={1} display="flex" sx={{ mt: 3.5 }}>
                        {selectedOption}
                      </MDBox>
                    ) : null}
                    {tableType === 'userleadsTable' ? (
                      <MDBox mt={''} ml={2}>
                        <MDTypography
                          variant="caption"
                          fontWeight="medium"
                          color="text"
                          sx={{ fontSize: '14px' }}
                        >
                          Select Columns
                        </MDTypography>
                        <Autocomplete
                          disableClearable
                          getOptionLabel={(item) => item.name}
                          options={columnDropDown}
                          onChange={
                            (event, newValue) => {
                              onUpdateDropdown(newValue);
                            }
                            // updateColumnVisibility(event, newValue)
                          }
                          size="small"
                          sx={{ width: '11rem' }}
                          fullWidth
                          renderInput={(params) => (
                            <MDInput {...params} fullWidth />
                          )}
                        />
                        {tableTitle === 'New Leads' ? (
                          <MDBox width="12rem" ml={4}>
                            <MDTypography
                              variant="caption"
                              fontWeight="medium"
                              color="text"
                              sx={{ fontSize: '14px' }}
                            >
                              Delete Columns
                            </MDTypography>
                            <Switch
                              checked={showDeleteIcon}
                              onChange={(e) =>
                                setShowDeleteIcon(e.target.checked)
                              }
                            />
                          </MDBox>
                        ) : (
                          ''
                        )}
                        <MDBox />
                      </MDBox>
                    ) : null}
                  </MDBox>
                ) : (
                  ''
                )}
              </MDBox>
            </MDBox> */}
          </MDBox>
          <TableContainer
            sx={{
              boxShadow: "none",
              height: handle.active ? "70vh" : "700px",
              overflow: data.length ? 'scroll' : 'hidden',
            }}
          >
            {isLoading ? (
              <MDBox
                textAlign="center"
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Loader size={80} color="info" />
              </MDBox>
            ) : (
              <>
                <MDBox>
                  <Table
                    {...getTableProps()}
                    sx={{
                      borderCollapse: "separate",
                      borderSpacing: "0px 9px",
                    }}
                  >
                    <MDBox
                      component="thead"
                      sx={{
                        position: "sticky",
                        top: 0,
                        backgroundColor: "#EEF0F3",
                        zIndex: 999,
                      }}
                    >
                      {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                         {dragRow?<DataTableHeadCell width="10%" align="left">
                            Move
                          </DataTableHeadCell>:null}
                          {headerGroup.headers.map((column, index) => {
                            if (
                              column.Header === "Action" ||
                              column.Header === "View Details" ||
                              column.Header === "Auto Charge" ||
                              column.Header === "Active"
                            ) {
                              return (
                                <DataTableHeadCell
                                  {...column.getHeaderProps()}
                                  width={column.width ? column.width : "auto"}
                                  align={column.align ? column.align : "left"}
                                >
                                  {column?.isVisible
                                    ? column.render("Header")
                                    : null}
                                  {showDeleteIcon ? (
                                    <CloseIcon
                                      onClick={(e) => {
                                        onUpdateDropdown(column?.id);
                                      }}
                                      fontSize="small"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </DataTableHeadCell>
                              );
                            }
                            return dragColumn ? (
                              <Column
                                columnDragData={columnDragData}
                                key={column.id}
                                column={column}
                                index={index}
                                showDeleteIcon={showDeleteIcon}
                                onUpdateDropdown={onUpdateDropdown}
                                isSorted={isSorted}
                                setSortedValue={setSortedValue}
                                columnUpdateMutate={columnUpdateMutate}
                              />
                            ) : (
                              <DataTableHeadCell
                                {...column.getHeaderProps(
                                  isSorted && column.getSortByToggleProps()
                                )}
                                width={column.width ? column.width : "auto"}
                                align={column.align ? column.align : "left"}
                                sorted={setSortedValue(column)}
                              >
                                <MDBox
                                  sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10",
                                  }}
                                >
                                  {column.render("Header")}

                                  {showDeleteIcon ? (
                                    column.Header === "Status" ? null : (
                                      <CloseIcon
                                        onClick={(e) => {
                                          onUpdateDropdown(column?.id);
                                        }}
                                        fontSize="small"
                                      />
                                    )
                                  ) : (
                                    ""
                                  )}
                                </MDBox>
                              </DataTableHeadCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </MDBox>
                    <TableBody
                      {...getTableBodyProps()}
                      sx={{ backgroundColor: "#f8f8f8" }}
                    >
                      {data.length ? (
                        page.map((row, key) => {
                          return (
                            prepareRow(row) || (
                              <Row
                                index={row.id}
                                renderSubRowComponent={renderSubRowComponent}
                                row={row}
                                moveRow={moveRow}
                                data={data}
                                noEndBorder={noEndBorder}
                                originalData={table.rows}
                                tableType={tableType}
                                tableTitle={tableTitle}
                                visibleColumns={visibleColumns}
                                dragRow={dragRow}
                                handleRowStyle={
                                  handleRowStyle ? handleRowStyle(row) : null
                                }
                              />
                            )
                          );
                        })
                      ) : (
                        <TableCell style={{ textAlign: "center" }} colSpan={9}>
                          No rows found
                        </TableCell>
                      )}
                    </TableBody>
                  </Table>
                </MDBox>
              </>
            )}
          </TableContainer>
          <MDBox
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="flex-end"
            sx={{ position: "sticky", top: 0 }}
            alignItems={{ xs: "flex-start", sm: "center" }}
            p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
          >
            {" "}
            {pageOptions.length > 1 && (
              <MDPagination
                variant={pagination.variant ? pagination.variant : "gradient"}
                color={pagination.color ? pagination.color : "info"}
              >
                {canPreviousPage && (
                  <MDPagination item onClick={() => previousPage()}>
                    <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
                  </MDPagination>
                )}
                {renderPagination.length > 10 ? (
                  <MDBox width="5rem" mx={1}>
                    <MDInput
                      inputProps={{
                        type: "number",
                        min: 1,
                        max: customizedPageOptions.length,
                      }}
                      value={customizedPageOptions[pageIndex]}
                      onChange={
                        (handleInputPagination, handleInputPaginationValue)
                      }
                    />
                  </MDBox>
                ) : (
                  renderPagination
                )}
                {canNextPage && (
                  <MDPagination item onClick={() => nextPage()}>
                    <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
                  </MDPagination>
                )}
              </MDPagination>
            )}
          </MDBox>
        </MDBox>
      </FullScreen>
    </Paper>
  );
}
const DND_ITEM_TYPE = "row";
const DND_ITEM_TYPE_COLUMN = "column";

const Column = ({
  index,
  column,
  showDeleteIcon,
  onUpdateDropdown,
  isSorted,
  setSortedValue,
  columnDragData,
  columnUpdateMutate,
}) => {
  const ref = useRef(null);
  const { id, Header } = column;
  const restructureDataForResult = (data) => {
    let result = new Map();
    for (let i = 0; i < data.length; i++) {
      result.set(i, data[i].index);
    }
    return result;
  };

  let newColumnData = columnDragData.filter((item) => {
    return item.isVisible;
  });
  const reorder = (selectedItem, index) => {
    const mapData = restructureDataForResult(newColumnData);
    const dragRecord = newColumnData[selectedItem.index];
    const rre = update(newColumnData, {
      $splice: [
        [selectedItem.index, 1],
        [index, 0, dragRecord],
      ],
    });
    const updatedColumn = rre.map((item, index) => {
      return {
        name: item.name,
        isVisible: item.isVisible,
        index: mapData.get(index),
      };
    });
    const finalResult = columnDragData.map((item) => {
      if (!item.isVisible) {
        return item;
      } else {
        const column = updatedColumn.find((i) => i.name === item.name);
        return column;
      }
    });

    return finalResult;
  };

  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE_COLUMN,
    drop: (item) => {
      columnUpdateMutate({ columns: reorder(item, index) });
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DND_ITEM_TYPE_COLUMN,
    item: () => {
      return {
        id,
        index,
        header: Header,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));
  const memoizedColumn = useMemo(() => column.render("Header"), [column]);
  const opacity = isDragging ? 0 : 1;

  return (
    <DataTableHeadCell
      {...column.getHeaderProps(isSorted && column.getSortByToggleProps())}
      ref={ref}
      width={column.width ? column.width : "auto"}
      align={column.align ? column.align : "left"}
      sorted={setSortedValue(column)}
      style={{
        cursor: "move",
        opacity,
        background: isDragging ? "red" : "",
      }}
    >
      {" "}
      <MDBox
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "10",
        }}
      >
        {" "}
        {memoizedColumn}{" "}
        {showDeleteIcon ? (
          column.Header === "Status" ? null : (
            <CloseIcon
              onClick={(e) => {
                onUpdateDropdown(column?.id);
              }}
              fontSize="small"
            />
          )
        ) : (
          ""
        )}{" "}
      </MDBox>{" "}
    </DataTableHeadCell>
  );
};

const Row = ({
  row,
  index,
  moveRow,
  noEndBorder,
  data,
  tableType,
  originalData,
  handleRowStyle,
  renderSubRowComponent,
  visibleColumns,
  dragRow
}) => {
  const updateRow = async (newArray) => {
    if (tableType === "userTable") {
      await updateUserRowByDrag(newArray);
    } else {
      await updateLeadsRowByDrag(newArray);
    }
  };
  const restructureDataForResult = (data) => {
    let result = new Map();
    for (let i = 0; i < data.length; i++) {
      result.set(i, data[i].rowIndex);
    }
    return result;
  };
  const getIndex = (i) => {
    const result = restructureDataForResult(originalData);
    return result.get(i);
  };

  const restructureData = () => {
    const result = data.map((item, index) => {
      return {
        _id: item._id,
        rowIndex: getIndex(index),
      };
    });
    return result;
  };

  const dropRef = React.useRef(null);
  const dragRef = React.useRef(null);
  const [, drop] = useDrop({
    accept: DND_ITEM_TYPE,
    drop: (item, monitor) => {
      const newArray = restructureData();
      updateRow(newArray);
    },
    hover(item, monitor) {
      if (!dropRef.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = dropRef.current.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    item: { index },
    type: DND_ITEM_TYPE,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  preview(drop(dropRef));
  drag(dragRef);

  return (
    <>
      <tr
        {...row.getRowProps()}
        ref={dropRef}
        style={{ opacity, backgroundColor: "white" }}
      >
        {" "}
        {dragRow ?
          <DataTableBodyCell
            ref={dragRef}
            // noBorder={noEndBorder && rows.length - 1 === index}
            align={"left"}
            beforeColor="#6FF09C"
          >
            <DragIndicatorIcon
              sx={{ fontSize: 80, width: "25px", height: "25px" }}
              size="large"
            />
          </DataTableBodyCell>:null
         }
        {row.cells.map((cell) => (
          <>
            <DataTableBodyCell
              noBorder={noEndBorder && data.length - 1 === index}
              align={cell.column.align ? cell.column.align : "left"}
              cursor={handleRowStyle?.cursorStyle}
              backgroundColor={handleRowStyle?.backgroundColor}
              {...cell.getCellProps()}
              // beforeColor=cell?.row?.original?.isUsed?"#ffb100":"#6FF09C"
            >
              {cell.render("Cell")}

            </DataTableBodyCell>
          </>
        ))}
      </tr>

      {row.isExpanded ? (
        <tr>
          <td
            colSpan={visibleColumns.length + 1}
            style={{ borderRadius: "10px", backgroundColor: "#e5e7ea" }}
          >
            {renderSubRowComponent({ row })}
          </td>
        </tr>
      ) : null}
    </>
  );
};
// Setting default values for the props of DataTable
DataTable.defaultProps = {
  handlePaginationEvents: function () {},
  entriesPerPage: { defaultValue: 25, entries: [10, 25, 50, 100] },
  canSearch: false,
  showTotalEntries: false,
  pagination: { variant: "gradient", color: "info" },
  isSorted: true,
  noEndBorder: false,
};
// Typechecking props for the DataTable
DataTable.propTypes = {
  queryPageIndex: PropTypes.number,
  queryPageSize: PropTypes.number,
  pageCount: PropTypes.number,
  queryPageFilter: PropTypes.string,
  handlePaginationEvents: PropTypes.func,
  entriesPerPage: PropTypes.oneOfType([
    PropTypes.shape({
      entries: PropTypes.arrayOf(PropTypes.number),
    }),
    PropTypes.bool,
  ]),
  canSearch: PropTypes.bool,
  showTotalEntries: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  isSorted: PropTypes.bool,
  noEndBorder: PropTypes.bool,
  isLoading: PropTypes.bool,
};
export default DataTable;
