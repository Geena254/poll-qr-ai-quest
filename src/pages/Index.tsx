import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BarChart3, QrCode, Vote, ArrowRight, CheckCircle, Share2 } from "lucide-react";
import AuthDialog from "@/components/auth/AuthDialog";
import PollDashboard from "@/components/poll/PollDashboard";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const { user, loading, signOut } = useAuth();

  const handleAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setShowAuthDialog(true);
  };

  const handleAuthSuccess = (isRegistration = false) => {
    // Only close the dialog if it's a successful login, not registration
    if (!isRegistration) {
      setShowAuthDialog(false);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (user) {
    return <PollDashboard onLogout={() => signOut()} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Vote className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">PollShare</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => handleAuth("login")}>
                Sign In
              </Button>
              <Button onClick={() => handleAuth("register")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Create Polls, Share with QR Codes,
            <span className="text-primary"> Get Instant Results</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Build engaging polls in seconds and share them with the world using unique links and QR codes. 
            Perfect for events, classrooms, meetings, and more.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" onClick={() => handleAuth("register")} className="text-lg px-8">
              Start Creating Polls <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8">
              View Demo Poll
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need for effective polling
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features designed to make polling simple and engaging
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Vote className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Easy Poll Creation</h3>
                </div>
                <p className="text-muted-foreground">
                  Create polls with multiple choice options in just a few clicks. 
                  Customize questions and answers to fit your needs.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <QrCode className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold">QR Code Sharing</h3>
                </div>
                <p className="text-muted-foreground">
                  Generate QR codes instantly for your polls. Perfect for presentations, 
                  events, and quick mobile access.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold">Real-time Results</h3>
                </div>
                <p className="text-muted-foreground">
                  Watch votes come in live with beautiful charts and analytics. 
                  See results update in real-time as people vote.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Anonymous Voting</h3>
                </div>
                <p className="text-muted-foreground">
                  Anyone can vote using the shared link - no account required. 
                  Keep votes anonymous and engagement high.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-success/10 rounded-lg">
                    <Share2 className="h-6 w-6 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold">Multiple Sharing Options</h3>
                </div>
                <p className="text-muted-foreground">
                  Share via direct links, QR codes, or embed polls anywhere. 
                  Flexible sharing for any situation.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 bg-warning/10 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold">Poll Management</h3>
                </div>
                <p className="text-muted-foreground">
                  Edit, delete, and manage all your polls from a central dashboard. 
                  Keep track of your polling activity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to start polling?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of users who trust PollShare for their polling needs. 
            Create your first poll in under a minute.
          </p>
          <Button size="lg" onClick={() => handleAuth("register")} className="text-lg px-8">
            Create Your First Poll <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Vote className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">PollShare</span>
          </div>
          <p className="text-muted-foreground">
            The easiest way to create and share polls with QR codes.
          </p>
        </div>
      </footer>

      {/* Auth Dialog */}
      <AuthDialog 
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        mode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;