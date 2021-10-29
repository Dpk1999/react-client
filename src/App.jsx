import React from 'react';
// import { ThemeProvider } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { Switch, BrowserRouter } from 'react-router-dom';
// import theme from './theme';
import Trainee from './pages/Trainee/Trainee';
import TextFieldDemo from './pages/TextFieldDemo';
import InputDemo from './pages/InputDemo/InputDemo';
import ChildrenDemo from './pages/ChildrenDemo';
import Login from './pages/Login';
import { AuthRoute, PrivateRoute } from './routes';
import { NoMatch } from './pages';

const App = () => (
  <>
    <CssBaseline />
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/" component={Trainee} />
        <PrivateRoute exact path="/Trainee" component={Trainee} />
        <PrivateRoute exact path="/TextFieldDemo" component={TextFieldDemo} />
        <PrivateRoute exact path="/InputDemo" component={InputDemo} />
        <PrivateRoute exact path="/ChildrenDemo" component={ChildrenDemo} />
        <AuthRoute exact path="/Login" component={Login} />
        <PrivateRoute component={NoMatch} />
      </Switch>

    </BrowserRouter>
  </>
);

export default App;
