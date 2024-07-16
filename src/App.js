import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

import { FIREBASE_AUTH } from "./Utils/Firebase_config";
import Home from "./Pages/Dashboard/Home";
import Login from "./Pages/Login/Login";
import Navigation from "./Navigation/Navigation";
import Requests from "./Pages/Requests/Requests";
import Sellers from "./Pages/Sellers/Sellers";
import Userlist from "./Pages/Users/Userlist";
import ViewMapComponent from "./Pages/ViewMap/ViewMapComponent";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedIn_, setLoggedIn_] = useState(true);
  useEffect(() => {
    const auth = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        console.log("no Account logged in");
      }
    });
    return auth;
  });
  const [routes_link, setRoutes_link] = useState([
    {
      path: "/",
      component: (
        <Login
          setLoggedIn={setLoggedIn}
          setLoggedIn_={setLoggedIn_}
          loggedIn={loggedIn}
        />
      ),
    },
    {
      path: "/home",
      component: <Home setLoggedIn={setLoggedIn} loggedIn={loggedIn} />,
      name: "Products",
    },

    {
      path: "/users",
      component: <Userlist setLoggedIn={setLoggedIn} loggedIn={loggedIn} />,
      name: "Users",
    },
    {
      path: "/sellers",
      component: <Sellers setLoggedIn={setLoggedIn} loggedIn={loggedIn} />,
      name: "Sellers",
    },
    {
      path: "/requests",
      component: <Requests setLoggedIn={setLoggedIn} loggedIn={loggedIn} />,
      name: "Requests",
    },
  ]);

  return (
    <BrowserRouter>
      {loggedIn && !loggedIn_ ? (
        <Navigation
          routes_link={routes_link}
          setLoggedIn={setLoggedIn}
          loggedIn={loggedIn}
        />
      ) : null}

      <Routes>
        {/* {loggedIn_ ? ( */}
        <Route path={"view_map"} element={<ViewMapComponent />} />
        {/* // ) : null} */}

        {routes_link.map((res) => (
          <Route path={res.path} element={res.component} />
        ))}
      </Routes>
    </BrowserRouter>
    // <div>
    //   <h1>HEllo</h1>
    // </div>
  );
}

export default App;
