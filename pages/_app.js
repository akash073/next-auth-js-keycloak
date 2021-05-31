import { Provider } from "next-auth/client";
import { AppProps } from "next/app";

const App = ({ Component, pageProps }) => {
  return (
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
  );
};

export default App;
