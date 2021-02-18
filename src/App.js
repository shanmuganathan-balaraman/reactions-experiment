import Posts from './components/Posts';
import Store from './store/Store';
import GlobalStyle from './theme/GlobalStyle';
import DefaultTheme from './theme/DefaultTheme';
import { ThemeProvider } from 'styled-components'
const App = () => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <GlobalStyle />
      <Store>
        <Posts />
      </Store>
    </ThemeProvider>
  )
}
export default App;
