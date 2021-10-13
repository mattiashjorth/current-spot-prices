import "../css/app.css";

import SpotPricesContainer from "./spotPricesContainer";

//https://www.vattenfall.se/api/price/spot/pricearea/2021-10-05/2050-01-01/SN3

function App() {
  return (
    <>
      <header>Dagens spotpriser</header>
      <SpotPricesContainer />
    </>
  );
}

export default App;
