import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";
function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [prev, setPrev] = useState(0);

  const getIndex = (idx) => {
    let index = idx.target.textContent;
    setPage(index - 1);
    setPrev(page);
    // console.log(page);
    idx.currentTarget.classList.toggle("active-btn");
    // console.log(idx.target.textContent);
  };
  console.log(page + "--" + prev);
  return (
    <>
      <div className="section-title">
        <h1>{loading ? "Loading..." : "Pagination"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {data.map((follower) => {
            return <Follower key={follower.id} {...follower[page]} />;
          })}
        </div>
        <div className="btn-container">
          {data.map((i, idx) => {
            return (
              <button key={idx} className="page-btn" onClick={getIndex}>
                {idx + 1}
              </button>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default App;
