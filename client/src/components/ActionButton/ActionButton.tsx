import { MouseEventHandler, ReactNode } from "react";

interface ActionButtonProps {
  callback: MouseEventHandler;
  icon: ReactNode;
  text: string;
}

export default function ActionButton({ callback, icon, text }: ActionButtonProps) {
  return (
    <a href="#!" onClick={callback}>
      <i className="material-icons left">{icon}</i>
      {text}
    </a>
  );
}
