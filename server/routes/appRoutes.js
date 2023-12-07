const React = require('react');
const { Route, Routes } = require('react-router-dom');
const Home = require('../../client/src/pages/Home');
const Story = require('../../client/src/pages/Story');
const User = require('../../client/src/pages/User');
const NotFound = require('../../client/src/pages/NotFound');

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/story" element={<Story />} />
      <Route path="/user/:userId" element={<User />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

module.exports = AppRoutes;