import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

export default function SpotPriceGraph({ data, currentHour }) {
  const [maxY, setMaxY] = React.useState(0);

  React.useEffect(() => {
    function calculateMaxY() {
      const dataMax = Math.max(...data.map((y) => y.value), 0);
      return Math.floor(dataMax) + 1;
    }

    setMaxY(calculateMaxY());
  }, [data]);

  function getTicksX() {
    const ticks = data.map((x) => x.timeStamp).filter((value, index, array) => index % 6 === 0 && index !== 0);
    return ticks;
  }

  function getTicksY() {
    const ticks = [...Array(maxY + 1).keys()];
    ticks.shift();
    return ticks;
  }

  function getCurrentValue() {
    return data.find((e) => e.timeStamp === currentHour?.timeStampShort)?.value;
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
        height={550}
        width="100%"
        data={data}
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
        <XAxis dataKey="timeStamp" tick={<CustomizedXAxisTick />} ticks={getTicksX()} />
        <YAxis domain={[0, maxY]} tick={<CustomizedYAxisTick />} ticks={getTicksY()} />
        <ReferenceLine x={currentHour?.timeStampShort} stroke="orange" label={getCurrentValue()} />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
}
