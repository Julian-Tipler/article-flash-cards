interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: string;
  hoverColor?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  color = "card",
  hoverColor = "blue-400",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`bg-${color} rounded px-4 py-2 font-bold text-white hover:bg-${hoverColor} ${className} `}
    >
      {text}
    </button>
  );
};
