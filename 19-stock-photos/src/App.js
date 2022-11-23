import React, { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";

const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const mounted = useRef(false);
  const [newImages, setNewImages] = useState(false);

  const fetchImages = async () => {
    // const key = "";
    setLoading(true);

    //url let coz need to change url based on what user wants
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      // console.log(photos);

      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }
      });
      setNewImages(false);
      setLoading(false);
    } catch (error) {
      setNewImages(false);
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  // useEffect(() => {
  //   const event = window.addEventListener("scroll", () => {
  //     /*
  //     console.log(`innerheight: ${window.innerHeight}`);
  //     console.log(`scrollY: ${window.scrollY}`);
  //     console.log(`body height: ${document.body.scrollHeight}`);
  //     so innerheight+scrollY = body height we'll  use this to know when to fetch new images
  //     */
  //     let innerHeight = window.innerHeight;
  //     let scrollY = window.scrollY;
  //     let bodyHeight = document.body.scrollHeight;

  //     if (!loading && innerHeight + scrollY >= bodyHeight - 2) {
  //       // console.log("worked");
  //       setPage((oldPage) => {
  //         return oldPage + 1;
  //       });
  //     }
  //   });
  //   return () => window.removeEventListener("scroll", event);
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (!mounted.current) {
      //this is to prevent the function running on initial render
      mounted.current = true;
      return;
    }
    if (!newImages) return;
    if (loading) return;
    else {
      setPage((oldPage) => oldPage + 1);
    }
  }, [newImages]);

  const event = () => {
    let innerHeight = window.innerHeight;
    let scrollY = window.scrollY;
    let bodyHeight = document.body.scrollHeight;

    if (innerHeight + scrollY >= bodyHeight - 2) {
      setNewImages(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", event);
    return () => window.removeEventListener("scroll", event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query) return;
    if (page === 1) {
      fetchImages();
      return;
    }
    setPage(1);
    // above line was required coz will scrolling suppose we are at page 3 and then searched so the results will be displayed of page 3 of search Query
  };

  return (
    <>
      <main>
        <section className="search">
          <form className="search-form">
            <input
              type="text"
              className="form-input"
              placeholder="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button
              className="submit-btn"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              <FaSearch />
            </button>
          </form>
        </section>
        <section className="photos">
          <div className="photos-center">
            {photos.map((image, idx) => {
              return <Photo key={image.id + Math.random()} {...image} />;
            })}
          </div>
          {loading && <h2 className="loading">Loading...</h2>}
        </section>
      </main>
    </>
  );
}

export default App;
