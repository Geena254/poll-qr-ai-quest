import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, X, Vote, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreatePollDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePoll: (pollData: any) => void;
}

const CreatePollDialog = ({ open, onOpenChange, onCreatePoll }: CreatePollDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pollData, setPollData] = useState({
    title: "",
    description: "",
    options: ["", ""],
  });
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (pollData.options.filter(option => option.trim()).length < 2) {
      toast({
        title: "Invalid poll",
        description: "Please provide at least 2 options for your poll.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onCreatePoll({
        ...pollData,
        options: pollData.options.filter(option => option.trim()),
      });
      
      toast({
        title: "Poll created!",
        description: "Your poll has been created successfully and is now live.",
      });
      
      // Reset form
      setPollData({
        title: "",
        description: "",
        options: ["", ""],
      });
    }, 1000);
  };

  const addOption = () => {
    if (pollData.options.length < 6) {
      setPollData(prev => ({
        ...prev,
        options: [...prev.options, ""],
      }));
    }
  };

  const removeOption = (index: number) => {
    if (pollData.options.length > 2) {
      setPollData(prev => ({
        ...prev,
        options: prev.options.filter((_, i) => i !== index),
      }));
    }
  };

  const updateOption = (index: number, value: string) => {
    setPollData(prev => ({
      ...prev,
      options: prev.options.map((option, i) => (i === index ? value : option)),
    }));
  };

  const updateField = (field: string, value: string) => {
    setPollData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto p-3 bg-primary/10 rounded-full w-fit">
            <Vote className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl">Create New Poll</DialogTitle>
          <p className="text-muted-foreground">
            Build an engaging poll and share it with your audience
          </p>
        </DialogHeader>

        <Card className="p-6 mt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Poll Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base font-semibold">
                Poll Question
              </Label>
              <Input
                id="title"
                type="text"
                placeholder="e.g., What's your favorite programming language?"
                value={pollData.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
                className="text-lg"
              />
            </div>

            {/* Poll Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                placeholder="Add context or additional details about your poll..."
                value={pollData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
              />
            </div>

            {/* Poll Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">Answer Options</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  disabled={pollData.options.length >= 6}
                  className="flex items-center space-x-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Option</span>
                </Button>
              </div>

              <div className="space-y-3">
                {pollData.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        required
                      />
                    </div>
                    {pollData.options.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeOption(index)}
                        className="text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-sm text-muted-foreground">
                You can add up to 6 options. At least 2 options are required.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex items-center space-x-4 pt-4">
              <Button 
                type="submit" 
                className="flex-1" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Creating Poll..."
                ) : (
                  <>
                    Create Poll
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePollDialog;