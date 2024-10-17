import Dashboard from "./pages/Dashboard";
import InvoiceLibrary from "./pages/InvoiceLibrary";

export const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/invoices", element: <InvoiceLibrary /> },
];
