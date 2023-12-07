const React = require('react');
const { BrowserRouter, Route, Switch } = require('react-router-dom');
const Home = require('../../client/src/pages/Home');
const Story = require('../../client/src/pages/Story');
const User = require('../../client/src/pages/User');
const NotFound = require('../../client/src/pages/NotFound');

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* Uncomment the route below if needed */}
        {/* <Route exact path="/user/:userId" component={UserProfile} /> */}
        <Route exact path="/story/:storyId" component={Story} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

module.exports = UserRoutes;