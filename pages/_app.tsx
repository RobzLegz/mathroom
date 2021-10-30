import { AppProps } from "next/app"
import { Provider } from "react-redux";
import { store } from "../redux/app/store";
import "../styles/main.scss"
import "../styles/globals.css"

function App({ Component, pageProps }: AppProps) {
  return(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
