import { CrossCircledIcon } from "@radix-ui/react-icons";

import { Alert as AlertShadCn, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReactNode, useEffect } from "react";
import { AlertProps } from "../../@types/ask-client";

const AlertsWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="pointer-events-none container space-y-2 fixed right-0 top-0 z-50 h-32 w-full min-w-xs max-w-lg p-4">
      {children}
    </div>
  );
};

const Alert: React.FC<AlertProps> = ({ title, message, timeout, handleDismiss }) => {
  useEffect(() => {
    if (timeout > 0 && handleDismiss) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, timeout * 1000);
      return () => clearTimeout(timer);
    }
  });
  return (
    <AlertShadCn className="py-4">
      <CrossCircledIcon className="h-6 w-6" />
      <AlertTitle className="text-lg text-red-500">{title.toUpperCase()}</AlertTitle>
      <AlertDescription className="text-wrap">{message}</AlertDescription>
    </AlertShadCn>
  );
};

export { Alert, AlertsWrapper };
