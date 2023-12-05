import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './client/src/pages/Home';
import Vote from './client/src/pages/Vote'; // Adjust the path accordingly
import NotFound from './client/src/pages/NotFound';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vote/:id" component={Vote} />

        {/* Route for contributing to the story */}
        <Route exact path="/matchup" component={CreateContribution} />

        {/* Catch-all route for unmatched paths */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;