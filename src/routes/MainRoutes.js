// En esta seccion te manda a una pagina pero con los elementos del inicio como el nav y el menu

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

//Others
const OtherAddPatient = Loadable(lazy(() => import('views/others/AddPatien')));
const OtherSp32 = Loadable(lazy(() => import('views/others/SP32')));
const OtherSuscription = Loadable(lazy(() => import('views/others/Suscription')));
const AdminPage = Loadable(lazy(() => import('views/others/AdminPage')));

const HistorialP = Loadable(lazy(() => import('views/others/Historial')));
// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

// Función que verifica si el usuario está autenticado
const isAuthenticated = () => {
  const token = localStorage.getItem('data');
  // Devuelve true si el token está presente
  return token !== null;
};

const MainRoutes = {
  path: '/',
  element: isAuthenticated() ? <MainLayout /> : <Navigate to="/pages/login/login3" />,
  children: [
    {
      path: '/',
      element: isAuthenticated() ? <DashboardDefault /> : <Navigate to="/pages/login/login3" />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: isAuthenticated() ? <DashboardDefault /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: isAuthenticated() ? <UtilsTypography /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: isAuthenticated() ? <UtilsColor /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: isAuthenticated() ? <UtilsShadow /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: isAuthenticated() ? <UtilsTablerIcons /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: isAuthenticated() ? <UtilsMaterialIcons /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    {
      path: 'other',
      children: [
        {
          path: 'add-patient',
          element: isAuthenticated() ? <OtherAddPatient /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    
    {
      path: 'other',
      children: [
        {
          path: 'conectar-dispositivo',
          element: isAuthenticated() ? <OtherSp32 /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    {
      path: 'other',
      children: [
        {
          path: 'page-admin',
          element: isAuthenticated() ? <AdminPage /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    {
      path: 'other',
      children: [
        {
          path: 'suscription',
          element: isAuthenticated() ? <OtherSuscription /> : <Navigate to="/pages/login/login3" />
        }
      ]
    },
    {
      path: 'sample-page',
      element: isAuthenticated() ? <SamplePage /> : <Navigate to="/pages/login/login3" />
    },
    {
      path: 'other',
      children: [
        {
          path: 'historial',
          element: isAuthenticated() ? <HistorialP /> : <Navigate to="/other/Historial" />
        }
      ]
    }
   
  ]
};

export default MainRoutes;
