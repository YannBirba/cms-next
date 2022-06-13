import { Object } from "./Object";

export interface Header extends Object {
  header_level: HeaderLevel;
  text: string;
}

export type HeaderLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
