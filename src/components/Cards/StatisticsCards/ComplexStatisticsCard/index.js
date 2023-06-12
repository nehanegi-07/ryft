
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Loader from "components/Loader"

function ComplexStatisticsCard({ color, title, count, percentage, icon, isLoading }) {
  return (
    <Card sx={{ height: 220 }}>
      {isLoading ? <MDBox sx={{ display: "flex", justifyContent: "center", alignItems: "center" ,height:"100%"}}>
        <Loader size={35} color="info" />
      </MDBox> :
        <>
          <MDBox display="flex" justifyContent="space-between" pt={1} px={2} sx={{ height: "80%" }}>
            <MDBox
              variant="gradient"
              bgColor={color}
              color={color === "light" ? "dark" : "white"}
              coloredShadow={color}
              borderRadius="xl"
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="4rem"
              height="4rem"
              mt={-4}
            >
              <Icon fontSize="medium" color="inherit">
                {icon}
              </Icon>
            </MDBox>
            <MDBox textAlign="right" lineHeight={1.25}>
              <MDTypography variant="h5" fontWeight="light" color="text">
                {title}
              </MDTypography>
              <MDTypography variant="h4">{count}</MDTypography>
            </MDBox>
          </MDBox>
          <Divider />
          <MDBox pb={1} px={2}>
            <MDTypography component="p" variant="h6" color="text" display="flex">
              <MDTypography
                component="span"
                variant="h5"
                fontWeight="bold"
                color={percentage.color}
              >
                {percentage.amount}
              </MDTypography>
              &nbsp;{percentage.label}
            </MDTypography>
          </MDBox>
        </>
      }
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
  percentage: {
    color: "success",
    text: "",
    label: "",
  },
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  percentage: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;
