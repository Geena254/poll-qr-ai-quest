import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Share2, Copy, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import QRCode from "qrcode";

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

interface SharePollDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  poll: Poll;
}

const SharePollDialog = ({ open, onOpenChange, poll }: SharePollDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const { toast } = useToast();

  // Generate poll URL (in a real app, this would be your domain)
  const pollURL = `${window.location.origin}/poll/${poll.id}`;

  // Generate QR code when dialog opens
  useEffect(() => {
    if (open) {
      QRCode.toDataURL(pollURL, {
        width: 200,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })
        .then(url => setQrCodeDataUrl(url))
        .catch(err => console.error("Error generating QR code:", err));
    }
  }, [open, pollURL]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(pollURL);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Poll link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please manually copy the link.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadQR = () => {
    if (qrCodeDataUrl) {
      const link = document.createElement("a");
      link.download = `poll-${poll.id}-qr.png`;
      link.href = qrCodeDataUrl;
      link.click();
      
      toast({
        title: "QR code downloaded!",
        description: "The QR code has been saved to your downloads.",
      });
    }
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poll.title,
          text: `Vote on this poll: ${poll.title}`,
          url: pollURL,
        });
      } catch (err) {
        // User cancelled or share failed, fallback to copy
        handleCopyLink();
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto p-3 bg-success/10 rounded-full w-fit">
            <Share2 className="h-8 w-8 text-success" />
          </div>
          <DialogTitle className="text-2xl">Share Your Poll</DialogTitle>
          <p className="text-muted-foreground">
            Get your poll out there and start collecting votes
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Poll Info */}
          <Card className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg truncate">{poll.title}</h3>
                <Badge variant={poll.isActive ? "default" : "secondary"}>
                  {poll.isActive ? "Active" : "Closed"}
                </Badge>
              </div>
              {poll.description && (
                <p className="text-sm text-muted-foreground">{poll.description}</p>
              )}
              <div className="text-xs text-muted-foreground">
                {poll.totalVotes} votes • {poll.options.length} options
              </div>
            </div>
          </Card>

          {/* Share Link */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Share Link</Label>
            <div className="flex items-center space-x-2">
              <Input 
                value={pollURL} 
                readOnly 
                className="font-mono text-sm"
              />
              <Button
                size="sm"
                onClick={handleCopyLink}
                className="flex items-center space-x-1"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Anyone with this link can vote on your poll
            </p>
          </div>

          {/* QR Code */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">QR Code</Label>
            <Card>
              <CardContent className="p-6 text-center">
                {qrCodeDataUrl ? (
                  <div className="space-y-4">
                    <img 
                      src={qrCodeDataUrl} 
                      alt="Poll QR Code" 
                      className="mx-auto rounded-lg border"
                    />
                    <p className="text-sm text-muted-foreground">
                      Scan to vote instantly
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48">
                    <QrCode className="h-12 w-12 text-muted-foreground animate-pulse" />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleDownloadQR}
              disabled={!qrCodeDataUrl}
              className="flex items-center space-x-2"
            >
              <QrCode className="h-4 w-4" />
              <span>Download QR</span>
            </Button>
            <Button
              onClick={handleShareNative}
              className="flex items-center space-x-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share Poll</span>
            </Button>
          </div>

          {/* Preview Link */}
          <div className="pt-4 border-t">
            <Button
              variant="ghost"
              className="w-full flex items-center space-x-2"
              onClick={() => window.open(pollURL, "_blank")}
            >
              <ExternalLink className="h-4 w-4" />
              <span>Preview Poll Page</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePollDialog;