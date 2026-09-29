import CategoryChart from "../features/dashboard/CategoryChart";
import DashboardHeader from "../features/dashboard/DashboardHeader";
import DashboardStats from "../features/dashboard/DashboardStats";
import InventoryChart from "../features/dashboard/InventoryChart";
import LowStockList from "../features/dashboard/LowStockList";
import StockChart from "../features/dashboard/StockChart";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardStats />

      <div className="grid gap-6 xl:grid-cols-2">
        <InventoryChart />
        <CategoryChart />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <StockChart />
        <LowStockList />
      </div>
    </div>
  );
}
