import { UNSTABLE_REVALIDATE_RENAME_ERROR } from "next/dist/lib/constants";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
// import { Id } from "./_generated/dataModel";

export const listGroupOrders = query({
  args: { displayNum: v.number() },
  handler: async (ctx, { displayNum }) => {
    // Grab the most recent messages.
    const messages = await ctx.db
      .query("GroupOrder")
      .order("desc")
      .take(displayNum);
    messages.map((e) => e._id);
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
    args: { author: v.string(), order_time: v.string(), restaurant: v.string(), restaurant_address: v.string(), pickup_location : v.string(), pickup_address : v.string(), pickup_lat : v.number(), pickup_long : v.number()},
    handler: async (ctx, { author, order_time, restaurant, restaurant_address, pickup_location, pickup_address, pickup_lat, pickup_long }) => {
      let emails: string[] = []; //TODO: add email of the creator to the array of emails
      await ctx.db.insert("GroupOrder", { author, restaurant, pickup_location, pickup_address, pickup_lat, pickup_long, restaurant_address, order_time, emails });
    },
  });

  export const getGroupOrderByID = query({
    args: {id: v.id("GroupOrder")},
    handler: async (ctx, args) => {
      const groupOrder = await ctx.db.get(args.id);
      return groupOrder || null;
    }
  })

  export const addUserToGroupOrder = mutation({
    args: {order_id : v.id("GroupOrder"), user_email : v.string()},
    handler: async (ctx, args) => {
      const order = await ctx.db.get(args.order_id);
      if(order){
        const current_emails : string[] = order["emails"];
        current_emails.push(args.user_email);
        await ctx.db.patch(args.order_id, {emails: current_emails})
      }
    }
  })


  export const sortGroupOrdersByLocation = query({
    args: {lat : v.float64(), long : v.float64()},
    handler : async (ctx, args) => {
      const orders = await ctx.db.query("GroupOrder").collect();
      const sortedOrders = orders.sort((a, b) => getDist(a.pickup_lat, a.pickup_long, args.lat, args.long) - getDist(b.pickup_lat, b.pickup_long, args.lat, args.long));
      return sortedOrders;
      // const dist : number = getDist(lat, long);
    }
  })

  const getDist = (lat : number, long : number, lat2 : number, long2 : number) => {
    return Math.sqrt(Math.pow(lat - lat2, 2) + Math.pow(long - long2, 2));
  }

  // export const like = mutation({
  //   args: {liker: v.string(), messageID: v.string()},
  //   handler: async (ctx, args) => {
  //     await ctx.db.insert("likes", {liker: args.liker, messageID: args.messageID});
  //   }
  // })

  export const list_messages = query({
    args: { group_order_id: v.id("GroupOrder") },
    handler: async (ctx, args) => {
      const messages = await ctx.db
        .query("Messages")
        .filter((q) => q.eq(q.field("group_order_id"), args.group_order_id))
        .order("desc")
        .take(100);
      return messages.reverse().map((message) => ({
        ...message,
      }));
    },
  });