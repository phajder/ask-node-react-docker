import { ReactNode, createContext, useState } from "react";

import { Alert, AlertsWrapper } from "@/components";
import { AlertContextType, AlertProps } from "@/@types/ask-client";

const AlertsContext = createContext<AlertContextType | null>(null);
const AlertsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const addAlert = (alert: AlertProps) => {
    // const id = Math.random().toString(36).slice(2, 9) + new Date().getTime().toString(36);
    const id = Math.round(Math.random() * 2137);
    setAlerts((prev) => [...prev, { ...alert, id: id }]);
    return id;
  };

  const dismissAlert = (id: number | undefined) => {
    setAlerts((prev) => prev.filter((alert: AlertProps) => alert.id !== id));
  };

  return (
    <AlertsContext.Provider value={{ alerts, addAlert, dismissAlert }}>
      <AlertsWrapper>
        {alerts &&
          Object.values(alerts).map((alert) => {
            return (
              <Alert
                key={alert.id}
                title={alert.title}
                message={alert.message}
                timeout={alert.timeout}
                handleDismiss={() => {
                  dismissAlert(alert.id);
                }}
              />
            );
          })}
      </AlertsWrapper>
      {children}
    </AlertsContext.Provider>
  );
};

export { AlertsContext, AlertsProvider };
