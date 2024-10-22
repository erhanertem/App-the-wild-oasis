import styled from "styled-components";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useDarkMode } from "../../context/DarkModeContext";

import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

// const fakeData = [
//   { label: "Jan 09", totalSales: 480, extrasSales: 20 },
//   { label: "Jan 10", totalSales: 580, extrasSales: 100 },
//   { label: "Jan 11", totalSales: 550, extrasSales: 150 },
//   { label: "Jan 12", totalSales: 600, extrasSales: 50 },
//   { label: "Jan 13", totalSales: 700, extrasSales: 150 },
//   { label: "Jan 14", totalSales: 800, extrasSales: 150 },
//   { label: "Jan 15", totalSales: 700, extrasSales: 200 },
//   { label: "Jan 16", totalSales: 650, extrasSales: 200 },
//   { label: "Jan 17", totalSales: 600, extrasSales: 300 },
//   { label: "Jan 18", totalSales: 550, extrasSales: 100 },
//   { label: "Jan 19", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 20", totalSales: 800, extrasSales: 200 },
//   { label: "Jan 21", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 22", totalSales: 810, extrasSales: 50 },
//   { label: "Jan 23", totalSales: 950, extrasSales: 250 },
//   { label: "Jan 24", totalSales: 970, extrasSales: 100 },
//   { label: "Jan 25", totalSales: 900, extrasSales: 200 },
//   { label: "Jan 26", totalSales: 950, extrasSales: 300 },
//   { label: "Jan 27", totalSales: 850, extrasSales: 200 },
//   { label: "Jan 28", totalSales: 900, extrasSales: 100 },
//   { label: "Jan 29", totalSales: 800, extrasSales: 300 },
//   { label: "Jan 30", totalSales: 950, extrasSales: 200 },
//   { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
//   { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
//   { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
//   { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
//   { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
//   { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
//   { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
// ];

function SalesChart({ recentBookings }) {
  const unProcessedGraphData = recentBookings
    .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    .map((booking) => {
      return {
        label: new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "numeric",
        }).format(new Date(booking.created_at)),
        totalSales: booking.totalPrice,
        extrasSales: booking.extrasPrice,
      };
    });
  const aggregatedData = unProcessedGraphData.reduce((acc, curr) => {
    // Check if the current label already exists in the accumulator
    const existingInAccumulator = acc.find((item) => item.label === curr.label);
    // If exists in the accumulator, sum up corresponding fields
    if (existingInAccumulator) {
      existingInAccumulator.totalSales += curr.totalSales;
      existingInAccumulator.extrasSales += curr.extrasSales;
    } else {
      // If ti doesn't exit, add it to the accumulator
      acc.push({ ...curr });
    }

    return acc;
  }, []);
  console.log(aggregatedData);

  const { isDarkMode } = useDarkMode();
  const colors = !isDarkMode
    ? {
        // totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        totalSales: {
          stroke: "#4f46e5",
          fill: "url(#colorGradientTotalSalesDarkMode)",
        },
        // extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        extrasSales: {
          stroke: "#22c55e",
          fill: "url(#colorGradientExtrasSalesDarkMode)",
        },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        // totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        totalSales: {
          stroke: "#4f46e5",
          fill: "url(#colorGradientTotalSales)",
        },
        // extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        extrasSales: {
          stroke: "#16a34a",
          fill: "url(#colorGradientExtrasSales)",
        },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">Sales</Heading>

      {/* RECHARTS CONTAINER TO MAKE GRAPH FLUID */}
      {/* If no fluidity is aimed, provide width and height attrs in AreaChart */}
      <ResponsiveContainer
        height={300}
        width="100%"
      >
        {/* Feed the data to AreaChart */}
        <AreaChart data={aggregatedData}>
          {/* Define the linear gradient */}
          <defs>
            <linearGradient
              id="colorGradientTotalSales"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="30%"
                stopColor="#4f46e5"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="#c7d2fe"
                stopOpacity={0.3}
              />
            </linearGradient>
            <linearGradient
              id="colorGradientTotalSalesDarkMode"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="30%"
                stopColor="#4f46e5"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="#4f46e5"
                stopOpacity={0.3}
              />
            </linearGradient>

            <linearGradient
              id="colorGradientExtrasSales"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="30%"
                stopColor="#16a34a"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="#dcfce7"
                stopOpacity={0.3}
              />
            </linearGradient>
            <linearGradient
              id="colorGradientExtrasSalesDarkMode"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="30%"
                stopColor="#22c55e"
                stopOpacity={1}
              />
              <stop
                offset="100%"
                stopColor="#22c55e"
                stopOpacity={0.3}
              />
            </linearGradient>
          </defs>

          {/* VISUAL PARTS */}
          {/* Axis definitions */}
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          {/* Define cartesian grid for the graph */}
          <CartesianGrid strokeDasharray="4" />
          {/* Tooltip configuration */}
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {/* GRAPH CONTEXT */}
          <Area
            dataKey="totalSales" // Visualizes the total sales data
            type="monotone" // Defines how the line is drawn. other options: linear, step, basis, etc.
            stroke={colors.totalSales.stroke} // Line color
            fill={colors.totalSales.fill} // Area fill color
            strokeWidth={2} //Line width
            name="Total Sales" // Tooltip tag
            unit="$" // Tooltip unit
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Extras Sales"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
