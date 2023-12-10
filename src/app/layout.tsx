import "./globals.css";

export const metadata = {
  title: "Infinite Story Machine",
  description: "Never ending stories, with a twist",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
