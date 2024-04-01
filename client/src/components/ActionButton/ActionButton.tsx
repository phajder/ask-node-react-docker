import { MouseEventHandler, ReactNode } from "react";

interface ActionButtonProps {
  callback: MouseEventHandler;
  icon: ReactNode;
  text: string;
}

export default function ActionButton({ callback, icon, text }: ActionButtonProps) {
  return (
    <a href="#!" className="flex flex-row" onClick={callback}>
      <i className="material-icons p-2">{icon}</i>
      <div className="content-center">{text}</div>
    </a>
  );
}
