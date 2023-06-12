import { VectorMap } from "@react-jvectormap/core";
import { worldMerc } from "@react-jvectormap/world";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import LeadsTable from "examples/Tables/LeadsTable";

// Data
import leadsTableData from "layouts/dashboards/analytics/components/LeadsDelivery/data/leadsTabledata";

function LeadsDelivery({ heading }) {

  return (
    <Card sx={{ width: "100%" }}>
      <MDBox display="flex">

        <MDTypography variant="h4" sx={{ mt: 2, mb: 1, ml: 2 }} color="secondary">
          {heading}
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12} md={7} lg={6}>
            <LeadsTable rows={leadsTableData}  shadow={false} />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default LeadsDelivery;
