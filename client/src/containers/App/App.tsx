import { Layout } from "@/components";
import { AlertsProvider } from "@/components/Alert/AlertContext";

export default function App() {
  return (
    <AlertsProvider>
      <Layout />
    </AlertsProvider>
  );
}
