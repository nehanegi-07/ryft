import { useState, useEffect, useMemo } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from 'assets/theme';
import themeDark from 'assets/theme-dark';
import AdminLogin from 'layouts/authentication/sign-in/admin';
import UserLogin from 'layouts/authentication/sign-in/user';
import SignUp from 'layouts/authentication/sign-up';
import CreditCardDetails from 'layouts/authentication/credit-detail-in';
// Material Dashboard 2 PRO React contexts
import { useMaterialUIController } from 'context';
// Images
import { AllRoutes } from 'components/Routes/AllRoutes';
import ForgotPassword from 'layouts/authentication/forgotPassword/user';
import BusinessDetails from 'layouts/authentication/sign-up/bussiness-details';
import LeadDetails from 'layouts/authentication/sign-up/lead-detail';


export default function App() {
  const [controller, dispatch] = useMaterialUIController();

  const user = JSON.parse(localStorage.getItem('user'));
  const usertoken= JSON.parse(localStorage.getItem('user'));
  const {
    direction,
    darkMode,
  } = controller;

  // Setting page scroll to 0 when changing the route

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);

  return (

    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Switch>
        <Route
          exact
          path="/signup/creditcard"
          render={() => <CreditCardDetails />}
        />
        <Route exact path="/businessdetails" render={() => <BusinessDetails />} />
        <Route exact path="/leaddetails" render={() => <LeadDetails/>} />
        <Route path="/user/login" render={() => <UserLogin />} />
        <Route path="/user/forgetpassword" render={() => <ForgotPassword />} />
        <Route path="/admin/login" render={() => <AdminLogin />} />
        <Route path="/signup" render={() => <SignUp />} />

        {user && <AllRoutes />}
        {!usertoken && <Redirect to={{ pathname: '/user/login' }} push />}

      </Switch>

    </ThemeProvider>


  );

}
