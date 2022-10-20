export const ROLE = {
  VERKÄUFER: "VERKÄUFER",
  EINKÄUFER: "EINKÄUFER",
  CHEF: "CHEF",
} as const;

export type TROLE = keyof typeof ROLE;

export interface IEmployee {
  name: string;
  email: string;
  address: string;
  role: TROLE[];
  action?: string;
}
