import { Inter } from "next/font/google";
import "./globals.css";
import styles from "../styles/Home.module.css";
import MuteContextProvider from "./store/mute-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "New Year Countdown",
  description: "New Year Countdown",
};

export default function RootLayout({ children }) {
  return (
    <MuteContextProvider>
      <html lang="en">
        <body className={styles.testFont}>{children}</body>
      </html>
    </MuteContextProvider>
  );
}
