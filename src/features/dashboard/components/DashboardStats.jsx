import StatCard from "@/ui/StatCard";
import { motion } from "motion/react";
import { LuBadgeDollarSign } from "react-icons/lu";
import { LuLeaf } from "react-icons/lu";
import { IoAlertOutline } from "react-icons/io5";
import { IoLogoStackoverflow } from "react-icons/io5";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { formatCurrency } from "@/utils/helpers";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function DashboardStats() {
  const { data: stats = {}, isPending, isError } = useDashboardStats();

  const activePercentage = stats.totalProducts
    ? ((stats.activeProducts / stats.totalProducts) * 100).toFixed(1)
    : 0;
  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      description: "Products in your catalog",
      icon: IoLogoStackoverflow,
      variant: "success",
    },
    {
      title: "Active Products",
      value: stats.activeProducts,
      description: `${activePercentage}% of all products`,
      icon: LuLeaf,
      variant: "success",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      description: "Registered suppliers",
      icon: IoAlertOutline,
      variant: "danger",
    },
    {
      title: "Investory Value",
      value: formatCurrency(stats.inventoryValue),
      description: "Products needing attention",
      icon: LuBadgeDollarSign,
      variant: "success",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {cards.map((statCard) => (
        <motion.div variants={card}>
          <StatCard key={statCard.title} {...statCard} />
        </motion.div>
      ))}
    </motion.div>
  );
}
