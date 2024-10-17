import { RouteObject } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InvoiceLibrary from "./pages/InvoiceLibrary";
import Layout from "./components/layout";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/invoices", element: <InvoiceLibrary /> },
    ],
  },
];
