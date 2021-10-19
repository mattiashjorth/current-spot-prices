import React, { useState, useEffect } from "react";
import SpotPriceList from "./spotPriceList";
import SpotPriceGraph from "./spotPriceGraph";

export default function SpotPricesContainer(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [spotPricesData, setSpotPricesData] = useState([]);
  const [spotPricesGraphData, setSpotPricesGraphData] = useState([]);
  const [refreshInterval, setRefreshInterval] = useState(15 * 60 * 1000);
  const [currentHour, setCurrentHour] = useState();
  const area = props.match.params.priceArea.toUpperCase();

  useEffect(() => {
    const validPriceAreas = ["SN1", "SN2", "SN3", "SN4"];

    if (!validPriceAreas.includes(area.toUpperCase())) {
      setIsLoaded(true);
      setError("Not supported price area");
      return;
    }

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
  }, [refreshInterval, props, area]);

  useEffect(() => {
    setCurrentHour(getCurrentHour());
    const interval = setInterval(() => setCurrentHour(getCurrentHour()), 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  function getCurrentHour() {
    const now = new Date();
    const currentDateString = now.toLocaleString("sv-SE").substring(0, 14) + "00:00";
    const timeStampFull = currentDateString.replace(" ", "T");
    const timeStampShort = currentDateString.substring(0, 16);
    const day = currentDateString.substring(0, 10);
    const hour = currentDateString.substring(11, 16);

    return { timeStampFull, timeStampShort, day, hour };
  }

  function setData(data) {
    const filteredData = data.slice(-48);

    const mappedData = filteredData.map((data) => ({
      timeStamp: data.TimeStamp,
      timeStampDay: data.TimeStampDay,
      timeStampHour: data.TimeStampHour,
      value: data.Value,
      unit: data.Unit,
    }));
    setSpotPricesData(mappedData);

    const mappedGraphData = mappedData.map((data) => ({
      timeStamp: data.timeStampDay + " " + data.timeStampHour,
      value: Math.round(data.value, 0) / 100,
    }));
    setSpotPricesGraphData(mappedGraphData);
  }

  if (error) {
    return <div className="error-div">Error: {error.message ?? error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    let dataPresentation;
    if (props.match.path === "/table/:priceArea") dataPresentation = <SpotPriceList data={spotPricesData} />;
    else if (props.match.path === "/graph/:priceArea") {
      dataPresentation = <SpotPriceGraph data={spotPricesGraphData} currentHour={currentHour} />;
    }
    return (
      <>
        <h2>Aktuella spotpriser {area}</h2>
        {dataPresentation}
      </>
    );
  }
}
