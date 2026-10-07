import StatCard from "@/ui/StatCard";
import { motion } from "motion/react";
import { LuBadgeDollarSign } from "react-icons/lu";
import { LuLeaf } from "react-icons/lu";
import { IoAlertOutline } from "react-icons/io5";
import { IoLogoStackoverflow } from "react-icons/io5";

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
    y: 20,
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
        <StatCard
          title="Total Products"
          value="147"
          comparison="+6% vs last 30 days"
          icon={IoLogoStackoverflow}
          variant="success"
        />
      </motion.div>

      <motion.div variants={card}>
        <StatCard
          title="Active Products"
          value="132"
          comparison="+4% vs last 30 days"
          icon={LuLeaf}
          variant="success"
        />
      </motion.div>

      <motion.div variants={card}>
        <StatCard
          title="Out of Stock"
          value="8"
          comparison="+2 vs last 30 days"
          icon={IoAlertOutline}
          variant="danger"
        />
      </motion.div>

      <motion.div variants={card}>
        <StatCard
          title="Inventory Value"
          value="$48,290"
          comparison="+8% vs last 30 days"
          icon={LuBadgeDollarSign}
          variant="success"
        />
      </motion.div>
    </motion.div>
  );
}
