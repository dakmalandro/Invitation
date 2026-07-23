import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("guests").collect();
  },
});

export const create = mutation({
  args: {
    fullName: v.string(),
    attending: v.boolean(),
    adults: v.number(),
    children: v.number(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("guests", args);
  },
});
