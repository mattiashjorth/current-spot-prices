import React, { useState, useEffect } from "react";
import SpotPriceList from "./spotPriceList";
import SpotPriceGraph from "./spotPriceGraph";

export default function SpotPricesContainer() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [spotPricesData, setSpotPricesData] = useState([]);
  const [spotPricesGraphData, setSpotPricesGraphData] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(15 * 60 * 1000);

  useEffect(() => {
    const area = "SN3";

    const getDataFromApi = () => {
      fetch(getApiUrl())
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setError(null);
            setData(result);
            setRefreshInterval(15 * 60 * 1000);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
            setRefreshInterval(15 * 1000);
          }
        );
    };

    const getApiUrl = () => {
      const fromDateString = getTimestampToLoadDataFrom().toLocaleString("sv-SE").split(" ")[0];
      let url = `/api/price/spot/pricearea/${fromDateString}/2050-01-01/${area}`;
      return url;
    };

    const getTimestampToLoadDataFrom = () => {
      let fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - 1);
      return fromDate;
    };

    getDataFromApi();
    const interval = setInterval(() => getDataFromApi(), refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  function setData(data) {
    const filteredData = data.slice(-48);

    const mappedData = filteredData.map((data) => ({
      timeStamp: data.TimeStamp,
      timeStampDay: data.TimeStampDay,
      timeStampHour: data.TimeStampHour,
      value: data.Value,
      unit: data.Unit,
      valueKr: Math.round(data.Value, 0) / 100,
      timeStampShort: data.TimeStampDay + " " + data.TimeStampHour,
    }));
    setSpotPricesData(mappedData);

    const mappedGraphData = mappedData.map((data) => ({
      timeStamp: data.timeStampDay + " " + data.timeStampHour,
      value: Math.round(data.value, 0) / 100,
    }));
    setSpotPricesGraphData(mappedGraphData);
  }

  if (error) {
    return <div className="error-div">Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <SpotPriceGraph spotPricesGraphData={spotPricesGraphData} />
        <SpotPriceList spotPricesData={spotPricesData} />
      </>
    );
  }
}
