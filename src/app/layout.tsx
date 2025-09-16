import "./globals.css";
// import { I18nextProvider } from 'react-i18next';
// import i18n from '../i18n';
import { Roboto } from "next/font/google";

export const roboto = Roboto({ subsets: ['latin'], weight: ['400', '600'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {/* <I18nextProvider i18n={i18n}/> */}
        {children}
      </body>
    </html>
  );
}
