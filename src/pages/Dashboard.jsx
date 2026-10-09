import CategoryChart from "../features/dashboard/components/CategoryChart";
import DashboardHeader from "../features/dashboard/components/DashboardHeader";
import DashboardStats from "../features/dashboard/components/DashboardStats";
import InventoryChart from "../features/dashboard/components/InventoryChart";
import LowStockList from "../features/dashboard/components/LowStockList";
import StockChart from "../features/dashboard/components/StockChart";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <DashboardStats />

      <div className="grid grid-cols-[2fr_1fr] gap-6">
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
