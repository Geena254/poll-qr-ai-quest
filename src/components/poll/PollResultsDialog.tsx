import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3, Users, Trophy, Clock } from "lucide-react";

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

interface PollResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  poll: Poll;
}

const PollResultsDialog = ({ open, onOpenChange, poll }: PollResultsDialogProps) => {
  // Prepare data for the chart
  const chartData = Object.entries(poll.votes).map(([option, votes]) => ({
    option: option.length > 20 ? option.substring(0, 20) + "..." : option,
    votes,
    percentage: poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0,
  }));

  // Find the winning option
  const winningOption = Object.entries(poll.votes).reduce(
    (winner, [option, votes]) => (votes > winner.votes ? { option, votes } : winner),
    { option: "", votes: 0 }
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <DialogTitle className="text-2xl">Poll Results</DialogTitle>
          </div>
          <div className="text-left space-y-2">
            <h3 className="text-xl font-semibold">{poll.title}</h3>
            {poll.description && (
              <p className="text-muted-foreground">{poll.description}</p>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Votes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{poll.totalVotes}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leading Option</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold truncate">{winningOption.option || "No votes yet"}</div>
                <p className="text-xs text-muted-foreground">
                  {winningOption.votes} votes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <Badge variant={poll.isActive ? "default" : "secondary"} className="text-sm">
                  {poll.isActive ? "Active" : "Closed"}
                </Badge>
                <p className="text-xs text-muted-foreground mt-1">
                  Created {poll.createdAt}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Chart Visualization */}
          {poll.totalVotes > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Vote Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="option" 
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <Tooltip 
                        formatter={(value: any, name: any) => [`${value} votes`, 'Votes']}
                        labelFormatter={(label) => `Option: ${label}`}
                      />
                      <Bar dataKey="votes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Detailed Results */}
          <Card>
            <CardHeader>
              <CardTitle>Detailed Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(poll.votes)
                  .sort(([, a], [, b]) => b - a)
                  .map(([option, votes], index) => {
                    const percentage = poll.totalVotes > 0 ? Math.round((votes / poll.totalVotes) * 100) : 0;
                    return (
                      <div key={option} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {index === 0 && poll.totalVotes > 0 && (
                              <Trophy className="h-4 w-4 text-warning" />
                            )}
                            <span className="font-medium">{option}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {votes} votes ({percentage}%)
                          </div>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                {poll.totalVotes === 0 && (
                  <div className="text-center py-8">
                    <div className="mx-auto p-4 bg-muted/50 rounded-full w-fit mb-4">
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No votes yet</h3>
                    <p className="text-muted-foreground">
                      Share your poll to start collecting votes!
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PollResultsDialog;