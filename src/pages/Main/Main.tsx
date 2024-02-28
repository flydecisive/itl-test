import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserRequestContext } from "../../contexts/userRequest";

import User from "../../components/User/User";
import Loader from "../../components/Loader/Loader";
import ArrowIcon from "../../assets/arrow.svg?react";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import styles from "./Main.module.scss";

const MAX_PAGES = 2;

function MainPage() {
  const navigate = useNavigate();

  const users = useSelector((store: any) => store.users.allUsers);
  const { data, setData } = useUserRequestContext();

  const handleUserClick = (id: number) => {
    navigate(`/user/${id}`);
  };

  const handlePrevButton = () => {
    setData({ ...data, pagesCount: data.pagesCount - 1 });
  };

  const handleNextButton = () => {
    setData({ ...data, pagesCount: data.pagesCount + 1 });
  };

  return (
    <div className={styles.main}>
      <div className={styles.users}>
        {!data.isLoading &&
          !data.isError &&
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
        {data.isLoading && <Loader template="grid" />}
        {data.isError && <ErrorMessage template="grid" />}
      </div>
      {!data.isError && !data.isLoading && (
        <div className={styles.pagination}>
          <button
            className={`${styles.pagination__button} ${
              data.pagesCount > 1 && styles["pagination__button-accent"]
            }`}
            disabled={data.pagesCount <= 1}
            onClick={handlePrevButton}
          >
            <ArrowIcon />
          </button>
          <div className={styles.pagination__counter}>{data.pagesCount}</div>
          <button
            className={`${styles.pagination__button} ${
              data.pagesCount < MAX_PAGES && styles["pagination__button-accent"]
            }`}
            disabled={data.pagesCount === MAX_PAGES}
            onClick={handleNextButton}
          >
            <ArrowIcon className={styles["arrow-prev"]} />
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
