import styles from "./Post.module.scss";

interface PostProps {
  title: string;
  body: string;
}

function Post({ title, body }: PostProps) {
  return (
    <div className={styles.post}>
      <h3 className={styles.post__title}>{title}</h3>
      <p className={styles.post__body}>{body}</p>
    </div>
  );
}

export default Post;
