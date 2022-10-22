import { Provider } from "react-redux";
import { render as defaultRender } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";

import store from "../store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ turns retries off
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: JSX.Element }) => (
  <QueryClientProvider client={queryClient}>{children} </QueryClientProvider>
);

type TStore = typeof store;

export const render = (children: JSX.Element, store?: TStore) => {
  if (!store) {
    return defaultRender(children, { wrapper });
  }
  return defaultRender(<Provider store={store}>{children} </Provider>, {
    wrapper,
  });
};
