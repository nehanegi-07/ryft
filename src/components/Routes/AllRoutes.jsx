import React, { useState } from 'react';
import MDAlert from 'components/MDAlert';
import ResetPassword from 'layouts/resetPassword';
import DashboardV2 from 'layouts/dashboards/analytics';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import UserProfile from 'layouts/profile/user';
import AdminHomePage from 'layouts/dashboards/admin';
import CreditCardDetails from 'layouts/authentication/credit-detail-in';
import BusinessDetails from 'layouts/authentication/sign-up/bussiness-details/index';
import BusinessIcon from '@mui/icons-material/Business';
import UsersList from 'layouts/admin/userList';
import UserLeadsTable from 'layouts/user/leadsTable';
import TransactionsTable from 'layouts/user/transactions';
import Sidenav from 'components/Sidenav';
import Settings from 'layouts/admin/settings';
import Billing from 'layouts/user/billing';
import AdminProfile from 'layouts/profile/admin';
import UserDetailEdit from 'layouts/admin/userDetailEdit';
import DashboardNavbar from 'components/Navbars/DashboardNavbar';
import Footer from 'components/Footer';
import NotificationItem from 'components/Items/NotificationItem';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';
import { useMaterialUIController, setMiniSidenav } from 'context';
import brandWhite from 'assets/images/logo-ct.png';
import brandDark from 'assets/images/logo-ct-dark.png';
import { userRoutes, adminRoutes, invitedUser } from 'routes';
import MDBox from 'components/MDBox';
import { useUser, useNavbar } from 'context';
import LeadDetails from 'layouts/authentication/sign-up/lead-detail';
import FaqPage from 'layouts/user/faq';
import UserBusinessProfile from 'layouts/user/BusinessDetail';
import UserLeadsForAdmin from 'layouts/admin/leadsTable';
import TermsandConditions from 'layouts/user/Terms&Conditions';
import ChangeLeadsStatusByAdmin from 'layouts/admin/leadsStatusTable';
import EditorForTermsandCondition from 'layouts/admin/TermsandConditionEditor';
import EditorForFaq from 'layouts/admin/faqEditor';
import FreeLinks from 'layouts/admin/freeLink';
import NotificationSetting from 'layouts/user/notificationSettings';

const AllRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  const {
    miniSidenav,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const history = useHistory();
  const { user: credit } = useUser();
  const { showNavbar } = useNavbar();
  // console.log("usercredit", credit)
  const toProfileChange = () => {
    user.role === 'user' || user.role === 'invited'
      ? history.push('/user/profile')
      : history.push('/admin/profile');
  };

  const toBusinessProfileChange = () => {
    history.push('/user/businessprofile');
  };

  const toPasswordChange = () => {
    user.role === 'user' || user.role === 'invited'
      ? history.push('/user/resetpassword')
      : history.push('/admin/resetpassword');
  };

  const logout = () => {
    window.localStorage.clear();
    window.location.assign(window.location);
  };

  const currentRole = () => {
    // user?.role === 'user' ? userRoutes : adminRoutes
    if (user.role === 'user') {
      return userRoutes;
    } else if (user.role === 'invited') {
      return invitedUser;
    } else {
      return adminRoutes;
    }
  };

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        icon={<Icon>account_circle</Icon>}
        title="Profile"
        onClick={toProfileChange}
      />

      {user.role === 'user' ? (
        <NotificationItem
          icon={<BusinessIcon />}
          title="Business Profile"
          onClick={toBusinessProfileChange}
        />
      ) : null}

      <NotificationItem
        icon={<Icon>password</Icon>}
        title="Reset Password"
        onClick={toPasswordChange}
      />

      <NotificationItem
        icon={<Icon>logout</Icon>}
        title="logout"
        onClick={logout}
      />
    </Menu>
  );

  const getRedirects = () => {
    if (user.role === 'admin') {
      return <Redirect from="/" to="/admin/dashboard" />;
    } else if (user.role === 'user') {
      return <Redirect from="/" to="/dashboard" />;
    }
  };

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  return (
    <MDBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: 'relative',
        [breakpoints.up('xl')]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(['margin-left', 'margin-right'], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {credit?.credits === 0 &&
      user?.role !== 'admin' &&
      user?.role !== 'invited' ? (
        <MDAlert color="error" dismissible>
          {' '}
          You have insufficient credit. Leads will be paused until you have
          topped up.
        </MDAlert>
      ) : (
        ''
      )}

      {showNavbar ? (
        <>
          <DashboardNavbar
            title={
              location?.pathname === '/user/addcreditcard' ? 'Billing' : 'Home'
            }
            renderMenu={renderMenu}
            handleOpenMenu={handleOpenMenu}
          />
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            routes={currentRole()}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      ) : null}

      <Switch>
        <Route exact path="/signup/creditcard" component={CreditCardDetails} />
        <Route exact path="/businessdetails" component={BusinessDetails} />
        <Route exact path="/leaddeta" component={LeadDetails} />
        <AuthenticatedRoute
          exact
          path="/user/leads"
          component={UserLeadsTable}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/user/faqs"
          component={FaqPage}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/admin/userlist"
          component={UsersList}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/admin/leads"
          component={UserLeadsForAdmin}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/admin/leadsstatus"
          component={ChangeLeadsStatusByAdmin}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/user/transactions"
          component={TransactionsTable}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/admin/settings"
          component={Settings}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/userupdate/:id"
          component={UserDetailEdit}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/user/resetpassword"
          component={ResetPassword}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/admin/resetpassword"
          component={ResetPassword}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/user/profile"
          component={UserProfile}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/user/businessprofile"
          component={UserBusinessProfile}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/user/notificationsetting"
          component={NotificationSetting}
          user={user}
        />

        <AuthenticatedRoute
          exact
          path="/admin/profile"
          component={AdminProfile}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/admin/termsandcondition"
          component={EditorForTermsandCondition}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/admin/faqs"
          component={EditorForFaq}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/user/terms"
          component={TermsandConditions}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/dashboard"
          component={DashboardV2}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/admin/dashboard"
          component={AdminHomePage}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/admin/freelinks"
          component={FreeLinks}
          user={user}
        />
        <AuthenticatedRoute
          exact
          path="/user/billing"
          component={Billing}
          user={user}
        />
        {getRedirects()}
        <Route path="*" element={<Redirect to="/" push />} />
      </Switch>

      <Footer />
    </MDBox>
  );
};

export { AllRoutes };
