import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from "react-icons/fa";

const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/women/87.jpg";

function App() {
  const [value, setValue] = useState("random person");
  const [title, setTitle] = useState("name");
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  const getPerson = async () => {
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    // console.log(response);
    const person = data.results[0];
    const { first, last } = person.name;
    const { email } = person;
    const { phone } = person;
    const { number, name } = person.location.street;

    // const {                      -->Alternate way to get street name and number
    //   street: { number, name },
    // } = person.location;

    const {
      dob: { age },
    } = person;
    // const { age } = person.dob;
    const { large: image } = person.picture;
    const { password } = person.login;

    const newPerson = {
      image,
      password,
      age,
      phone,
      email,
      name: `${first}${last}`,
      street: `${number}${name}`,
    };
    // console.log(newPerson);
    setPerson(newPerson);
    setLoading(false);
    setTitle("name");
    setValue(newPerson.name);
  };

  useEffect(() => {
    getPerson();
  }, []);

  const handleValue = (e) => {
    // console.log(e.target);
    if (e.target.classList.contains("icon")) {
      // console.log(person);
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="user-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" onClick={getPerson}>
            {loading ? `Loading...` : `Get Random User`}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
