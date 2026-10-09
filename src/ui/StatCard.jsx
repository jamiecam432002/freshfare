import { Card, CardContent } from "@/components/ui/card";

const variants = {
  success: {
    container: "bg-brand-50",
    icon: "text-brand-600",
  },
  danger: {
    container: "bg-red-100",
    icon: "text-red-600",
  },
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  comparison,
  variant,
}) {
  const styles = variants[variant];
  return (
    <Card>
      <CardContent className="flex items-start gap-4 pt-2 pr-4 pb-2 pl-4">
        <div className={`rounded-control p-6 ${styles.container}`}>
          <Icon aria-hidden="true" className={`size-12 ${styles.icon}`} />
        </div>
        <div className="flex flex-col pt-2 pl-4">
          <h3 className="mb-2 font-medium">{title}</h3>
          <p className="mb-4 text-5xl font-bold">{value}</p>
          <p>{comparison}</p>
        </div>
      </CardContent>
    </Card>
  );
}
