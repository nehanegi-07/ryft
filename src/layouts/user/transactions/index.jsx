import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Transaction from "./SingleTransaction";
import Loader from "components/Loader";
import Grid from "@mui/material/Grid";

function Transactions({ transactionsData, title, isLoading }) {
  return (
    <Card sx={{ maxHeight:650,minHeight:200, overflowY: "scroll" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} pb={2} px={2} sx={{ position: "sticky", top: 0, backgroundColor: "#fff", zIndex: 999 }}>

        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize" sx={{}}>
          Your Transaction&apos;s
        </MDTypography>
        <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox pt={3} pb={2} px={2} >
        {!isLoading ? <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {transactionsData?.map((transaction) => {
            return (

              transaction?.status === 'success' ? (
                <Transaction
                  color={transaction?.isCredited === true ? 'success' : 'error'}
                  icon={
                    transaction?.isCredited === true
                      ? 'expand_less'
                      : 'expand_more'
                  }
                  name={transaction?.name}
                  date={new Date(transaction?.createdAt).toDateString()}
                  isCredited={transaction?.isCredited}
                  value={transaction?.amount}
                  title={transaction?.title}
                />
              ) : null
              )
          })}

        </MDBox> :
          <MDBox sx={{ height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Loader size={35} color="info" />
          </MDBox>
       }
      </MDBox>
    </Card>
  );
}

export default Transactions;
