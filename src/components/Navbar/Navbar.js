import { Popover } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuData } from "./MenuData/MenuData";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState();
  const [active, setActive] = useState("nav-menu");
  const [icon, setIcon] = useState("fas fa-bars ");
  const [anchorEl, setAnchorEl] = useState(null);
  const navToggle = () => {
    active === "nav-menu"
      ? setActive("nav-menu active")
      : setActive("nav-menu");
    icon === "nav-toggler" ? setIcon("fas fa-times") : setIcon("fas fa-bars");
  };
  const navigate = useNavigate();

  const handleClickPop = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then((res) => {
        localStorage.clear();
        navigate("/");
        window.location.reload(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <nav className="navbar-items">
        <h1>Arvis Shop</h1>
        <div className="menu-icons" onClick={navToggle}>
          <i className={icon}></i>
        </div>

        {user ? (
          <ul className={active}>
            {MenuData.filter((a) => a.id !== "sign").map((item, i) => {
              return (
                <li key={i}>
                  <Link to={item.url} className={item.cName}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
            {user?.displayName ? (
              <li className="nav-links" onClick={(e) => handleClickPop(e)}>
                {user?.displayName}
              </li>
            ) : (
              <li className="nav-links" onClick={(e) => handleClickPop(e)}>
                {user?.email}
              </li>
            )}
            <Popover
              id={idPop}
              open={openPop}
              anchorEl={anchorEl}
              onClose={handleClosePop}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <button className="nav-links-sign" onClick={handleLogout}>
                Log Out
              </button>
            </Popover>
          </ul>
        ) : (
          <ul className={active}>
            {MenuData.filter((a) => a.id !== "order").map((item, i) => {
              return (
                <li key={i}>
                  <Link to={item.url} className={item.cName}>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
