import { MouseEventHandler, ReactNode } from "react";

interface ActionButtonProps {
  callback: MouseEventHandler;
  icon: ReactNode;
  text: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ callback, icon, text }) => {
  return (
    <a
      href="#!"
      className="relative px-3 py-2 transition hover:text-teal-500 flex flex-row"
      onClick={callback}
    >
      <i className="material-icons p-2">{icon}</i>
      <div className="content-center">{text}</div>
    </a>
  );
};

export default ActionButton;
