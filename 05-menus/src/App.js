import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories";
import items from "./data";

//below allCategories is for dynamically adding categories
const allCategories = ["all", ...new Set(items.map((item) => item.category))];
console.log(allCategories);
//finsihed

function App() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  // Manual approach for button categories
  const filterItems = (category) => {
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };
  //manual approach ends

  return (
    <main>
      <section className="menu section">
        <div className="title">
          <h2>Our Menu</h2>
          <div className="underline"></div>
        </div>
        {/* below is Manual appraoch for categories*/}
        {/* <Categories filterItems={filterItems} /> */}

        {/* Automatic approach */}
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </main>
  );
}

export default App;
