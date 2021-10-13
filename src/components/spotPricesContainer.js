import React, { useState, useEffect } from "react";
import SpotPriceList from "./spotPriceList";
import SpotPriceGraph from "./spotPriceGraph";
import SpotPriceGraphNivo from "./spotPriceGraphNivo";

export default function SpotPricesContainer() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [spotPricesTableData, setSpotPricesTableData] = useState([]);
  const [spotPricesGraphData, setSpotPricesGraphData] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(15 * 60 * 1000);
  const area = "SN3";

  useEffect(() => {
    getDataFromApi();
    if (refreshInterval && refreshInterval > 0) {
      const interval = setInterval(() => getDataFromApi(), refreshInterval);
      return () => clearInterval(interval);
    }
  }, [refreshInterval]);

  function getTimestampToLoadDataFrom() {
    let fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 1);
    return fromDate;
  }

  function getDataFromApi() {
    fetch(getApiUrl())
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }

  function getApiUrl() {
    const fromDateString = getTimestampToLoadDataFrom().toLocaleString("sv-SE").split(" ")[0];
    let url = `/api/price/spot/pricearea/${fromDateString}/2050-01-01/${area}`;
    return url;
  }

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
    setSpotPricesTableData(mappedData);

    const mappedGraphData = [
      {
        id: { area },
        data: mappedData.map((data) => ({
          x: data.timeStampDay + " " + data.timeStampHour,
          y: data.value,
        })),
      },
    ];
    setSpotPricesGraphData(mappedGraphData);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <SpotPriceGraph spotPricesTableData={spotPricesTableData} />
        <SpotPriceGraphNivo spotPricesGraphData={spotPricesGraphData} />
        <SpotPriceList spotPricesTableData={spotPricesTableData} />
      </>
    );
  }
}
