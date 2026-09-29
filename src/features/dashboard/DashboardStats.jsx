import StatCard from "@/ui/StatCard";
import { motion } from "motion/react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function DashboardStats() {
  return (
    <motion.div
      className="grid grid-cols-4 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={card}>
        <StatCard title="Products" value="This is the paragraph card content" />
      </motion.div>

      <motion.div variants={card}>
        <StatCard
          title="Inventory"
          value="This is the paragraph card content"
        />
      </motion.div>

      <motion.div variants={card}>
        <StatCard
          title="Suppliers"
          value="This is the paragraph card content"
        />
      </motion.div>

      <motion.div variants={card}>
        <StatCard
          title="Low Stock"
          value="This is the paragraph card content"
        />
      </motion.div>
    </motion.div>
  );
}
