import { NotificationContextProvider } from "@/store/notification-context";
import NotificationContainer from "@/components/ui/NotificationContainer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "My App",
  description: "Example using notification context",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NotificationContextProvider>
          <Navbar />
          <NotificationContainer />  {/* client component */}
          {children}
        </NotificationContextProvider>
      </body>
    </html>
  );
}
