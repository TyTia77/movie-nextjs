export default function ({
  text,
  className,
  disabled = false,
  ...rest
}: {
  text: string;
  disabled?: boolean;
  className: string;
}) {
  return (
    <button
      {...rest}
      //   className={`${className} ${!disabled ? "hover:scale-110 cursor-pointer" : ""}`}
      className={`${className} transition-transform duration-200 ${!disabled && "hover:scale-110 cursor-pointer"} `}
    >
      {text}
    </button>
  );
}
