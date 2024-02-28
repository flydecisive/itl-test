import { Route, Routes } from "react-router-dom";

import MainPage from "../pages/Main/Main";
import FavoritesPage from "../pages/Favorites/Favorites";
import UserPage from "../pages/User/User";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/user/:id" element={<UserPage />} />
    </Routes>
  );
}

export default AppRoutes;
