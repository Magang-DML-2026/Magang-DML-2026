export type Receipt = {
  id: string;
  customerInitials: string;
  customerName: string;
  orderId: string;
  amount: string;
  imageUrl: string;
};

export const mockReceipts: Receipt[] = [
  {
    id: "1",
    customerInitials: "JD",
    customerName: "John Doe",
    orderId: "ORD-7721-B2C",
    amount: "450,000",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    customerInitials: "AS",
    customerName: "Ahmad Santoso",
    orderId: "ORD-7723-B2C",
    amount: "1,200,000",
    imageUrl: "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1200&auto=format&fit=crop",
  },
];
