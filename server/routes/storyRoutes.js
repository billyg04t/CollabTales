const React = require('react');
const { BrowserRouter, Route, Switch } = require('react-router-dom');
const Home = require('../../client/src/pages/Home');
const Story = require('../../client/src/pages/Story');
const NotFound = require('../../client/src/pages/NotFound');

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/matchup" component={CreateContribution} />
        <Route exact path="/story" component={Story} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

module.exports = storyRoutes;