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
    const { x, y, value } = props;
    return (
      <text x={x} y={y} dy={-12} fill="#fff" fontSize={14} fontStyle="italic" textAnchor="middle">
        {value.toFixed(2)}
      </text>
    );
  }

  function CustomizedXAxisTick(props) {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#fff" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }

  function CustomizedYAxisTick(props) {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={0} textAnchor="end" fill="#fff" transform="rotate(-35)">
          {payload.value} kr/kWh
        </text>
      </g>
    );
  }

  return (
    <ResponsiveContainer width="100%" aspect={2} maxHeight={1000}>
      <LineChart
        height={500}
        width={250}
        data={data}
        margin={{
          top: 15,
          right: 70,
          left: 30,
          bottom: 70,
        }}
      >
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          label={<CustomizedLineLabel />}
          activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 5, r: 10 }}
          dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }}
          strokeWidth="5"
        />
        <CartesianGrid horizontal="true" vertical="" stroke="#243240" />
        <XAxis dataKey="timeStamp" tick={<CustomizedXAxisTick />} ticks={getTicksX()} />
        <YAxis domain={[0, maxY]} tick={<CustomizedYAxisTick />} ticks={getTicksY()} />
        <ReferenceLine x={currentHour?.timeStampShort} stroke="orange" label={getCurrentValue()} />
        <Tooltip
          contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }}
          itemStyle={{ color: "#ffff" }}
          cursor={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
