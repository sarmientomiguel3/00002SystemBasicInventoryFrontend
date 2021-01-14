import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';

import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
//import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
//import ProductListView from 'src/views/product/ProductListView';
//import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';


import { getToken } from 'src/utils/Common';

const App = () => {
//  const routing = useRoutes(routes);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="login" element={getToken() ? <Navigate to="/app/account" /> : <LoginView />} />
            <Route path="404" element={<NotFoundView />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
          <Route path="app" element={getToken() ? <DashboardLayout /> : <Navigate to="/login" /> }>
            <Route path="account" element={<AccountView /> && <Navigate to="/app/account" />} />
            <Route path="customers" element={<CustomerListView />} />
            <Route path="settings" element={<SettingsView />} />
            <Route path="*" element={<Navigate to="/404" />} />
          </Route>
          
        </Routes>
    </ThemeProvider>
  );
};

export default App;

