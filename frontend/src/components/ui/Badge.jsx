import classNames from "classnames";

export default function Badge({
  children,
  variant = "default",
  className,
  size = "md",
  ...props
}) {
  const baseStyles = "inline-flex gap-1 items-center  rounded-md font-medium";

  const variantStyles = {
    default: "bg-gray-800 text-white [&_svg]:fill-white hover:bg-gray-500",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
  };

  const sizeStyles = {
    custom: "",
    sm: "px-1.5 text-xs py-0.5 [&_svg]:size-3",
    md: "px-2 py-1 [&_svg]:size-4",
  };

  const classes = classNames(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className,
  );

  return (
    <button className={classes} {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d="M856-390 570-104q-12 12-27 18t-30 6q-15 0-30-6t-27-18L103-457q-11-11-17-25.5T80-513v-287q0-33 23.5-56.5T160-880h287q16 0 31 6.5t26 17.5l352 353q12 12 17.5 27t5.5 30q0 15-5.5 29.5T856-390ZM513-160l286-286-353-354H160v286l353 354ZM260-640q25 0 42.5-17.5T320-700q0-25-17.5-42.5T260-760q-25 0-42.5 17.5T200-700q0 25 17.5 42.5T260-640Zm220 160Z" />
      </svg>
      {children}
    </button>
  );
}
