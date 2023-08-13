type Iprops = {
  iconName: string;
  className?: string;
};

const Icon: React.FC<Iprops> = ({ iconName, className, ...otherProps }) => {
  return (
    <span
      className={`material-symbols-outlined leading-none ${className}`}
      {...otherProps}
    >
      {iconName}
    </span>
  );
};

export default Icon;
