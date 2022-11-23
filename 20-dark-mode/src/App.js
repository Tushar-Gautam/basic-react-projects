import { useEffect, useState } from "react";
import Article from "./Article";
import data from "./data";

const getStorageTheme = () => {
  let theme = "light-theme";
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  return theme;
};

function App() {
  const [dark, setDark] = useState(false);

  const [theme, setTheme] = useState(getStorageTheme());

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "dark-theme") {
      setTheme("light-theme");
      setDark(false);
    } else {
      setTheme("dark-theme");
      setDark(true);
    }
  };

  return (
    <main>
      <nav>
        <div className="nav-center">
          <h1>overreacted</h1>
          <button className="btn" onClick={toggleTheme}>
            {`${dark ? "light mode" : "dark mode"}`}
          </button>
        </div>
      </nav>
      <section className="articles">
        {data.map((item) => {
          return <Article key={item.id} {...item} />;
        })}
      </section>
    </main>
  );
}

export default App;
