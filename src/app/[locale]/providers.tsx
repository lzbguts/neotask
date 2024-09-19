"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  messages: AbstractIntlMessages;
  locale: string;
  timezone: string;
}

const queryClient = new QueryClient();

export function Providers({
  children,
  themeProps,
  messages,
  locale,
  timezone,
}: ProvidersProps) {
  const router = useRouter();

  return (
    <SessionProvider>
      <NextIntlClientProvider
        locale={locale}
        messages={messages}
        timeZone={timezone}
      >
        <QueryClientProvider client={queryClient}>
          <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
            <Toaster />
          </NextUIProvider>
        </QueryClientProvider>
      </NextIntlClientProvider>
    </SessionProvider>
  );
}
