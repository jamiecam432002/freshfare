import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useCategorySummary } from "../hooks/useCategorySummary";
import Spinner from "@/ui/Spinner";
import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { useMemo } from "react";
import { CHART_COLORS } from "@/utils/constants";

function CategoryTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const category = payload[0].payload;

  return (
    <div className="rounded-control border-grey-200 shadow-card border bg-white px-3 py-2">
      <p className="text-grey-900 font-medium">{category.category_name}</p>

      <p className="text-grey-600 text-sm">{category.product_count} products</p>
    </div>
  );
}

function CategoryLegend({ data, total }) {
  return (
    <ul aria-label="Products by category" className="space-y-3">
      {data.map((category) => {
        console.log(CHART_COLORS["category.category_name"]);
        const percentage =
          total > 0 ? (category.product_count / total) * 100 : 0;

        return (
          <li
            key={category.category_name}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-4"
          >
            <span
              aria-hidden="true"
              className="size-4 rounded-full"
              style={{ backgroundColor: CHART_COLORS[category.category_name] }}
            />
            <span className="text-grey-700 text-[1.3rem] font-medium">
              {category.category_name}
            </span>
            <span className="text-grey-500 text-[1.3rem] tabular-nums">
              {category.product_count}
              <span className="ml-1">({percentage.toFixed(1)}%)</span>
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function CategorySector(props) {
  return <Sector {...props} fill={props.fill} />;
}

export default function CategoryChart() {
  const { data = [], isPending } = useCategorySummary();

  const chartData = useMemo(() => {
    const categories = data ?? [];
    return categories.map((category) => ({
      ...category,
      fill: CHART_COLORS[category.category_name],
    }));
  }, [data]);

  const totalProducts = chartData.reduce(
    (total, category) => total + category.product_count,
    0,
  );

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <h3 className="text-[2rem] leading-8 font-bold">
            Products by Category
          </h3>
          <p className="text-grey-500 text-[1.4rem]">
            Distribution of all products in inventory.
          </p>
        </CardHeader>
        <CardContent className="grid items-center gap-6 md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="relative h-90 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="product_count"
                  nameKey="category_name"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={2}
                  shape={CategorySector}
                ></Pie>
                <Tooltip content={<CategoryTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <CategoryLegend data={chartData} total={totalProducts} />
        </CardContent>
      </Card>
    </div>
  );
}
