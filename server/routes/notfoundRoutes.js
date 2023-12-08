const React = require('react');
const { BrowserRouter, Route, Switch } = require('react-router-dom');
const Home = require('../../client/src/pages/Home');
const NotFound = require('../../client/src/pages/NotFound');

const notFoundRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

module.exports = notFoundRoutes;