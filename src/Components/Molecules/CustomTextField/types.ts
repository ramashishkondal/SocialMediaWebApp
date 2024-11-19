import { DetailedHTMLProps } from "react";

export type CustomTextFieldProps = {
  isSensitive?: boolean;
  showError: boolean;
  labelText: string;
  errorText: string;
} & DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
