import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { SnackBarProvider } from './contexts';
import {
  Trainee, InputDemo, TextFieldDemo, Login, ChildrenDemo, NoMatch,
} from './pages';
import AuthRoute from './routes/AuthRoute';
import { PrivateRoute } from './routes';
import TraineeDetail from './pages/Trainee/TraineeDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SnackBarProvider>

          <Switch>
            <AuthRoute exact path="/" component={Login} />
            <AuthRoute exact path="/login" component={Login} />
            <PrivateRoute token={localStorage.getItem('token')} exact path="/trainee" component={Trainee} />
            <PrivateRoute token={localStorage.getItem('token')} exact path="/trainee/:id" component={TraineeDetail} />
            <PrivateRoute token={localStorage.getItem('token')} exact path="/childrendemo" component={ChildrenDemo} />
            <PrivateRoute token={localStorage.getItem('token')} exact path="/textfielddemo" component={TextFieldDemo} />
            <PrivateRoute token={localStorage.getItem('token')} exact path="/inputdemo" component={InputDemo} />
            <PrivateRoute token={localStorage.getItem('token')} exact path="*" component={NoMatch} />
            <Redirect to="/login" />
          </Switch>
        </SnackBarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
