import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function LeadDetail({ item, value}) {
    return (
        <>
            <MDBox key={item} >
                <MDTypography variant="button" fontWeight="bold" textTransform="capitalize">
                    {item}: &nbsp;
                </MDTypography>
                <MDTypography variant="button" fontWeight="regular" color="text">
                    &nbsp;{value}
                </MDTypography>
            </MDBox>

        </>
    )
}
export default LeadDetail;
