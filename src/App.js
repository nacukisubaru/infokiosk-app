import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import themes from './themes';
import { ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Mainpage from "./pages/Mainpage";
import ListExcursions from "./pages/ListExcursions";
import DetailExcursionNew from "./pages/DetailExcursionNew";
import UIKitPage from "./pages/UIKit";
import Payment from "./pages/Payment/Payment";
import ReservationSuccess from "./pages/ReservationSuccess";

import Footer from "./components/Footer";
import Header from "./components/Header";
import GreetingPage from "./pages/Greeting";
import MapPage from "./pages/MapPage";
import WhereToGo from "./pages/WhereToGo/WhereToGo";
import WhereToGoList from "./pages/WhereToGo/WhereToGoList";
import EventsList from "./pages/Events/EventsList";
import EventsDetail from "./pages/Events/EventsDetail";
import { useSelector } from "react-redux";
import NotFound from "./pages/404";
import { usePolicy } from "./hooks/usePolicy";
import TechWork from "./pages/TechWork";
import YandexMetrika from "./components/YandexMetrika";

export const useStyles = makeStyles((theme) => ({
  wrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'
  },
  content: {
    flex: '1 0 auto',
    '& > div': {
      height: 'calc(100vh - 192px)'
    },
    '& > div > main': {
      height: '100%',
      display: 'flex',
    flexDirection: 'column'
    }
  },
}));

function App() {
  const titleEx = useSelector(state => state.excursionManager.header);
  const titleGo = useSelector(state => state.catalog.whereToGoHeader);
  const titleEvent = useSelector(state => state.catalog.eventHeader);
  const titleReserv = useSelector(state => state.excursionManager.reservSuccessHeader);
  const card = useSelector(state => state.payment.cardPayment);

  let location = useLocation();

  const classes = useStyles();
  usePolicy();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  });

  const footer = location.pathname === '/' ? true : false;
  const logoLink = location.pathname.includes('payment') ? false : true;
  const techWork = (location.pathname.includes('tech-work')) ? true : false;
  const showBtnHome = (techWork || (card && !logoLink)) ? false : true;

  const onHandleRightClick = (event) => event.preventDefault();

  return (
    <QueryClientProvider client={ queryClient }> 
      <ThemeProvider theme={ themes['violet'] }>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <div className="App" onContextMenu={ onHandleRightClick }>
            {process.env.REACT_APP_YANDEX_METRIKA_ACCOUNT && (
              <YandexMetrika account={Number(process.env.REACT_APP_YANDEX_METRIKA_ACCOUNT)} />
            )}            
            <Helmet>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
            </Helmet>
            <div className={ classes.wrapper }>
              <div className={ classes.content }>
                <Routes>
                  <Route path="/" element={<GreetingPage />} />
                  <Route path="/map" element={<><Header data={{title:'Карта сайта', url: '/map', logoLink}}/><MapPage /></>} />
                  <Route path="/mainpage" element={<><Mainpage /></>} />
                  <Route path="/ui-kit" element={<><Header data={{title:'Ui-kit', url: '/ui-kit', logoLink}}/><UIKitPage /></>} />
                  <Route path="/excursion" element={<><ListExcursions /></>} />
                  <Route path="/excursion/:id" element={<><Header data={{title: titleEx ? titleEx : 'Лучшие экскурсии', url: '/excursion', logoLink}}/><DetailExcursionNew /></>} />  
                  <Route path="/payment" element={<><Header data={{title: titleEx ? titleEx : 'Лучшие экскурсии',  url: '', logoLink}}/><Payment /></>} />
                  <Route path="/reservation-success" element={<><Header data={{title: titleReserv ? titleReserv : 'Лучшие экскурсии',  url: '/excursion', logoLink, payment: true}}/><ReservationSuccess /></>}/>
                  <Route path="/where-to-go" element={<><WhereToGoList /></>}></Route>
                  <Route path="/where-to-go/:id" element={<><Header data={{title: titleGo ? titleGo : 'Куда сходить', url: '/where-to-go', logoLink}}/><WhereToGo></WhereToGo></>}></Route>
                  <Route path="/events" element={<><EventsList /></>}></Route>
                  <Route path="/events/:id" element={<><Header data={{title: titleEvent ? titleEvent : 'События', url: '/events', logoLink}}/><EventsDetail /></>}></Route>
                  <Route path="/tech-work" element={<TechWork />} />
                  <Route path="*" element={<><Header data={{title: '', url: '', logoLink}}/><NotFound /></>}></Route>
                </Routes>
              </div>
              <Footer props={{ footer, location: location.pathname, showBtnHome }} />
            </div>
          </div>
        </StyledEngineProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
