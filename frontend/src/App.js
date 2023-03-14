import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

import Allspots from './components/DisplaySpots';
import SpotsDetails from './components/SpotDetails';
import ReviewsByReviewId from './components/ReviewById';
import CreateSpotForm from './components/CreateSpotForm';

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
            <Allspots/>
          </Route>
          <Route path="/spots/new">
            <CreateSpotForm/>
          </Route>
          <Route path="/spots/:id">
            <SpotsDetails/>
            <ReviewsByReviewId/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
