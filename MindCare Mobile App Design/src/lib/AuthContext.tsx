import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

interface User {
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    signup: (email: string, password: string, name: string) => Promise<boolean>;
}

interface AuthApiResponse {
    user?: User;
    message?: string;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: async () => false,
    logout: () => {},
    signup: async () => false,
});

export const useAuth = () => useContext(AuthContext);

const API_BASE_URL =
    (import.meta.env.VITE_API_URL as string | undefined) ||
    "http://localhost:3000/api";

const logApiHttpError = async (label: string, response: Response) => {
    let body = "";
    try {
        body = await response.text();
    } catch {
        body = "<unreadable body>";
    }
    console.error(`${label} failed`, {
        status: response.status,
        statusText: response.statusText,
        body,
    });
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("mindcare_user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error(
                    "Erreur lors du chargement de l'utilisateur:",
                    error,
                );
                localStorage.removeItem("mindcare_user");
            }
        }
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                await logApiHttpError("login", response);
                return false;
            }

            const data: AuthApiResponse = await response.json();
            if (!data.user) return false;

            const newUser: User = data.user;

            localStorage.setItem("mindcare_user", JSON.stringify(newUser));
            setUser(newUser);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error("Erreur login API:", error);
            return false;
        }
    };

    const signup = async (
        email: string,
        password: string,
        name: string,
    ): Promise<boolean> => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                    name,
                }),
            });

            if (!response.ok) {
                if (response.status === 409) {
                    throw new Error("EMAIL_ALREADY_EXISTS");
                }
                await logApiHttpError("signup", response);
                return false;
            }

            const data: AuthApiResponse = await response.json();
            if (!data.user) return false;

            const newUser: User = data.user;
            localStorage.setItem("mindcare_user", JSON.stringify(newUser));
            setUser(newUser);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "EMAIL_ALREADY_EXISTS"
            ) {
                throw error;
            }
            console.error("Erreur signup API:", error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("mindcare_user");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, login, logout, signup }}
        >
            {children}
        </AuthContext.Provider>
    );
};
