import { HTMLProps } from "react";

export type InputOption = { value: string; name: string; [key: string]: string };

export type Category = {
  id: string;
  name: string;
  children: Category[] | null;
};

export type Brand = {
  id: string;
  name: string;
};

export type InputComponentProps = HTMLProps<HTMLFormElement> & {
  label: string;
  width?: "full" | "default";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLFormElement>) => void;
};
