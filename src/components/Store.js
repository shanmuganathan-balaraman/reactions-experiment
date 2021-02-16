import React, { createContext, useReducer, useEffect, useState } from "react";
import Reducer from './Reducer'
import PostsShimmer from '../components/shimmers/PostsShimmer';


const initialState = {
  posts: [{
    id: 1,
    title: "Content id 1",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
  },
  {
    id: 2,
    title: "Content id 2",
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
  },
  {
    id: 3,
    title: "Content id 3",
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout."
  }],
  emojis: [],
  reactions: [],
  showEmojis: false,
  currentUser: 4
};

const Store = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    fetch("https://artful-iudex.herokuapp.com/reactions")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          dispatch({ type: 'SET_EMOJIS', payload: result });
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          dispatch({ type: 'SET_ERROR', payload: error });
        }
      )
  }, []);
  if (error) {
    return <h1>Error: {error.message}</h1>;
  } else if (!isLoaded) {
    return <PostsShimmer />;
  } else {
    return (
      <Context.Provider value={[state, dispatch]}>
        {children}
      </Context.Provider>
    )
  }
};

export const Context = createContext(initialState);
export default Store;