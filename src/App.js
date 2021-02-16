import Posts from './components/Posts';
import GlobalStyle from './components/globalStyle';
import Store from './components/Store';
const App = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <Store>
        <Posts />
      </Store>
    </div>
  )
}

export default App;
