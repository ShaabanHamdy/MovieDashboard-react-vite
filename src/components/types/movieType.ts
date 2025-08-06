/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode, SetStateAction } from "react";

export interface Movie {
  _id?: string;
  title: string;
  type: string;
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
  movieImage: { path: string }[];
}
export const initialMovie: Movie = {
  title: "",
  type: "",
  director: "",
  budget: "",
  location: "",
  duration: "",
  year: "",
  movieImage: [],
};

export interface LoginProps {
  saveUserData: () => void;
}

export interface LoginValues {
  email: string;
  password: string;
}

export interface ErrorResponse {
  Error: SetStateAction<string>;
  message: string;
}

export interface DecodedToken {
  id: string;
  email: string;
  name?: string;
  exp?: number;
  [key: string]: any;
}

export interface ProtectPageProps {
  children: ReactNode;
}
export interface RegisterProps {
  onClose: () => void;
}
export interface ErrorResponse {
  Error: SetStateAction<string>;
  message: string;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
