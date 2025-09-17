import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Multi-Tenant Notes",
  description: "A notes app with multi-tenant support",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-light">
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
