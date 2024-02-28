import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./Favorites.module.scss";
import User from "../../components/User/User";

function FavoritesPage() {
  const navigate = useNavigate();
  const favoritesUsers = useSelector(
    (store: any) => store.users.favoritesUsers
  );

  const handleUserClick = (id: number) => {
    navigate(`/user/${id}`);
  };

  return (
    <div className={styles.favorites}>
      {favoritesUsers.length > 0 &&
        favoritesUsers.map((user: any, index: number) => {
          return (
            <User
              onClick={() => {
                handleUserClick(user.id);
              }}
              key={index}
              name={user.name}
              username={user.username}
              email={user.email}
              phone={user.phone}
              website={user.website}
            />
          );
        })}
      {favoritesUsers.length === 0 && (
        <p className={styles.favorites__message}>
          Вы пока никого не добавили в избранное 😭
        </p>
      )}
    </div>
  );
}

export default FavoritesPage;
