import { Category, Chart, Money, ShoppingCart, UserAdd } from "iconsax-react";

interface NavLinksProps {
  title: string;
  path: string;
  icon: React.ReactNode;
}
export const AdminDashboardLinks: NavLinksProps[] = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <Category size={24} color="currentColor" />,
  },
  {
    title: "Product",
    path: "/admin/order-management",
    icon: <ShoppingCart size={24} />,
  },
  {
    title: "Customers",
    path: "/admin/user-management",
    icon: <UserAdd size={24} />,
  },
  {
    title: "Transactions",
    path: "/admin/inventory-management",
    icon: <Money size={25} />,
  },
  {
    title: "Engagements",
    path: "/admin/distributors",
    icon: <Chart size={25} />,
  },
];
