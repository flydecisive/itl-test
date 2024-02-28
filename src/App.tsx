import { useState, useEffect } from "react";
import { useLazyGetUsersQuery } from "./services/api";
import { useDispatch } from "react-redux";
import { setAllUsers } from "./store/actions/creators/users";
import { UserRequestContext } from "./contexts/userRequest";

import AppRoutes from "./routes/routes";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";

function App() {
  const dispatch = useDispatch();
  const [fetchUsersQuery, { data: allUsers, isLoading, isError }] =
    useLazyGetUsersQuery();
  const [usersRequestData, setUsersRequestData] = useState<{
    start: number;
    limit: number;
  }>({ start: 0, limit: 5 });
  const [data, setData] = useState<any>({
    isLoading: false,
    isError: false,
    pagesCount: 1,
  });

  useEffect(() => {
    fetchUsersQuery(usersRequestData);
  }, [usersRequestData]);

  useEffect(() => {
    setData({ ...data, isLoading: isLoading, isError: isError });
  }, [isLoading, isError]);

  useEffect(() => {
    if (data.pagesCount === 1) {
      setUsersRequestData({ start: 0, limit: 5 });
    } else if (data.pagesCount === 2) {
      setUsersRequestData({ start: 5, limit: 6 });
    }
  }, [data]);

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
    <UserRequestContext.Provider value={{ data, setData }}>
      <div className={styles.app}>
        <Header />
        <AppRoutes />
      </div>
    </UserRequestContext.Provider>
  );
}

export default App;
