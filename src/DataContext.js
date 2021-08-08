/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
export const DataContext = React.createContext();

const initialState = {
  users: [],
  posts: [],
};

const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URL}/users`)
      .then((res) => {
        if (res.ok) resolve(res.json());
        throw res;
      })
      .catch((err) => reject(err));
  });

  const fetchPosts = new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_URL}/posts`)
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });

  useEffect(() => {
    // setIsLoading(true);
    Promise.all([fetchUsers, fetchPosts])
      .then((res) => {
        // map user and posts
        let posts = res[1],
          users = res[0];
        posts = posts.map((t1) => ({
          ...t1,
          ...users.find((t2) => t2.id === t1.id),
        }));
        setData({ posts, users });
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  return <DataContext.Provider value={data}> {children} </DataContext.Provider>;
};

export default DataProvider;
