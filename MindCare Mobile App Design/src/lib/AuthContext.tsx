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

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: async () => false,
    logout: () => {},
    signup: async () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Initialiser depuis localStorage
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
        // Pour le moment, utiliser les credentials fixes
        if (email === "admin@gmail.com" && password === "ADMIN") {
            const newUser = {
                email,
                name: "Admin",
            };
            localStorage.setItem("mindcare_user", JSON.stringify(newUser));
            setUser(newUser);
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const signup = async (
        email: string,
        password: string,
        name: string,
    ): Promise<boolean> => {
        // Pour le moment, accepter n'importe quels credentials et les stocker
        const newUser = {
            email,
            name,
        };
        localStorage.setItem("mindcare_user", JSON.stringify(newUser));
        setUser(newUser);
        setIsAuthenticated(true);
        return true;
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
