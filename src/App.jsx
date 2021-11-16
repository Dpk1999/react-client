import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Trainee from './pages/Trainee/Trainee';
import TextFieldDemo from './pages/TextFieldDemo';
import InputDemo from './pages/InputDemo/InputDemo';
import ChildrenDemo from './pages/ChildrenDemo';
import Login from './pages/Login';
import { AuthRoute, PrivateRoute } from './routes';
import { NoMatch } from './pages';
import TraineeDetail from './pages/Trainee/TraineeDetail';
import SnackBarProvider from './contexts/SnackBarProvider';

const App = () => (
  <>
    <CssBaseline />
    <BrowserRouter>
      <SnackBarProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Trainee} />
          <PrivateRoute exact path="/Trainee" component={Trainee} />
          <PrivateRoute exact path="/TextFieldDemo" component={TextFieldDemo} />
          <PrivateRoute exact path="/InputDemo" component={InputDemo} />
          <PrivateRoute exact path="/ChildrenDemo" component={ChildrenDemo} />
          <AuthRoute exact path="/Login" component={Login} />
          <PrivateRoute path="/trainee/:id" component={TraineeDetail} />
          <PrivateRoute component={NoMatch} />
          <Redirect to="/login" />
        </Switch>
      </SnackBarProvider>
    </BrowserRouter>
  </>
);

export default App;
