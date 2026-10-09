import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function InventoryChart() {
  return (
    <div>
      <Card>
        <CardHeader>
          <h3 className="text-[2rem] leading-8 font-bold">
            Inventory Activity
          </h3>
          <p className="text-grey-500 text-[1.4rem]">
            Total inventory value over time.
          </p>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
