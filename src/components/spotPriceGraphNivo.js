import React from "react";
import { Line as NivoLine } from "@nivo/line";

export default function SpotPriceGraphNivo({ spotPricesGraphData }) {
  const commonProperties = {
    width: 900,
    height: 400,
    margin: { top: 20, right: 20, bottom: 60, left: 80 },
    animate: true,
  };
  return (
    <div>
      <NivoLine
        {...commonProperties}
        curve="monotoneX"
        data={spotPricesGraphData}
        enablePointLabel={true}
        // xScale={{
        //   type: "time",
        //   format: "%Y-%m-%d %HH:%MM",
        //   useUTC: false,
        //   precision: "day",
        // }}
        // xFormat="time:%Y-%m-%d %HH:%MM"
      />
    </div>
  );
}
