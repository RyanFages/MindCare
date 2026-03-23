import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import bcrypt from "bcryptjs";

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

interface AirtableRecord {
    id: string;
    fields: {
        Username?: string;
        Email?: string;
        PasswordHash?: string;
    };
}

interface AirtableListResponse {
    records: AirtableRecord[];
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: async () => false,
    logout: () => {},
    signup: async () => false,
});

export const useAuth = () => useContext(AuthContext);

const AIRTABLE_TOKEN = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_USERS_TABLE =
    import.meta.env.VITE_AIRTABLE_USERS_TABLE || "Users";

const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
    AIRTABLE_USERS_TABLE,
)}`;

const logAirtableHttpError = async (label: string, response: Response) => {
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

const escapeFormulaValue = (value: string) => value.replace(/'/g, "\\'");

const getHeaders = () => ({
    Authorization: `Bearer ${AIRTABLE_TOKEN}`,
    "Content-Type": "application/json",
});

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
            if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_USERS_TABLE) {
                console.error("Variables Airtable manquantes (.env)", {
                    hasToken: !!AIRTABLE_TOKEN,
                    hasBaseId: !!AIRTABLE_BASE_ID,
                    hasUsersTable: !!AIRTABLE_USERS_TABLE,
                });
                return false;
            }

            // On cherche uniquement par email
            const formula = `{Email}='${escapeFormulaValue(email)}'`;
            const url = `${AIRTABLE_URL}?maxRecords=1&filterByFormula=${encodeURIComponent(formula)}`;

            const response = await fetch(url, { headers: getHeaders() });
            if (!response.ok) {
                await logAirtableHttpError("login/select", response);
                return false;
            }

            const data: AirtableListResponse = await response.json();
            if (!data.records?.length) return false;

            const record = data.records[0];
            const storedHash = record.fields.PasswordHash || "";

            // Vérification bcrypt
            const isValid = await bcrypt.compare(password, storedHash);
            if (!isValid) return false;

            const newUser: User = {
                email: record.fields.Email || email,
                name: record.fields.Username || "Utilisateur",
            };

            localStorage.setItem("mindcare_user", JSON.stringify(newUser));
            setUser(newUser);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error("Erreur login Airtable:", error);
            return false;
        }
    };

    const signup = async (
        email: string,
        password: string,
        name: string,
    ): Promise<boolean> => {
        try {
            if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID || !AIRTABLE_USERS_TABLE) {
                console.error("Variables Airtable manquantes (.env)", {
                    hasToken: !!AIRTABLE_TOKEN,
                    hasBaseId: !!AIRTABLE_BASE_ID,
                    hasUsersTable: !!AIRTABLE_USERS_TABLE,
                });
                return false;
            }

            const existsFormula = `{Email}='${escapeFormulaValue(email)}'`;
            const existsUrl = `${AIRTABLE_URL}?maxRecords=1&filterByFormula=${encodeURIComponent(existsFormula)}`;
            const existsResp = await fetch(existsUrl, {
                headers: getHeaders(),
            });
            if (!existsResp.ok) {
                await logAirtableHttpError("signup/check-existing", existsResp);
                return false;
            }

            const existsData: AirtableListResponse = await existsResp.json();
            if (existsData.records?.length) {
                return false;
            }

            // Hash bcrypt avant stockage
            const passwordHash = await bcrypt.hash(password, 10);

            const createResp = await fetch(AIRTABLE_URL, {
                method: "POST",
                headers: getHeaders(),
                body: JSON.stringify({
                    records: [
                        {
                            fields: {
                                Username: name,
                                Email: email,
                                PasswordHash: passwordHash,
                            },
                        },
                    ],
                }),
            });

            if (!createResp.ok) {
                await logAirtableHttpError("signup/create", createResp);
                return false;
            }

            const newUser: User = { email, name };
            localStorage.setItem("mindcare_user", JSON.stringify(newUser));
            setUser(newUser);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error("Erreur signup Airtable:", error);
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
