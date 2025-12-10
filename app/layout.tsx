
import "./globals.css";
import Navbar from "@/components/Navbar";
import NotificationContainer from "@/components/ui/notification-container";
import { NotificationContextProvider } from "@/store/notification-context";
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
          {children}
<NotificationContainer />
</NotificationContextProvider>
      </body>
    </html>
  );
}
