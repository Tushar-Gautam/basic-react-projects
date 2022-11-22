import { useState, useEffect } from "react";
import paginate from "./utils";

const url = `https://api.github.com/users/john-smilga /followers?per_page=500`;

export const useFetch = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    //to paginate we'll put the data into a 2d-Array and then extract the data out of this array

    setData(paginate(data));
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return { loading, data };
};
