import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { getMessages, getTimeZone } from "next-intl/server";

import { Providers } from "./providers";
import { Social } from "./social";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import AccountDropdown from "@/components/AccountDropdown";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  const timezone = await getTimeZone();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers
          locale={locale}
          messages={messages}
          themeProps={{ attribute: "class", defaultTheme: "light" }}
          timezone={timezone}
        >
          {user && (
            <header className="absolute top-0 left-0 right-0 bg-background text-foreground text-center p-4 flex flex-row justify-end gap-4">
              <AccountDropdown user={user} />
            </header>
          )}
          <main className="text-foreground bg-background min-h-screen flex flex-col justify-center items-center">
            {children}
          </main>
          <footer className="absolute bottom-0 left-0 right-0 bg-background text-foreground text-center p-4 flex flex-row justify-center gap-4">
            <Social />
          </footer>
        </Providers>
      </body>
    </html>
  );
}
