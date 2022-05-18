import { User } from "@prisma/client";

export interface MessagesInterface {
  message: string;
  conversationId: number;
  userId: number;
  createdAt: Date | string | null;
  updatedAt: Date | string | null;
  user: User;
}
