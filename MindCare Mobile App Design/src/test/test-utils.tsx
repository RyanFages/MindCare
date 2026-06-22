import { ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { AuthProvider } from "@/lib/AuthContext";
import { LanguageProvider } from "@/lib/LanguageContext";

const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

const AllProviders = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={createTestQueryClient()}>
        <AuthProvider>
            <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export const renderWithProviders = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });
