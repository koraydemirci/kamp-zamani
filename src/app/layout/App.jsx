import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';

import AboutPage from '../../features/about/AboutPage';
import HomePage from '../../features/home/HomePage';
import NavBar from '../../features/nav/NavBar/NavBar';
import CampingSiteForm from '../../features/campingSite/CampingSiteForm/CampingSiteForm';
import CampingSitePage from '../../features/campingSite/CampingSitePage/CampingSitePage';
import CampingSitesPage from '../../features/campingSite/CampingSitesPage/CampingSitesPage';
import CampingEventForm from '../../features/campingEvent/CampingEventForm/CampingEventForm';
import CampingEventPage from '../../features/campingEvent/CampingEventPage/CampingEventPage';
import CampingEventsPage from '../../features/campingEvent/CampingEventsPage/CampingEventsPage';
import PeoplePage from '../../features/user/PeoplePage/PeoplePage';
import Settings from '../../features/user/Settings/Settings';
import UserProfilePage from '../../features/user/UserProfilePage/UserProfilePage';
import ModalManager from '../../features/modals/ModalManager';
import ScrollToTop from '../common/util/ScrollToTop';

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
                        path="/createCampingSite"
                        component={CampingSiteForm}
                      />
                      <Route
                        path="/editCampingSite"
                        component={CampingSiteForm}
                      />
                      <Route
                        path="/campingSites/:id"
                        component={CampingSitePage}
                      />
                      <Route
                        path="/campingSites"
                        component={CampingSitesPage}
                      />
                      <Route
                        path="/createCampingEvent"
                        component={CampingEventForm}
                      />
                      <Route
                        path="/manageCampingEvent/:id"
                        component={CampingEventForm}
                      />
                      <Route
                        path="/campingEvents/:id"
                        component={CampingEventPage}
                      />
                      <Route
                        path="/campingEvents"
                        component={CampingEventsPage}
                      />
                      <Route path="/people" component={PeoplePage} />
                      <Route path="/profile/:id" component={UserProfilePage} />
                      <Route path="/settings" component={Settings} />
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
