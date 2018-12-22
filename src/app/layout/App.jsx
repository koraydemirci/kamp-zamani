import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import AboutPage from '../../features/about/AboutPage';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar/NavBar';
import PlaceForm from '../../features/place/PlaceForm/PlaceForm';
import PlacePage from '../../features/place/PlacePage/PlacePage';
import PlacesPage from '../../features/place/PlacesPage/PlacesPage';
import EventForm from '../../features/event/EventForm/EventForm';
import EventPage from '../../features/event/EventPage/EventPage';
import EventsPage from '../../features/event/EventsPage/EventsPage';
import PeoplePage from '../../features/user/PeoplePage/PeoplePage';
import SettingsPage from '../../features/user/SettingsPage/SettingsPage';
import UserProfilePage from '../../features/user/UserProfilePage/UserProfilePage';
import ModalManager from '../../features/modals/ModalManager';
import ScrollToTop from '../common/util/ScrollToTop';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { UserIsAuthenticated } from '../../features/auth/authWrapper';
import NotFound from './NotFound';
import ResetPasswordPage from '../../features/auth/ResetPasswordPage/ResetpasswordPage';
import EventFormFromPlace from '../../features/event/EventForm/EventFormFromPlace';
import Sidebar from '../../features/nav/NavBar/Sidebar';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <ModalManager />
          <ReduxToastr position="bottom-right" />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/(.+)"
              render={() => (
                <div>
                  <Sidebar />
                  <NavBar />
                  <Container className="main">
                    <Switch>
                      <Route path="/about" component={AboutPage} />
                      <Route
                        path="/createPlace"
                        component={UserIsAuthenticated(PlaceForm)}
                      />
                      <Route
                        path="/editPlace/:id"
                        component={UserIsAuthenticated(PlaceForm)}
                      />
                      <Route path="/places/:id" component={PlacePage} />
                      <Route path="/places" component={PlacesPage} />
                      <Route
                        path="/createEvent"
                        component={UserIsAuthenticated(EventForm)}
                      />
                      <Route
                        path="/createEventfromPlace/:id"
                        component={EventFormFromPlace}
                      />
                      <Route
                        path="/manageEvent/:id"
                        component={UserIsAuthenticated(EventForm)}
                      />
                      <Route path="/events/:id" component={EventPage} />
                      <Route path="/events" component={EventsPage} />
                      <Route
                        path="/people"
                        component={UserIsAuthenticated(PeoplePage)}
                      />
                      <Route
                        path="/profile/:id"
                        component={UserIsAuthenticated(UserProfilePage)}
                      />
                      <Route
                        path="/settings"
                        component={UserIsAuthenticated(SettingsPage)}
                      />
                      <Route
                        path="/resetPassword"
                        component={ResetPasswordPage}
                      />
                      <Route path="/error" component={NotFound} />
                      <Route component={NotFound} />
                    </Switch>
                  </Container>
                </div>
              )}
            />
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

export default App;
