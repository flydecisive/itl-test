import styles from "./Header.module.scss";
import StarIcon from "../../assets/star.svg?react";

import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleHeaderElem = () => {
    navigate("/favorites");
  };

  return (
    <div className={styles.header}>
      <div className={styles.header__elem} onClick={handleHeaderElem}>
        Избранное
        <StarIcon />
      </div>
    </div>
  );
}

export default Header;
