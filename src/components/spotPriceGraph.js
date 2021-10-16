import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

export default function SpotPriceGraph({ spotPricesGraphData, currentHour }) {
  const [maxY, setMaxY] = React.useState(0);
  const [ticksX, setTicksX] = React.useState([]);
  const [ticksY, setTicksY] = React.useState([]);

  React.useEffect(() => {
    setMaxY(calculateMaxY(spotPricesGraphData));
    setTicksX(getTicksX(spotPricesGraphData));
    setTicksY(getTicksY());
  }, [spotPricesGraphData]);

  function calculateMaxY(data) {
    const dataMax = Math.max(...data.map((y) => y.value), 0);
    return Math.floor(dataMax) + 1;
  }

  function getTicksX(data) {
    const ticks = data.map((x) => x.timeStamp).filter((value, index, array) => index % 6 === 0 && index !== 0);

    return ticks;
  }

  function getTicksY() {
    let ticks = [...Array(3).keys()];
    ticks.shift();
    return ticks;
  }

  function CustomizedLineLabel(props) {
    const { x, y, stroke, value } = props;
    return (
      <text x={x} y={y} dy={-8} fill={stroke} fontSize={10} fontStyle="italic" textAnchor="middle">
        {value.toFixed(2)}
      </text>
    );
  }

  function CustomizedXAxisTick(props) {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }

  function CustomizedYAxisTick(props) {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={0} textAnchor="end" fill="#666" transform="rotate(-35)">
          {payload.value} kr/kWh
        </text>
      </g>
    );
  }

  return (
    <ResponsiveContainer height={550} width="100%">
      <LineChart
        data={spotPricesGraphData}
        margin={{
          top: 20,
          right: 40,
          left: 40,
          bottom: 100,
        }}
      >
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          label={<CustomizedLineLabel />}
          activeDot={{ r: 7 }}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
        <XAxis dataKey="timeStamp" tick={<CustomizedXAxisTick />} ticks={ticksX} />
        <YAxis domain={[0, maxY]} tick={<CustomizedYAxisTick />} ticks={ticksY} />
        <ReferenceLine x={currentHour?.timeStampShort} stroke="orange" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
