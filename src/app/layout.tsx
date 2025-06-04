import "./globals.css";
import localFont from 'next/font/local'

 const kongText = localFont({
  src: '../fonts/kongtext/kongtext.ttf',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kongText.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
