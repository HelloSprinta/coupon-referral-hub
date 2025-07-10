import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in real app you'd call an API
    if (email && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      {/* Fondo decorativo con colores Sprinta */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-primary/5 to-transparent rounded-full"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-secondary/10 to-transparent rounded-full"></div>
      </div>

      <div className="w-full max-w-md space-y-8 p-8 relative z-10">
        {/* Logo y título con colores Sprinta */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg bg-transparent p-0">
            <img src="https://agents.sprinta.ai/sprinta-logo.svg" alt="Sprinta Logo" className="w-16 h-16 object-contain" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sprinta Referidos</h1>
            <p className="text-muted-foreground mt-2">Gestiona tus referidos de manera inteligente</p>
          </div>
        </div>
        
        {/* Formulario de login con colores Sprinta */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input text-foreground border-border focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                Contraseña
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input text-foreground border-border focus:ring-primary focus:border-primary"
                required
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2.5 rounded-lg transition-colors"
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          Al iniciar sesión, aceptas nuestros{" "}
          <a href="#" className="text-primary hover:text-primary/80">
            Términos de Servicio
          </a>{" "}
          y{" "}
          <a href="#" className="text-primary hover:text-primary/80">
            Política de Privacidad
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;