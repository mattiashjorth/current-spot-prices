import React from "react";
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";
import useWindowSize from "./useWindowSize";

export default function SpotPriceGraph({ data, currentHour }) {
  const [maxY, setMaxY] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState();
  const unit = "kr/kWh";
  const windowSize = useWindowSize();

  React.useEffect(() => {
    function calculateMaxY() {
      const dataMax = Math.max(...data.map((y) => y.value), 0);
      return Math.floor(dataMax) + 1;
    }
    setMaxY(calculateMaxY());
  }, [data]);

  React.useEffect(() => {
    setCurrentIndex(data.findIndex((x) => x.timeStamp === currentHour.timeStampShort));
  }, [currentHour.timeStampShort, data]);

  function getTicksX() {
    const ticks = data.map((x) => x.timeStamp).filter((value, index, array) => index % 6 === 0 && index !== 0);
    return ticks;
  }

  function getTicksY() {
    const ticks = [...Array(maxY + 1).keys()];
    ticks.shift();
    return ticks;
  }

  function CustomizedLineLabel(props) {
    const { x, y, value, index } = props;
    if (index === currentIndex) {
      return (
        <text x={x} y={y} dy={-30} dx={11} fill="#DDD" font-weight="bold" fontSize={16} textAnchor="middle">
          {value.toFixed(2)} {unit}
        </text>
      );
    }
    return null;
  }

  function CustomizedXAxisTick(props) {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#DDD" transform="rotate(-35)">
          {payload.value}
        </text>
      </g>
    );
  }

  function CustomizedYAxisTick(props) {
    const { x, y, payload } = props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={0} textAnchor="end" fill="#DDD" transform="rotate(-35)">
          {payload.value} {unit}
        </text>
      </g>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#8884d8",
            color: "#2e4355",
            padding: "1px 15px",
            border: "solid",
            borderRadius: "15px",
            fontWeight: "bold",
            opacity: "0.8",
          }}
        >
          <p>{label}</p>
          <p>
            {payload[0].value.toFixed(2)} {unit}
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" aspect={1.2} maxHeight={windowSize.height - 100}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 70,
        }}
      >
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          label={<CustomizedLineLabel />}
          activeDot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 4, r: 9 }}
          dot={{ fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 5 }}
          strokeWidth="4"
        />
        <CartesianGrid horizontal="true" vertical="" stroke="#243240" />
        <XAxis dataKey="timeStamp" tick={<CustomizedXAxisTick />} ticks={getTicksX()} />
        <YAxis domain={[0, maxY]} tick={<CustomizedYAxisTick />} ticks={getTicksY()} />
        <ReferenceLine x={currentHour?.timeStampShort} stroke="orange" strokeWidth="0.5" />
        <Tooltip cursor={false} offset={-100} content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}
