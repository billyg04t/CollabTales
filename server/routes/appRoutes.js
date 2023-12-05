// AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './client/src/pages/Home';
import Vote from './client/src/pages/Vote';
import Story from './client/src/pages/Story';
import User from './client/src/pages/User';
import NotFound from './client/src/pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vote/:id" element={<Vote />} />
      <Route path="/matchup" element={<CreateContribution />} />
      <Route path="/story" element={<Story />} />
      <Route path="/user/:userId" element={<User />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;