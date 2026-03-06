import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import Screen from "@/components/mindcare/Screen";
import BrandLogo from "@/components/mindcare/BrandLogo";
import McButton from "@/components/mindcare/McButton";
import { H1, TextBody } from "@/components/mindcare/Typography";

interface LoginScreenProps {
    onLoginSuccess: () => void;
}

const LoginScreen = ({ onLoginSuccess }: LoginScreenProps) => {
    const { login, signup } = useAuth();
    const [isSignup, setIsSignup] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            let success = false;
            if (isSignup) {
                success = await signup(email, password, name);
            } else {
                success = await login(email, password);
            }

            if (success) {
                onLoginSuccess();
            } else {
                setError(
                    isSignup
                        ? "Une erreur est survenue lors de l'inscription"
                        : "Email ou mot de passe incorrect. Essayez admin@gmail.com / ADMIN",
                );
            }
        } catch (err) {
            setError("Une erreur est survenue");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Screen className="bg-card">
            <div className="min-h-full flex flex-col items-center justify-center px-8 py-12">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    <BrandLogo size="medium" className="mx-auto mb-8" />
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-full text-center mb-8"
                >
                    <H1 className="mb-2 text-[24px]">
                        {isSignup ? "Créer un compte" : "Connexion"}
                    </H1>
                    <TextBody className="text-muted-foreground">
                        {isSignup ? "Rejoins MindCare" : "Accède à ton espace"}
                    </TextBody>
                </motion.div>

                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm space-y-4"
                >
                    {/* Nom (seulement pour inscription) */}
                    {isSignup && (
                        <div>
                            <label className="text-sm font-medium text-foreground block mb-2">
                                Nom
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Ton nom"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required={isSignup}
                            />
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="text-sm font-medium text-foreground block mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                            />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="adresse e-mail"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <label className="text-sm font-medium text-foreground block mb-2">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <Lock
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="mot de passe"
                                className="w-full pl-12 pr-12 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Message d'erreur */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center font-medium"
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Bouton de soumission */}
                    <McButton
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6"
                    >
                        {loading
                            ? "Chargement..."
                            : isSignup
                              ? "S'inscrire"
                              : "Se connecter"}
                    </McButton>

                    {/* Interrupteur inscription/connexion */}
                    <div className="text-center pt-2">
                        <p className="text-sm text-muted-foreground">
                            {isSignup
                                ? "Tu as déjà un compte? "
                                : "Tu n'as pas de compte? "}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignup(!isSignup);
                                    setError("");
                                    setEmail("");
                                    setPassword("");
                                    setName("");
                                }}
                                className="text-primary font-semibold hover:underline"
                            >
                                {isSignup ? "Se connecter" : "S'inscrire"}
                            </button>
                        </p>
                    </div>

                    {/* Hint pour les tests */}
                    {!isSignup && (
                        <div className="text-xs text-muted-foreground text-center p-3 rounded-lg bg-background/50 border border-border/50 mt-6">
                            Demo: admin@gmail.com / ADMIN
                        </div>
                    )}
                </motion.form>
            </div>
        </Screen>
    );
};

export default LoginScreen;
