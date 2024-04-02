import { CrossCircledIcon } from "@radix-ui/react-icons";

import { Alert as AlertShadCn, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface AlertProps {
  title: string;
  desc: string;
}

export default function Alert({ title, desc }: AlertProps) {
  return (
    <AlertShadCn>
      <CrossCircledIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{desc}</AlertDescription>
    </AlertShadCn>
  );
}
