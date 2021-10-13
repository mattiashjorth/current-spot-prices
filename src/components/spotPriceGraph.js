import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ReferenceLine,
} from "recharts";

export default function SpotPriceGraph({ spotPricesGraphData }) {
  const [maxY, setMaxY] = React.useState(0);
  const [currentDateString, setCurrentDateString] = React.useState();
  const [ticksX, setTicksX] = React.useState([]);

  React.useEffect(() => {
    setMaxY(calculateMaxY(spotPricesGraphData));
    setCurrentDateString(getCurrentDateString());
    setTicksX(getTicksX(spotPricesGraphData));
  }, [spotPricesGraphData]);

  function getCurrentDateString() {
    let soon = new Date();
    soon.setMinutes(soon.getMinutes() + 30);
    return soon.toLocaleString("sv-SE").substring(0, 14) + "00";
  }

  function calculateMaxY(data) {
    let dataMax = Math.max(...data.map((y) => y.value), 0);
    return Math.floor(dataMax) + 1;
  }

  function getTicksX(data) {
    let ticks = data.map((x) => x.timeStamp).filter((value, index, array) => index % 6 === 0 && index !== 0);

    return ticks;
  }

  function CustomizedLineLabel(props) {
    const { x, y, stroke, value } = props;
    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value.toFixed(2)}
      </text>
    );
  }

  function CustomizedAxisTick(props) {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={550}>
      <LineChart
        width="100%"
        height={550}
        data={spotPricesGraphData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 100,
        }}
      >
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} label={<CustomizedLineLabel />} />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="timeStamp" tick={<CustomizedAxisTick />} ticks={ticksX} />
        <YAxis domain={[0, maxY]} tickCount={maxY + 1}>
          <Label value="kr/kWh" position="center" />
        </YAxis>
        <ReferenceLine x={currentDateString} stroke="orange" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
