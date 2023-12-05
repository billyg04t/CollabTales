// App.js or your main routing component
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../../client/src/pages/Home';
import Story from '../../client/src/pages/Story'; 
import NotFound from '../../client/src/pages/NotFound';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/vote/:id" component={Vote} />
        <Route exact path="/matchup" component={CreateContribution} />
        
        {/* Route for creating a story */}
        <Route exact path="/story" component={Story} />

        {/* Catch-all route for unmatched paths */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default storyRoutes;