import styles from "./User.module.scss";

interface UserProps {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  onClick: () => void;
}

function User({ name, username, email, phone, website, onClick }: UserProps) {
  return (
    <div className={styles.user} onClick={onClick}>
      <h2 className={styles.user__title}>{name}</h2>
      <p className={styles.user__info}>{username}</p>
      <p className={styles.user__info}>{email}</p>
      <p className={styles.user__info}>{phone}</p>
      <p className={styles.user__info}>{website}</p>
    </div>
  );
}

export default User;
