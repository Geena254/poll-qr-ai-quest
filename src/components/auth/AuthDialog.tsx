import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Vote, User, Mail, Lock, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "login" | "register";
  onSuccess: () => void;
}

const AuthDialog = ({ open, onOpenChange, mode, onSuccess }: AuthDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: currentMode === "login" ? "Welcome back!" : "Account created!",
        description: currentMode === "login" 
          ? "You have successfully signed in." 
          : "Your account has been created successfully.",
      });
      onSuccess();
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleMode = () => {
    setCurrentMode(currentMode === "login" ? "register" : "login");
    setFormData({ name: "", email: "", password: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
            <Vote className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl">
            {currentMode === "login" ? "Welcome back" : "Create your account"}
          </DialogTitle>
          <p className="text-muted-foreground">
            {currentMode === "login" 
              ? "Sign in to access your polls and dashboard" 
              : "Get started with PollShare - it's free!"}
          </p>
        </DialogHeader>

        <Card className="p-6 mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {currentMode === "register" && (
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Full Name</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Email Address</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Password</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                "Processing..."
              ) : (
                <>
                  {currentMode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {currentMode === "login" 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button 
                type="button"
                onClick={toggleMode}
                className="text-primary hover:underline font-medium"
              >
                {currentMode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;