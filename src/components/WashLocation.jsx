import { useNavigate } from "react-router-dom";
import info from "../info";
import axios from "axios";

export default function WashLocation({ locations }) {
  const navigateSuccess = useNavigate();

  function getUserData(id, name) {
    axios.get(`${info.backendUrl}/cam/${id}`).then((result) => {
      const randomPlateNr = getRandomLPN(result.data.response.lpn);
      const prodData = {
        LocationID: id,
        LicensePlate: randomPlateNr,
        LocationName: name,
      };
      navigateSuccess("/products", { state: prodData });
    });
  }

  function getRandomLPN(lpn) {
    const chars = lpn.slice(0, 2);
    const numbers = lpn.slice(2) - Math.round(Math.random() * 1);
    return chars + numbers;
  }

  return (
    <div className="container_mt">
      <h1>1. Vælg lokation</h1>
      <div className="row">
        {locations.map((location) => (
          <div className="col-6" key={location.id}>
            {location.status == "available" ? (
              <button
                onClick={() => getUserData(location.id, location.name)}
                className="btn_select"
              >
                {location.name}
              </button>
            ) : (
              <button className="btn_select_disabled" disabled>
                {location.name}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
