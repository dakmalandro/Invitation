import { mutation } from "./_generated/server";
import { v } from "convex/values";

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
