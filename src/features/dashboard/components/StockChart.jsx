import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useCategorySummary } from "../hooks/useCategorySummary";
import Spinner from "@/ui/Spinner";
import {
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { CHART_COLORS } from "@/utils/constants";

function CategoryBar({ payload, ...props }) {
  return <Rectangle {...props} fill={payload.fill} radius={[6, 6, 0, 0]} />;
}

export default function StockChart() {
  const { data = [], isPending } = useCategorySummary();

  const chartData = useMemo(
    () =>
      (data ?? []).map((category) => ({
        ...category,
        fill: CHART_COLORS[category.category_name] ?? "#808080",
      })),
    [data],
  );

  if (isPending) return <Spinner />;

  return (
    <Card>
      <CardHeader>
        <h3 className="text-[2rem] leading-8 font-bold">Stock by Category</h3>
        <p className="text-grey-500 text-[1.4rem]">
          Current stock quantity by category.
        </p>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 8,
              right: 8,
              bottom: 8,
              left: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#e3e8e5"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="category_name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#68756d", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#68756d", fontSize: 12 }}
            />

            <Tooltip />

            <Bar
              dataKey="units_in_stock"
              shape={CategoryBar}
              radius={[6, 6, 0, 0]}
              animationDuration={700}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
