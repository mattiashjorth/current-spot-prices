import "../css/app.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import SpotPricesContainer from "./spotPricesContainer";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/table/:priceArea" component={SpotPricesContainer} />
        <Route path="/graph/:priceArea" component={SpotPricesContainer} />
        <Route exact path="/">
          <Redirect to="/graph/sn3" />
        </Route>
        <Route path="/">
          <div className="error-div">Page not found</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
