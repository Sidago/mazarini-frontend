interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className = "" }: IconProps): React.ReactElement {
  return (
    <span className={`material-icons-outlined ${className}`}>{name}</span>
  );
}
