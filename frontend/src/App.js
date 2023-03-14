import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import Allspots from './components/DisplaySpots'
import SpotsDetails from './components/SpotDetails';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/" exact>
            <Allspots />
          </Route>
          <Route path="/spots/:id">
            <SpotsDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
