import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
// import { Id } from "./_generated/dataModel";

export const listGroupOrders = query({
    args: {displayNum : v.number()},
    handler: async (ctx, {displayNum}) => {
      // Grab the most recent messages.
      const messages = await ctx.db.query("GroupOrder").order("desc").take(displayNum);
      messages.map(e => e._id)
      // Reverse the list so that it's in a chronological order.
    //   const messagesWithLikes = await Promise.all(
    //     messages.map(async (message) => {
    //       const likes = await ctx.db.query("likes").withIndex("byMessageID", (q) => q.eq("messageID", message._id)).collect();
    //       return {
    //         ...message,
    //         likes: likes.length};
    //     })
    //   )
    return messages;
  
    //   return messagesWithLikes.reverse().map( 
    //     (message) => ({
    //     ...message,
    //     body: message.body.replaceAll(":)", "🤗"),
    //   })
    // );
    },
  });
  
  export const createGroupOrder = mutation({
    args: { author: v.string(), order_time: v.string(), restaurant: v.string(), restaurant_address: v.string(), pickup_location : v.string(), pickup_address : v.string()},
    handler: async (ctx, { author, order_time, restaurant, restaurant_address, pickup_location, pickup_address }) => {
      await ctx.db.insert("GroupOrder", { author, restaurant, pickup_location, pickup_address, restaurant_address, order_time });
    },
  });

  export const getGroupOrderByID = query({
    args: {id: v.id("GroupOrder")},
    handler: async (ctx, args) => {
      const groupOrder = await ctx.db.get(args.id);
      return groupOrder || null;
    }
  })
  
  // export const like = mutation({
  //   args: {liker: v.string(), messageID: v.string()},
  //   handler: async (ctx, args) => {
  //     await ctx.db.insert("likes", {liker: args.liker, messageID: args.messageID});
  //   }
  // })