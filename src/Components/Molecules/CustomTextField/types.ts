import { DetailedHTMLProps } from "react";

export type CustomTextFieldProps = {
  showError: boolean;
  labelText: string;
  errorText: string;
} & DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
