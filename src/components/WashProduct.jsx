import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import info from "../info";

export default function WashProduct({}) {
  const navigateSuccess = useNavigate();
  const { state } = useLocation();
  const [products, setProduct] = useState([]);

  function startWash(program, price) {
    axios
      .post(info.backendUrl + `/${state.LocationID}/start/${program}`)
      .then((response) => {
        const washData = {
          washName: response.data.response.program,
          washDuration: response.data.response.estimated_duration,
          washLocation: state.LocationName,
          LicensePlate: state.LicensePlate,
          WashPrice: price,
        };
        navigateSuccess("/sucess", { state: washData });
      });
  }

  useEffect(() => {
    axios
      .get(`${info.backendUrl}/products/${state.LicensePlate}`)
      .then((result) => {
        setProduct(result.data.response.products);
      });
  }, []);

  return (
    <div className="container_prod">
      <h1>2. Vælg vask</h1>
      <div className="row mt-4 mb-0">
        <div className="col-3">
          <h2 className="m-0 h2_small">Lokation:</h2>
          <h2 className="m-0 h2_small color_highlight">{state.LocationName}</h2>
        </div>
        <div className="col-3">
          <h2 className="m-0 h2_small">Nummerplade:</h2>
          <h2 className="m-0 h2_small color_highlight">{state.LicensePlate}</h2>
        </div>
      </div>
      <div className="row">
        {products.map((product) => (
          <div
            className={`col-3 product_card pb-5 p-4 ${
              product.name == "Premium" ? "popularProd" : ""
            }`}
            key={product.productid}
          >
            <div>
              <h2 className="heading_color d-inline">{product.name}</h2>
              {product.name == "Premium" ? (
                <div className="popularBanner d-inline">Populær</div>
              ) : (
                ""
              )}
            </div>
            <h2 className="h_price">
              {product.price.slice(0, -3)}{" "}
              <span className="h_small">Kr./md.</span>
            </h2>
            <p>{product.description}</p>
            <button
              onClick={() => startWash(product.program, product.price)}
              className="btn_select_prod"
            >
              Start {product.name} vask
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
