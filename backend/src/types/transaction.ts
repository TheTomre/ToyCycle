export interface Transaction {
  amount: number;
  date: Date;
  id: string;
  toyId: string;
  type: "earn" | "spend";
  userId: string;
}
