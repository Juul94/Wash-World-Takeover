import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import "./styles.css";
import info from "./info";
import WashHeader from "./components/WashHeader";
import WashLocation from "./components/WashLocation";
import WashProduct from "./components/WashProduct";
import WashSuccess from "./components/WashSuccess";
import NotFoundPage from "./components/NotFoundPage";

export default function App() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get(info.backendUrl + "/locations").then((result) => {
      setLocations(result.data.response.locations);
    });
  }, []);

  return (
    <main>
      <WashHeader />

      <Routes>
        <Route
          path="/"
          element={<WashLocation locations={locations} />}
          exact
        />
        <Route path="/products" element={<WashProduct />} exact />
        <Route path="/sucess" element={<WashSuccess />} exact />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </main>
  );
}
