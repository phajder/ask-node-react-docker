// @types/ask-client.ts

export interface AlertProps {
  id?: number;
  title: string;
  message: string;
  timeout: number;
  handleDismiss?: Function;
}

export type AlertContextType = {
  alerts: AlertProps[] | undefined;
  addAlert: (alert: AlertProps) => number;
  dismissAlert: (id: number | undefined) => void;
};
