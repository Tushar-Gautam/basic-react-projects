import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(e);
    if (!name) {
      //display Alert
      showAlert(true, "danger", "please enter some value");
    } else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId("");
      setIsEditing(false);
      showAlert(true, "success", "Value Changed");
    } else {
      showAlert(true, "success", "item added");
      let newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    return setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "All items removed");
    setList([]);
  };

  const removeItems = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  //below to store data in local memory whenver list changes
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <>
      <section className="section-center">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <label htmlFor="things">
            <h3>grocery bud</h3>

            <div className="form-control">
              <input
                type="text"
                className="grocery"
                value={name}
                id="things"
                placeholder="e.g.eggs"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <button className="submit-btn">
                {isEditing ? "Editing" : "Submit"}
              </button>
            </div>
          </label>
        </form>
        {list.length > 0 && (
          <div className="grocery-container">
            <List items={list} removeItem={removeItems} editItem={editItem} />
            <button className="clear-btn" onClick={() => clearList()}>
              Clear All
            </button>
          </div>
        )}
      </section>
    </>
  );
}
export default App;
