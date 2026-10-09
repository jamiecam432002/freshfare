import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function LowStockList() {
  return (
    <div>
      <Card>
        <CardHeader>
          <h3 className="text-[2rem] leading-8 font-bold">
            Low Stock Products
          </h3>
          <p className="text-grey-500 text-[1.4rem]">
            Products that are at or below reorder point.
          </p>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
