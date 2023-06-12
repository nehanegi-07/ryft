import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Invoice from "./Invoice";
import DescriptionIcon from '@mui/icons-material/Description';
import Loader from "components/Loader";

function Invoices({ title, invoicesData, onButtonClick, isLoading }) {

  return (
    <Card >
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center" sx={{ position: "sticky", top: 0, background: "white" }}>
        <MDTypography variant="h6" fontWeight="medium">
          {title}
        </MDTypography>
      </MDBox>
      {!isLoading ? invoicesData ?
        <MDBox p={2} sx={{ minHeight: "40vh", maxHeight: "100vh", overflowY: "scroll" }}>
          <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0} >
            {invoicesData.map((invoice) => {
              return <Invoice date={new Date(invoice?.createdAt).toDateString()} id={invoice.invoiceId} price={`£ ${invoice?.price ?? 0}`} onClick={() => onButtonClick(invoice.invoiceId)} />
            })}
          </MDBox>
        </MDBox>
        :
        <MDBox p={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ minHeight: "40vh", maxHeight: "100vh" }}>
          <DescriptionIcon />
          <MDTypography variant="h6" fontWeight="medium">
            No Invoice found
          </MDTypography>
        </MDBox>
        : <MDBox sx={{ minHeight: "40vh", maxHeight: "100vh" , width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Loader size={35} color="info" />
        </MDBox>}



    </Card>
  );
}

export default Invoices;
