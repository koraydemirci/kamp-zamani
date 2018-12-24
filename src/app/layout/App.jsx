import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxToastr from 'react-redux-toastr';
import Loadable from 'react-loadable';

import LoadingComponent from '../../app/layout/LoadingComponent';
import ScrollToTop from '../common/util/ScrollToTop';
import { UserIsAuthenticated } from '../../features/auth/authWrapper';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

const AsyncHomePage = Loadable({
  loader: () => import('../../features/home/HomePage'),
  loading: LoadingComponent
});
const AsyncEventsPage = Loadable({
  loader: () => import('../../features/event/EventsPage/EventsPage'),
  loading: LoadingComponent
});
const AsyncNavBar = Loadable({
  loader: () => import('../../features/nav/NavBar/NavBar'),
  loading: LoadingComponent
});
const AsyncEventForm = Loadable({
  loader: () => import('../../features/event/EventForm/EventForm'),
  loading: LoadingComponent
});
const AsyncSettingsPage = Loadable({
  loader: () => import('../../features/user/SettingsPage/SettingsPage'),
  loading: LoadingComponent
});
const AsyncUserProfilePage = Loadable({
  loader: () => import('../../features/user/UserProfilePage/UserProfilePage'),
  loading: LoadingComponent
});
const AsyncPeoplePage = Loadable({
  loader: () => import('../../features/user/PeoplePage/PeoplePage'),
  loading: LoadingComponent
});
const AsyncEventPage = Loadable({
  loader: () => import('../../features/event/EventPage/EventPage'),
  loading: LoadingComponent
});
const AsyncModalManager = Loadable({
  loader: () => import('../../features/modals/ModalManager'),
  loading: LoadingComponent
});

const AsyncSidebar = Loadable({
  loader: () => import('../../features/nav/NavBar/Sidebar'),
  loading: LoadingComponent
});

const AsyncEventFormFromPlace = Loadable({
  loader: () => import('../../features/event/EventForm/EventFormFromPlace'),
  loading: LoadingComponent
});

const AsyncResetPasswordPage = Loadable({
  loader: () =>
    import('../../features/auth/ResetPasswordPage/ResetPasswordPage'),
  loading: LoadingComponent
});

const AsyncAboutPage = Loadable({
  loader: () => import('../../features/about/AboutPage'),
  loading: LoadingComponent
});
const AsyncPlaceForm = Loadable({
  loader: () => import('../../features/place/PlaceForm/PlaceForm'),
  loading: LoadingComponent
});

const AsyncPlacePage = Loadable({
  loader: () => import('../../features/place/PlacePage/PlacePage'),
  loading: LoadingComponent
});

const AsyncPlacesPage = Loadable({
  loader: () => import('../../features/place/PlacesPage/PlacesPage'),
  loading: LoadingComponent
});

const AsyncNotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: LoadingComponent
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ScrollToTop>
          <AsyncModalManager />
          <ReduxToastr
            position="bottom-right"
            onfirmOptions={{
              okText: 'Devam',
              cancelText: 'İptal'
            }}
          />
          <Switch>
            <Route exact path="/" component={AsyncHomePage} />
            <Route
              path="/(.+)"
              render={() => (
                <div>
                  <AsyncSidebar />
                  <AsyncNavBar />
                  <Container className="main">
                    <Switch>
                      <Route path="/about" component={AsyncAboutPage} />
                      <Route
                        path="/createPlace"
                        component={UserIsAuthenticated(AsyncPlaceForm)}
                      />
                      <Route
                        path="/editPlace/:id"
                        component={UserIsAuthenticated(AsyncPlaceForm)}
                      />
                      <Route path="/places/:id" component={AsyncPlacePage} />
                      <Route path="/places" component={AsyncPlacesPage} />
                      <Route
                        path="/createEvent"
                        component={UserIsAuthenticated(AsyncEventForm)}
                      />
                      <Route
                        path="/createEventfromPlace/:id"
                        component={AsyncEventFormFromPlace}
                      />
                      <Route
                        path="/manageEvent/:id"
                        component={UserIsAuthenticated(AsyncEventForm)}
                      />
                      <Route path="/events/:id" component={AsyncEventPage} />
                      <Route path="/events" component={AsyncEventsPage} />
                      <Route
                        path="/people"
                        component={UserIsAuthenticated(AsyncPeoplePage)}
                      />
                      <Route
                        path="/profile/:id"
                        component={UserIsAuthenticated(AsyncUserProfilePage)}
                      />
                      <Route
                        path="/settings"
                        component={UserIsAuthenticated(AsyncSettingsPage)}
                      />
                      <Route
                        path="/resetPassword"
                        component={AsyncResetPasswordPage}
                      />
                      <Route path="/error" component={AsyncNotFound} />
                      <Route component={AsyncNotFound} />
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
