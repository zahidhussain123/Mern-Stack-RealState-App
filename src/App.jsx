import { Suspense } from "react";
import "./App.css";
import Website from "./pages/website/Website";
import Properties from "./pages/properties/Properties";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SingleProperty from "./pages/singleProperty/SingleProperty";
import { createTheme, MantineProvider } from "@mantine/core";
import UserDetailsContext from "./context/UserDetailsContext";
import { useState } from "react";
import Bookings from "./pages/bookings/Bookings";
import Favourites from "./pages/favourites/Favourites";
// import '@mantine/core/styles.css';

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
});

function App() {
  const queryClient = new QueryClient();
  const [userDetails, setUserDetails] = useState({
    bookings: [],
    favourites: [],
    token: null,
  });
  return (
    <UserDetailsContext.Provider value={{ userDetails, setUserDetails }}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<>Loading...</>}>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Website />} />
                  <Route path="/properties">
                    <Route index element={<Properties />} />
                    <Route path=":propertyId" element={<SingleProperty />} />
                  </Route>
                    <Route path="/bookings" element={<Bookings />} />
                    <Route path="/favourites" element={<Favourites />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer />
        </QueryClientProvider>
      </MantineProvider>
    </UserDetailsContext.Provider>
  );
}

export default App;
