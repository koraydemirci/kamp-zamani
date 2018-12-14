import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import AboutPage from '../../features/about/AboutPage';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar/NavBar';
import CampingEventForm from '../../features/campingEvent/CampingEventForm/CampingEventForm';
import CampingEventPage from '../../features/campingEvent/CampingEventPage/CampingEventPage';
import CampingEventsPage from '../../features/campingEvent/CampingEventsPage/CampingEventsPage';
import PeoplePage from '../../features/user/PeoplePage/PeoplePage';
import SettingsPage from '../../features/user/SettingsPage/SettingsPage';
import UserProfilePage from '../../features/user/UserProfilePage/UserProfilePage';
import ModalManager from '../../features/modals/ModalManager';
import ScrollToTop from '../common/util/ScrollToTop';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { UserIsAuthenticated } from '../../features/auth/authWrapper';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <ModalManager />
          <ReduxToastr
            position="bottom-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route
              path="/(.+)"
              render={() => (
                <div>
                  <NavBar />
                  <Container className="main">
                    <Switch>
                      <Route path="/about" component={AboutPage} />
                      <Route
                        path="/createCampingEvent"
                        component={UserIsAuthenticated(CampingEventForm)}
                      />
                      <Route
                        path="/manageCampingEvent/:id"
                        component={UserIsAuthenticated(CampingEventForm)}
                      />
                      <Route
                        path="/campingEvents/:id"
                        component={CampingEventPage}
                      />
                      <Route
                        path="/campingEvents"
                        component={CampingEventsPage}
                      />
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
