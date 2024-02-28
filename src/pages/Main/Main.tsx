import { useLazyGetUsersQuery } from "../../services/api";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAllUsers } from "../../store/actions/creators/users";
import { useNavigate } from "react-router-dom";

import Header from "../../components/Header/Header";
import User from "../../components/User/User";
import Loader from "../../components/Loader/Loader";
import ArrowIcon from "../../assets/arrow.svg?react";
import styles from "./Main.module.scss";

const MAX_PAGES = 2;

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fetchUsersQuery, { data: allUsers, isLoading, isError }] =
    useLazyGetUsersQuery();
  const users = useSelector((store: any) => store.users.allUsers);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [usersRequestData, setUsersRequestData] = useState<{
    start: number;
    limit: number;
  }>({ start: 0, limit: 5 });

  useEffect(() => {
    fetchUsersQuery(usersRequestData);
  }, [usersRequestData]);

  useEffect(() => {
    if (allUsers) {
      const users = shuffleUsers([
        ...allUsers,
        ...allUsers,
        ...allUsers,
        ...allUsers,
      ]);

      dispatch(setAllUsers(users));
    }
  }, [allUsers]);

  useEffect(() => {
    if (pagesCount === 1) {
      setUsersRequestData({ start: 0, limit: 5 });
    } else if (pagesCount === 2) {
      setUsersRequestData({ start: 5, limit: 6 });
    }
  }, [pagesCount]);

  const handleUserClick = (id: number) => {
    navigate(`/user/${id}`);
  };

  const handlePrevButton = () => {
    setPagesCount(pagesCount - 1);
  };

  const handleNextButton = () => {
    setPagesCount(pagesCount + 1);
  };

  // Рандомное перемешивание пользователей, по сколько API возвращает всего 10 пользователей, а вы хотите пагинацию на 2 страницы :)
  function shuffleUsers(array: object[]) {
    const shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.users}>
        {!isLoading &&
          !isError &&
          users.map((user: any, index: number) => {
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
        {isLoading && <Loader />}
        {isError && (
          <p className={styles.error}>
            Не удалось загрузить данные. Попробуйте позже.
          </p>
        )}
      </div>
      <div className={styles.pagination}>
        <button
          className={`${styles.pagination__button} ${
            pagesCount > 1 && styles["pagination__button-accent"]
          }`}
          disabled={pagesCount <= 1}
          onClick={handlePrevButton}
        >
          <ArrowIcon />
        </button>
        <div className={styles.pagination__counter}>{pagesCount}</div>
        <button
          className={`${styles.pagination__button} ${
            pagesCount < MAX_PAGES && styles["pagination__button-accent"]
          }`}
          disabled={pagesCount === MAX_PAGES}
          onClick={handleNextButton}
        >
          <ArrowIcon className={styles["arrow-prev"]} />
        </button>
      </div>
    </div>
  );
}

export default MainPage;
