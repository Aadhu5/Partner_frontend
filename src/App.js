import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import New_request from './pages/New_request';
import List_request from './pages/List_request';
import Show_request from './pages/Show_request';
import Accept_request from './pages/Accept_request';
import Gen_request from './pages/Gen_request';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App"></div>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/Dashboard' exact component={Dashboard} />
        <Route path='/New_request' exact component={New_request} />
        <Route path='/List_request' exact component={List_request} />
        <Route path='/Show_request' exact component={Show_request} />
        <Route path='/Accept_request' exact component={Accept_request} />
        <Route path='/Gen_request' exact component={Gen_request} /> 
      </Switch>
    </Router>
  );
}

export default App;
