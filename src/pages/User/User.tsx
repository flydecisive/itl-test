import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetUserPostsQuery } from "../../services/api";
import {
  setUserPosts,
  setFavoritesUsers,
} from "../../store/actions/creators/users";

import styles from "./User.module.scss";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import StarIcon from "../../assets/star.svg?react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

function UserPage() {
  const params = useParams();
  const dispatch = useDispatch();

  const userId = Number(params.id);
  const [currentUser, setCurrentUser] = useState<any>();
  const [isUserFavorite, setIsUserFavorite] = useState<boolean>(false);

  const [fetchUserPosts, { data, isLoading, isError }] =
    useLazyGetUserPostsQuery();
  const userPosts = useSelector((store: any) => store.users.userPosts);
  const allUsers = useSelector((store: any) => store.users.allUsers);
  const favoritesUsers = useSelector(
    (store: any) => store.users.favoritesUsers
  );

  useEffect(() => {
    if (params.id) {
      fetchUserPosts({ id: userId });
    }
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setUserPosts(data));
    }
  }, [data]);

  useEffect(() => {
    if (allUsers) {
      for (const user of allUsers) {
        if (user.id === userId) {
          setCurrentUser(user);
          break;
        }
      }
    }
  }, [allUsers]);

  useEffect(() => {
    if (favoritesUsers) {
      for (const user of favoritesUsers) {
        if (user.id === userId) {
          setIsUserFavorite(true);
          break;
        }
      }
    }
  }, [favoritesUsers]);

  const handleFavoriteClick = () => {
    if (!isUserFavorite) {
      dispatch(setFavoritesUsers([...favoritesUsers, currentUser]));
    } else {
      const users = [...favoritesUsers];
      let index;
      for (let i = 0; i < favoritesUsers.length; i++) {
        if (favoritesUsers[i].id === userId) {
          index = i;
        }
      }
      if (index !== undefined && index >= 0) {
        users.splice(index, 1);
        dispatch(setFavoritesUsers(users));
        setIsUserFavorite(false);
      }
    }
  };

  return (
    <div className={styles.user}>
      <div className={styles.header}>
        <div className={styles.user__info}>
          <h3 className={styles.user__name}>{currentUser?.name}</h3>
          <StarIcon
            className={`${styles.icon} ${
              isUserFavorite && styles["icon-active"]
            }`}
            onClick={handleFavoriteClick}
          />
        </div>
        <p className={styles.info}>posts</p>
      </div>
      <div className={styles.posts}>
        {!isLoading &&
          !isError &&
          userPosts.map((post: { id: number; title: string; body: string }) => {
            return <Post key={post.id} title={post.title} body={post.body} />;
          })}
        {isLoading && <Loader template="flex" />}
        {isError && <ErrorMessage template="flex" />}
      </div>
    </div>
  );
}

export default UserPage;
