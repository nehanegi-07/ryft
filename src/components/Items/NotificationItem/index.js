

import { forwardRef } from "react";


// @mui material components
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// custom styles for the NotificationItem
import menuItem from "components/Items/NotificationItem/styles";

const NotificationItem = forwardRef(({ icon, title,onClick, ...rest }, ref) => (
  <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)} onClick={onClick}>
    <MDBox component={Link} py={0.5} display="flex" alignItems="center" lineHeight={1}>
      <MDTypography variant="body1" color="secondary" lineHeight={0.75}>
        {icon}
      </MDTypography>
      <MDTypography variant="button" fontWeight="regular" sx={{ ml: 1 }}>
        {title}
      </MDTypography>
    </MDBox>
  </MenuItem>
));




export default NotificationItem;
