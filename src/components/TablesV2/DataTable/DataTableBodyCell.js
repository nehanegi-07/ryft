import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import React from "react";

const DataTableBodyCell = React.forwardRef((props, ref) => {
  const {
    noBorder,
    align,
    children,
    backgroundColor,
    cell,
    width,
    cursor,
    beforeColor,
  } = props;
  return (
    <MDBox
      ref={ref}
      component="td"
      textAlign={align}
      // py={4}
      px={3}
      sx={({
        palette: { light },
        typography: { size },
        borders: { borderWidth },
      }) => ({
        fontSize: size.md,
        color: "white",
        borderBottom: noBorder
          ? "none"
          : `${borderWidth[1]} solid ${light.main}`,
        backgroundColor: backgroundColor,

        "&:last-child": {
          borderRadius: "0px 10px 10px 0px",
        },
        "&:first-child": {
          // content: '""',
          // display: "block",
          // width: "1px",
          // height: "99%",
          // left: "1px",
          // top: 0,
          borderRadius: "10px 0 0 10px",
          // border: "2px solid black",
          // position: "absolute",
        },
        "&:first-child:before": {
          background: beforeColor,
        },
        position: "relative",
        borderSpacing: "0px 15px",
        padding: "18px",
        brightness: 0.85,
        cursor: cursor,
      })}
    >
      <MDBox
        display="inline-block"
        width={width ? width : "max-content"}
        color={backgroundColor === "#C24641" ? "white" : "text"}
        sx={{
          verticalAlign: "middle",
          pl: 2,
          pr: 3,
        }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
});

// Setting default values for the props of DataTableBodyCell
DataTableBodyCell.defaultProps = {
  noBorder: false,
  align: "left",
};

// Typechecking props for the DataTableBodyCell
DataTableBodyCell.propTypes = {
  children: PropTypes.node.isRequired,
  noBorder: PropTypes.bool,
  align: PropTypes.oneOf(["left", "right", "center"]),
  backgroundColor: PropTypes.string,
  beforeColor: PropTypes.string,
};

export default DataTableBodyCell;
