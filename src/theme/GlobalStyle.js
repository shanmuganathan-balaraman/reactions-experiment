/**
 * @desc: all the common styles which are accessible in multiple components are written here
 */
import {
  createGlobalStyle
} from 'styled-components';

const GlobalStyle = createGlobalStyle `
  * {
    margin:0;
    padding: 0;
  }
  body{ 
    color: ${props=> props.theme.primaryFg};
    background-color: ${props=> props.theme.primaryBg};
    font-size: 16px;
  }
  button {
    :focus {
      outline: none;
    }
  }
  .animate {
    animation : shimmer 2s infinite linear;
    background: linear-gradient(to right, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
    background-size: 1000px 100%;
  }
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
`;

export default GlobalStyle;