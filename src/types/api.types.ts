import { Database, Json } from "./database.types";

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
export type Views<T extends keyof Database["public"]["Views"]> =
  Database["public"]["Views"][T]["Row"];
export type Functions<T extends keyof Database["public"]["Functions"]> =
  Database["public"]["Functions"][T]["Args"];
export type CompositeTypes<
  T extends keyof Database["public"]["CompositeTypes"]
> = Database["public"]["CompositeTypes"][T];

export type TablesColumns<T extends keyof Database["public"]["Tables"]> = {
  [K in keyof Database["public"]["Tables"][T]["Row"]]: Database["public"]["Tables"][T]["Row"][K] extends Json
    ? K
    : never;
}[keyof Database["public"]["Tables"][T]["Row"]];
export type TablesRequiredColumns<
  T extends keyof Database["public"]["Tables"]
> = {
  [K in keyof Database["public"]["Tables"][T]["Row"]]: Database["public"]["Tables"][T]["Row"][K] extends Json
    ? never
    : K;
}[keyof Database["public"]["Tables"][T]["Row"]];
export type TablesOptionalColumns<
  T extends keyof Database["public"]["Tables"]
> = {
  [K in keyof Database["public"]["Tables"][T]["Row"]]: Database["public"]["Tables"][T]["Row"][K] extends Json
    ? K
    : never;
}[keyof Database["public"]["Tables"][T]["Row"]];

export type FunctionsArgs<T extends keyof Database["public"]["Functions"]> = {
  [K in keyof Database["public"]["Functions"][T]["Args"]]: Database["public"]["Functions"][T]["Args"][K] extends Json
    ? K
    : never;
}[keyof Database["public"]["Functions"][T]["Args"]];
export type FunctionsRequiredArgs<
  T extends keyof Database["public"]["Functions"]
> = {
  [K in keyof Database["public"]["Functions"][T]["Args"]]: Database["public"]["Functions"][T]["Args"][K] extends Json
    ? never
    : K;
}[keyof Database["public"]["Functions"][T]["Args"]];
export type FunctionsOptionalArgs<
  T extends keyof Database["public"]["Functions"]
> = {
  [K in keyof Database["public"]["Functions"][T]["Args"]]: Database["public"]["Functions"][T]["Args"][K] extends Json
    ? K
    : never;
}[keyof Database["public"]["Functions"][T]["Args"]];
