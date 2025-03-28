import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Keep the existing users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Define calculation types
export const calculationResultSchema = z.object({
  number1: z.number().int().positive(),
  number2: z.number().int().positive(),
  gcd: z.number().int().positive(),
  factorization1: z.object({
    steps: z.array(z.object({
      divisor: z.number().int().positive(),
      quotient: z.number().int().positive(),
      isCommon: z.boolean()
    })),
    primeFactorization: z.record(z.string(), z.number().int().positive())
  }),
  factorization2: z.object({
    steps: z.array(z.object({
      divisor: z.number().int().positive(),
      quotient: z.number().int().positive(),
      isCommon: z.boolean()
    })),
    primeFactorization: z.record(z.string(), z.number().int().positive())
  }),
  commonFactors: z.array(z.object({
    factor: z.number().int().positive(),
    exponent: z.number().int().positive()
  })),
  allCommonFactors: z.array(z.number().int().positive())
});

export type CalculationResult = z.infer<typeof calculationResultSchema>;
