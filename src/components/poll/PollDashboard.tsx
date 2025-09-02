import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Vote, Plus, BarChart3, QrCode, Share2, Edit, Trash2, 
  LogOut, Users, TrendingUp, Clock, Eye
} from "lucide-react";
import CreatePollDialog from "./CreatePollDialog";
import PollResultsDialog from "./PollResultsDialog";
import SharePollDialog from "./SharePollDialog";

interface Poll {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: { [key: string]: number };
  totalVotes: number;
  createdAt: string;
  isActive: boolean;
}

interface PollDashboardProps {
  onLogout: () => void;
}

const PollDashboard = ({ onLogout }: PollDashboardProps) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showResultsDialog, setShowResultsDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState<Poll | null>(null);
  
  // Mock data for demonstration
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: "1",
      title: "Favorite Programming Language",
      description: "What's your go-to programming language for web development?",
      options: ["JavaScript", "Python", "TypeScript", "Go"],
      votes: { "JavaScript": 45, "Python": 32, "TypeScript": 28, "Go": 15 },
      totalVotes: 120,
      createdAt: "2024-01-15",
      isActive: true,
    },
    {
      id: "2", 
      title: "Meeting Time Preference",
      description: "When should we schedule our weekly team meeting?",
      options: ["Monday 9 AM", "Tuesday 2 PM", "Wednesday 10 AM", "Friday 3 PM"],
      votes: { "Monday 9 AM": 8, "Tuesday 2 PM": 15, "Wednesday 10 AM": 22, "Friday 3 PM": 5 },
      totalVotes: 50,
      createdAt: "2024-01-12",
      isActive: false,
    },
  ]);

  const handleCreatePoll = (pollData: any) => {
    const newPoll: Poll = {
      id: Date.now().toString(),
      title: pollData.title,
      description: pollData.description,
      options: pollData.options,
      votes: pollData.options.reduce((acc: any, option: string) => {
        acc[option] = 0;
        return acc;
      }, {}),
      totalVotes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isActive: true,
    };
    setPolls([newPoll, ...polls]);
    setShowCreateDialog(false);
  };

  const handleViewResults = (poll: Poll) => {
    setSelectedPoll(poll);
    setShowResultsDialog(true);
  };

  const handleSharePoll = (poll: Poll) => {
    setSelectedPoll(poll);
    setShowShareDialog(true);
  };

  const handleDeletePoll = (pollId: string) => {
    setPolls(polls.filter(p => p.id !== pollId));
  };

  const getTotalVotes = () => polls.reduce((sum, poll) => sum + poll.totalVotes, 0);
  const getActivePollsCount = () => polls.filter(poll => poll.isActive).length;

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
              <Button onClick={() => setShowCreateDialog(true)} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Poll</span>
              </Button>
              <Button variant="ghost" onClick={onLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Polls</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{polls.length}</div>
              <p className="text-xs text-muted-foreground">
                {getActivePollsCount()} active polls
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getTotalVotes()}</div>
              <p className="text-xs text-muted-foreground">
                Across all polls
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {polls.length > 0 ? Math.round(getTotalVotes() / polls.length) : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Avg votes per poll
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Polls List */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Polls</h2>
            {polls.length === 0 && (
              <Button onClick={() => setShowCreateDialog(true)} className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Your First Poll</span>
              </Button>
            )}
          </div>

          {polls.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <div className="mx-auto p-4 bg-muted rounded-full w-fit">
                  <Vote className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No polls yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Get started by creating your first poll. You can share it with others using a link or QR code.
                </p>
                <Button onClick={() => setShowCreateDialog(true)} size="lg">
                  Create Your First Poll
                </Button>
              </div>
            </Card>
          ) : (
            <div className="grid gap-6">
              {polls.map((poll) => (
                <Card key={poll.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-xl">{poll.title}</CardTitle>
                        <p className="text-muted-foreground">{poll.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={poll.isActive ? "default" : "secondary"}>
                          {poll.isActive ? "Active" : "Closed"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Poll Stats */}
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{poll.totalVotes} votes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BarChart3 className="h-4 w-4" />
                          <span>{poll.options.length} options</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Created {poll.createdAt}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleViewResults(poll)}
                          className="flex items-center space-x-1"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Results</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSharePoll(poll)}
                          className="flex items-center space-x-1"
                        >
                          <Share2 className="h-4 w-4" />
                          <span>Share</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePoll(poll.id)}
                          className="flex items-center space-x-1 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Dialogs */}
      <CreatePollDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCreatePoll={handleCreatePoll}
      />

      {selectedPoll && (
        <>
          <PollResultsDialog
            open={showResultsDialog}
            onOpenChange={setShowResultsDialog}
            poll={selectedPoll}
          />
          <SharePollDialog
            open={showShareDialog}
            onOpenChange={setShowShareDialog}
            poll={selectedPoll}
          />
        </>
      )}
    </div>
  );
};

export default PollDashboard;