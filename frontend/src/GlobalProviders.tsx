import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

import store from "./store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60,
      staleTime: 1000 * 60,
    },
  },
});

export const GlobalProviders = ({ children }: { children: JSX.Element }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};
