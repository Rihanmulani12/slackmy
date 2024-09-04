import { v } from "convex/values";
import { auth } from "./auth";
import { mutation, query } from "./_generated/server";

// Create a new channel
export const create = mutation({
  args: {
    name: v.string(),
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    // Get the user ID
    const userId = await auth.getUserId(ctx);
    
    // Check if the user is authenticated
    if (!userId) {
      throw new Error("Unauthorized");
    }

    // Check if the user is a member of the workspace with admin role
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    if (!member || member.role !== "admin") {
      throw new Error("Unauthorized");
    }

    // Parse the channel name and insert a new channel
    const parsedName = args.name.replace(/\s+/g, "-").toLowerCase();

    const channelId = await ctx.db.insert("channels", {
      name: parsedName,
      workspaceId: args.workspaceId,
    });

    return channelId;
  },
});

// Get channels for a workspace
export const get = query({
  args: {
    workspaceId: v.id("workspaces"),
  },
  handler: async (ctx, args) => {
    // Get the user ID
    const userId = await auth.getUserId(ctx);

    // If user is not authenticated, return an empty array
    if (!userId) {
      return [];
    }

    // Check if the user is a member of the workspace
    const member = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.workspaceId).eq("userId", userId)
      )
      .unique();

    // If the user is not a member, return an empty array
    if (!member) {
      return [];
    }

    // Retrieve and return the channels for the workspace
    const channels = await ctx.db
      .query("channels")
      .withIndex("by_workspace_id", (q) =>
        q.eq("workspaceId", args.workspaceId)
      )
      .collect();

    return channels;
  },
});

