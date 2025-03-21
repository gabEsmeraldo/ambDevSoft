import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ToastNotificationProps {
  title: string;
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function ToastNotification({
  title,
  message,
  type,
  onClose,
}: ToastNotificationProps) {
  const Icon = type === "error" ? AlertCircle : CheckCircle2;
  const variantClass =
    type === "error"
      ? "border-red-500 bg-red-50 text-red-800"
      : "border-green-500 bg-green-50 text-green-800";

  return (
    <Alert
      className={`fixed bottom-4 right-4 max-w-xs ${variantClass} shadow-lg`}
    >
      <Icon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
