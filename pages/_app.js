import "styles/index.css";

import { ReactQueryConfigProvider } from "react-query";
import { Provider } from "next-auth/client";
import { ReactQueryDevtools } from "react-query-devtools";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <Provider session={pageProps.session}>
        <ReactQueryConfigProvider
          config={{
            queries: {
              retry: false,
              staleTime: 1000 * 60 * 5,
              refetchOnWindowFocus: false,
            },
          }}
        >
          {getLayout(<Component {...pageProps} />)}
        </ReactQueryConfigProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default MyApp;
