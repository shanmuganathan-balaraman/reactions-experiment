const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: state.posts.concat(action.payload)
      };
    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case 'SET_REACTIONS':
      return {
        ...state,
        reactions: action.payload
      };
    case 'ADD_REACTION':
      return {
        ...state,
        reactions: state.reactions.concat(action.payload)
      };
    case 'REMOVE_REACTION':
      return {
        ...state,
        reactions: state.reactions.filter(reaction => reaction.id != action.payload)
      };
    case 'SET_EMOJIS':
      return {
        ...state,
        emojis: action.payload
      };
    case 'TOGGLE_EMOJIS':
      return {
        ...state,
        showEmoji: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;