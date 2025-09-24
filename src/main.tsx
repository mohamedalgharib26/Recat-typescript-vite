import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";

const query: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={query}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
);

// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.tsx";
// import { Provider } from "react-redux";
// import store from "./store/index.ts";
// import { LoaderWrapper } from "./LoaderWrapper.tsx";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// const query: QueryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: true,
//     },
//   },
// });
// createRoot(document.getElementById("root")!).render(
//   <QueryClientProvider client={query}>
//     <Provider store={store}>
//       <LoaderWrapper>
//         <App />
//       </LoaderWrapper>
//     </Provider>
//   </QueryClientProvider>
// );
