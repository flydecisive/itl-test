import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLazyGetUserPostsQuery } from "../../services/api";
import { setUserPosts } from "../../store/actions/creators/users";

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

  const [fetchUserPosts, { data, isLoading, isError }] =
    useLazyGetUserPostsQuery();
  const userPosts = useSelector((store: any) => store.users.userPosts);
  const allUsers = useSelector((store: any) => store.users.allUsers);

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
    console.log(currentUser);
  }, [currentUser]);

  return (
    <div className={styles.user}>
      <div className={styles.header}>
        <div className={styles.user__info}>
          <h3 className={styles.user__name}>{currentUser?.name}</h3>
          <StarIcon className={styles.icon} />
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
