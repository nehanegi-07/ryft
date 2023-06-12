import { useEffect, useState } from 'react';

// react-router-dom components
import { useLocation, NavLink, useHistory } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';
import BusinessIcon from '@mui/icons-material/Business';

// @mui material components
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import Icon from '@mui/material/Icon';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 PRO React examples
import SidenavCollapse from 'components/Sidenav/SidenavCollapse';
import SidenavList from 'components/Sidenav/SidenavList';
import SidenavItem from 'components/Sidenav/SidenavItem';

// Custom styles for the Sidenav
import SidenavRoot from 'components/Sidenav/SidenavRoot';
import logo from 'assets/images/main-logo/logo-white.png';

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from 'context';
import { useUser } from 'context';

function Sidenav({ color, brand, brandName, routes, visible, ...rest }) {
  const userRole = JSON.parse(localStorage.getItem('user'));
  const { user } = useUser();
  const navigate = useHistory();
  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentSidenav, whiteSidenav, darkMode } =
    controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split('/').slice(1)[0];
  const items = pathname.split('/').slice(1);
  const itemParentName = items[1];
  const itemName = items[items.length - 1];

  let textColor = 'white';

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = 'dark';
  } else if (whiteSidenav && darkMode) {
    textColor = 'inherit';
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    setOpenCollapse(collapseName);
    setOpenNestedCollapse(itemParentName);
  }, [collapseName, itemParentName]);

  const logout = () => {
    window.localStorage.clear();
    window.location.assign(window.location);
  };

  const profile = () => {
    if (userRole.role === 'admin') {
      navigate.push(`/admin/profile`);
    } else {
      navigate.push(`/user/profile`);
    }
  };

  const business = () => {
    navigate.push(`/user/businessprofile`);
  };

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : whiteSidenav
      );
    }

    /**
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener('resize', handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleMiniSidenav);
  }, [dispatch, location, transparentSidenav, whiteSidenav]);

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, href }) =>
      href ? (
        <Link
          key={key}
          to={href}
          // target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: 'none' }}
        >
          <SidenavItem name={name} nested />
        </Link>
      ) : (
        <NavLink to={route} key={key} sx={{ textDecoration: 'none' }}>
          <SidenavItem name={name} active={route === pathname} nested />
        </NavLink>
      )
    );

    return template;
  };
  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            color={color}
            name={name}
            active={key === itemParentName ? 'isParent' : false}
            open={openNestedCollapse === key}
            onClick={({ currentTarget }) =>
              openNestedCollapse === key &&
              currentTarget.classList.contains('MuiListItem-root')
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(key)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link
            to={href}
            key={key}
            // target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: 'none' }}
          >
            <SidenavItem color={color} name={name} active={key === itemName} />
          </Link>
        ) : (
          <NavLink to={route} key={key} sx={{ textDecoration: 'none' }}>
            <SidenavItem color={color} name={name} active={key === itemName} />
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === 'collapse') {
        if (href) {
          returnValue = (
            <>
              <Link
                to={href}
                key={key}
                // target="_blank"
                rel="noreferrer"
                sx={{ textDecoration: 'none' }}
              >
                <SidenavCollapse
                  name={name}
                  icon={icon}
                  active={key === collapseName}
                  noCollapse={noCollapse}
                />
              </Link>
            </>
          );
        } else if (noCollapse && route) {
          returnValue = (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                name={name}
                icon={icon}
                noCollapse={noCollapse}
                active={key === collapseName}
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </NavLink>
          );
        } else {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={name}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() =>
                openCollapse === key
                  ? setOpenCollapse(false)
                  : setOpenCollapse(key)
              }
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
      } else if (type === 'title') {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === 'divider') {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: 'block', xl: 'none' }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: 'pointer' }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: 'bold' }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          <MDBox component="img" src={logo} alt="Brand" width="100%" />
          {/* <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          >

          </MDBox> */}
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <MDBox>{renderRoutes}</MDBox>

        <MDBox
          sx={{
            mb: '42px',
            height: miniSidenav
              ? '40px'
              : userRole.role === 'admin'
              ? '180px'
              : '200px',
            display: 'flex',
            flexDirection: 'column',
            pl: 3,
            ml: 1,
          }}
        >
          {miniSidenav ? null : (
            <MDBox
              sx={{
                mb: 4,
                pl: 3,
                background: '#343435',
                mr: 3,
                pt: 2,
                pb: 2,
                borderRadius: '10px',
              }}
            >
              <MDTypography
                color="white"
                fontSize="14px"
                display="flex"
                sx={{ width: '100%' }}
                // onClick={logout}
              >
                {miniSidenav
                  ? null
                  : userRole.role === 'admin'
                  ? 'Admin'
                  : user?.firstName
                  ? user?.firstName + ' ' + user?.lastName
                  : userRole?.name}
              </MDTypography>

              <MDTypography
                fontSize="14px"
                color="white"
                display="flex"
                sx={{ width: '100%' }}
                // onClick={logout}
              >
                {miniSidenav ? null : userRole.role === 'admin' ? (
                  user?.firstName ? (
                    user?.firstName + ' ' + user?.lastName
                  ) : (
                    userRole?.name
                  )
                ) : (
                  <MDBox
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                      pr: 2,
                      alignItems: 'center',
                    }}
                  >
                    <MDTypography
                      fontSize="14px"
                      color="info"
                      display="flex"
                      sx={{ width: '100%' }}
                    >
                      £{user?.credits ?? 0} credit
                    </MDTypography>
                    <StarIcon color="info" />
                  </MDBox>
                )}
              </MDTypography>
            </MDBox>
          )}

          <MDTypography
            fontSize="14px"
            color="white"
            display="flex"
            gap={2}
            sx={{ width: '100%', cursor: 'pointer' }}
            onClick={profile}
          >
            <PersonIcon />
            {miniSidenav ? null : 'Your Profile'}
          </MDTypography>

          {userRole.role === 'admin' ? null : (
            <MDTypography
              fontSize="14px"
              color="white"
              display="flex"
              gap={2}
              sx={{ width: '100%', cursor: 'pointer', mt: 1 }}
              onClick={business}
            >
              <BusinessIcon />
              {miniSidenav ? null : 'Bussiness Profile'}
            </MDTypography>
          )}

          <MDTypography
            fontSize="14px"
            color="white"
            display="flex"
            gap={2}
            alignItems="center"
            sx={{
              position: 'absolute',
              bottom: 2,
              width: '100%',
              mb: 5,
              cursor: 'pointer',
            }}
            onClick={logout}
          >
            <LogoutIcon mt={2} />
            {miniSidenav ? null : 'Logout'}
          </MDTypography>
        </MDBox>
      </List>
    </SidenavRoot>
  );
}

Sidenav.defaultProps = {
  color: 'info',
  brand: '',
};

Sidenav.propTypes = {
  color: PropTypes.oneOf([
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
    'dark',
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  visible: PropTypes.bool,
};

export default Sidenav;
