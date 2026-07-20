import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  guests: defineTable({
    fullName: v.string(),
    attending: v.boolean(),
    adults: v.number(),
    children: v.number(),
    email: v.string(),
  }),
});
