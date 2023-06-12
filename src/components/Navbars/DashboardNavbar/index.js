

import { useState, useEffect } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { useUser } from "context"
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu,
} from "components/Navbars/DashboardNavbar/styles";

import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
} from "context";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

function DashboardNavbar({ absolute, light, isMini, title, handleOpenMenu, renderMenu }) {
  const { user } = useUser()
  const credit = user?.credits || 0
  // console.log("user",user)
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, darkMode } = controller;
  const userRole = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {

    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /**
     The event listener that's calling the handleTransparentNavbar function when
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);

  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <MDTypography variant="h4" fontWeight="medium" color="secondary" component={NavLink} to="/" >
            {title}
          </MDTypography>

          <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size="small" disableRipple>
            <Icon fontSize="medium" sx={iconsStyle}>
              {miniSidenav ? "menu_open" : "menu"}
            </Icon>
          </IconButton>
        </MDBox>
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })} >
            <MDBox pr={""} sx={{ display: "flex", gap: 1 }}>
              {userRole?.role !== "admin" ?
                <MDButton variant="text" color="info" sx={{ p: "10px" }} >
                  <MDBadge color="info" badgeContent={`Credit: £${credit}`} container />
                </MDButton>

                // <MDTypography variant="h6" fontWeight="medium" color="secondary">
                //   £{user?.credits}
                // </MDTypography>
                : null
              }
              {userRole?.role === "user" || userRole?.role === "invited"?
              <MDTypography variant="h6" fontWeight="medium" color="secondary" sx={{ pt: "10px" }}>
                {user?.businessDetailsId?.businessName?user?.businessDetailsId?.businessName:userRole.businessName}

              </MDTypography> :
              <MDTypography variant="h6" fontWeight="medium" color="secondary">
                {user?.firstName?user?.firstName +" " +user?.lastName:userRole.name}
              </MDTypography>}

            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>

              {/* <Link to="/authentication/sign-in/basic"> */}
              <IconButton sx={navbarIconButton} size="small"
                disableRipple aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}>
                <Icon sx={iconsStyle} >account_circle</Icon>
              </IconButton>
              {/* </Link> */}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu_open" : "menu"}
                </Icon>
              </IconButton>
              {renderMenu ? renderMenu() : ""}
            </MDBox>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
