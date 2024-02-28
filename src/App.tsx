import { useState } from "react";
import AppRoutes from "./routes/routes";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;
