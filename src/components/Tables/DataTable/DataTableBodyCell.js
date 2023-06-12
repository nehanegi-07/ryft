import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import React from 'react';

const DataTableBodyCell = React.forwardRef
  ((props, ref) => {
  const { noBorder, align, children, backgroundColor, cell,width,cursor} = props;
  return (
    <MDBox
      ref={ref}
      component="td"
      textAlign={align}
      py={0.2}
      px={3}
      sx={({ palette: { light }, typography: { size }, borders: { borderWidth } }) => ({
        fontSize: size.sm,
        color: "white",
        borderBottom: noBorder ? "none" : `${borderWidth[1]} solid ${light.main}`,
        backgroundColor: backgroundColor,
        brightness:0.85,
        cursor:cursor
      })}
    >
      <MDBox
        display="inline-block"
        width={width?width:"max-content"}
        color={backgroundColor === "#C24641" ? "white" : "text"}
        sx={{ verticalAlign: "middle",
        pl:2,pr:3
       }}
      >
        {children}
      </MDBox>
    </MDBox>
  );
})

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
  backgroundColor: PropTypes.string
};

export default DataTableBodyCell;
