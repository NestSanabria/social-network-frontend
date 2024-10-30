// src/router/PrivateRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import { PrivateLayout } from '../components/layout/private/PrivateLayout';
import { Feed } from '../components/publication/Feed';
import { FeedGlobal } from '../components/publication/FeedGlobal';
import { AuthProvider } from '../context/AuthProvider';
import { Logout } from '../components/user/Logout';
import { People } from '../components/user/People';
import { Config } from '../components/user/Config';
import { Following } from '../components/follow/Following';
import { Followers } from '../components/follow/Followers';
import { UserPublications } from '../components/publication/UserPublications';

const PrivateRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/rsocial" element={<PrivateLayout />}>
          <Route index element={<FeedGlobal />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed-global" element={<FeedGlobal />} />
          <Route path="Usuarios" element={<People />} />
          <Route path="ajustes" element={<Config />} />
          <Route path="logout" element={<Logout />} />
          <Route path="siguiendo/:userId" element={<Following />} />
          <Route path="seguidores/:userId" element={<Followers />} />
          <Route path="mis-publicaciones/:userId" element={<UserPublications />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default PrivateRoutes;
