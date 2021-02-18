/**
 * @desc: Global data store is designed with context API to maintain the state centerally.
 */
import React, {
  createContext,
  useReducer,
  useEffect,
  useState
} from "react";
import Reducer from './Reducer';
import PostsShimmer from '../components/shimmers/PostsShimmer';


const initialState = {
  posts: [{
    id: 1,
    title: "Content id 1",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    img: 'https://picsum.photos/seed/picsum/500/200'
  },
  {
    id: 2,
    title: "Content id 2",
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    img: 'https://picsum.photos/500/200?grayscale'
  },
  {
    id: 3,
    title: "Content id 3",
    content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
    img: 'https://picsum.photos/500/200?blur=2',
    comments: [
      {
        id: 1,
        comment: "Sample comment 1 for testing reusability"
      },
      {
        id: 2,
        comment: "comment 2 for content 3"
      }
    ]
  }
  ],
  emojis: [],
  reactions: [],
  showEmoji: {
    id: 0,
    show: false
  },
  currentUser: 4
};

const Store = ({ children }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, dispatch] = useReducer(Reducer, initialState);
  useEffect(() => {
    /**
     * Fetching list of available emojis before loading any other components since all the components are depend on emojis
     */
    fetch("https://artful-iudex.herokuapp.com/reactions")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          dispatch({
            type: 'SET_EMOJIS',
            payload: result
          });
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
          dispatch({
            type: 'SET_ERROR',
            payload: error
          });
        }
      )
  }, []);
  if (error) {
    return <h1> Error: {error.message} < /h1>;
  } else if (!isLoaded) {
    return <PostsShimmer />;
  } else {
    return (
      <Context.Provider value={[state, dispatch]}>
        {children}
      </Context.Provider>
      );
  }
};
            
export const Context = createContext(initialState);
export default Store;