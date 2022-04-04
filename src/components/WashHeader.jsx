import Logo_white from "../images/ww-logo-white.svg";
import { useLocation, Link } from "react-router-dom";

export default function WashHeader() {
  const url = useLocation().pathname;

  return (
    <div>
      <nav className="navbar">
        <Link to="/">
          <img
            src={Logo_white}
            className="ww_logo"
            alt="Wash World Logo"
            width="95"
          />
        </Link>
      </nav>

      <div className="container">
        <div className="row m-auto">
          <div className="col p-0">
            <Link to="/" className="link_style">
              {url == "/" ? (
                <div>
                  <div className="dot_active">1</div>
                  <h2 className="text-center h2_smallest h2_highlight">
                    Vælg lokation
                  </h2>
                </div>
              ) : (
                <div>
                  <div className="dot">1</div>
                  <h2 className="text-center h2_smallest">Vælg lokation</h2>
                </div>
              )}
            </Link>
          </div>
          <div className="col-2 p-0">
            <hr className="step_lines" />
          </div>
          <div className="col p-0">
            {url == "/products" ? (
              <div>
                <div className="dot_active">2</div>
                <h2 className="text-center h2_smallest h2_highlight">
                  Vælg vask
                </h2>
              </div>
            ) : (
              <div>
                <div className="dot">2</div>
                <h2 className="text-center h2_smallest">Vælg vask</h2>
              </div>
            )}
          </div>
          <div className="col-2 p-0">
            <hr className="step_lines" />
          </div>
          <div className="col p-0">
            {url == "/sucess" ? (
              <div>
                <div className="dot_active">3</div>
                <h2 className="text-center h2_smallest h2_highlight">
                  Vask startet
                </h2>
              </div>
            ) : (
              <div>
                <div className="dot">3</div>
                <h2 className="text-center h2_smallest">Vælg vask</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
