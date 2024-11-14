import { cva } from "class-variance-authority";

// Define the base button styles and variants
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-500 transition-all",
  {
    variants: {
      variant: {
        default: "bg-gray-800 text-white hover:bg-gray-500",
        secondary: "bg-white text-gray-800 hover:bg-gray-800",
        outline:
          "border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white",
        danger: "bg-red-600 text-white hover:bg-red-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm md:px-4 md:py-2",
        md: "px-4 py-2 text-md",
        lg: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);
