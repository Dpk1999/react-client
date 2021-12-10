import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
// import CssBaseline from '@mui/material/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import {
  InputDemo, TextFieldDemo, Wrapper, ChildrenDemo, NoMatch, Trainee,
} from './pages';
import AuthRoute from './routes/AuthRoute';
import { PrivateRoute } from './routes';
import TraineeDetail from './pages/Trainee';
import SnackBarProvider from './contexts/SnackBarProvider';
import apolloClient from './lib/apollo-client';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SnackBarProvider>
          <ApolloProvider client={apolloClient}>
            <Switch>
              <AuthRoute exact path="/" component={Wrapper} />
              <AuthRoute exact path="/login" component={Wrapper} />
              <PrivateRoute token={localStorage.getItem('token')} exact path="/trainee" component={Trainee} />
              <PrivateRoute token={localStorage.getItem('token')} exact path="/trainee/:id" component={TraineeDetail} />
              <PrivateRoute token={localStorage.getItem('token')} exact path="/childrendemo" component={ChildrenDemo} />
              <PrivateRoute token={localStorage.getItem('token')} exact path="/textfielddemo" component={TextFieldDemo} />
              <PrivateRoute token={localStorage.getItem('token')} exact path="/inputdemo" component={InputDemo} />
              <PrivateRoute token={localStorage.getItem('token')} exact path="*" component={NoMatch} />
              <Redirect to="/login" />
            </Switch>
          </ApolloProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
