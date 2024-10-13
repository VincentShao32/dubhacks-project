import { UNSTABLE_REVALIDATE_RENAME_ERROR } from "next/dist/lib/constants";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
// import { Id } from "./_generated/dataModel";

export const listGroupOrders = query({
  args: {},
  handler: async (ctx) => {
    // Grab the most recent messages.
    const messages = await ctx.db.query("GroupOrder").order("desc").take(1000);
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
    args: { author: v.string(), order_time: v.number(), restaurant: v.string(), uber_link: v.string(), pickup_location : v.string(), pickup_address : v.string(), pickup_lat : v.number(), pickup_long : v.number()},
    handler: async (ctx, { author, order_time, restaurant, uber_link, pickup_address, pickup_lat, pickup_long, pickup_location }) => {
    let emails: string[] = []; //TODO: add email of the creator to the array of emails
      const truncated_name = pickup_location.split(',')[0]
      const new_id = await ctx.db.insert("GroupOrder", { author, restaurant, pickup_address, pickup_lat, pickup_long, uber_link, order_time, emails, pickup_location: truncated_name});
      return new_id;
    },
  });

export const getGroupOrderByID = query({
  args: { id: v.id("GroupOrder") },
  handler: async (ctx, args) => {
    const groupOrder = await ctx.db.get(args.id);
    return groupOrder || null;
  },
});

export const addUserToGroupOrder = mutation({
  args: { order_id: v.id("GroupOrder"), user_email: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.order_id);
    if (order) {
      const current_emails: string[] = order["emails"];
      let contains = false;
      current_emails.forEach((email: string) => {
        if (email === args.user_email) {
          contains = true;
        }
      });
      if (contains) {
        return;
      }
      current_emails.push(args.user_email);
      await ctx.db.patch(args.order_id, { emails: current_emails });
    }
  },
});

export const sortGroupOrdersByLocation = query({
  args: {
    lat: v.float64(),
    long: v.float64(),
    max_dist: v.float64(),
  },
  handler: async (ctx, args) => {
    const orders = await ctx.db.query("GroupOrder").collect();
    const sortedOrders = orders.sort(
      (a, b) =>
        getDist(a.pickup_lat, a.pickup_long, args.lat, args.long) -
        getDist(b.pickup_lat, b.pickup_long, args.lat, args.long)
    );
    const filteredOrders = [];
    for (let i = 0; i < sortedOrders.length; i++) {
      if (
        getDist(
          sortedOrders[i].pickup_lat,
          sortedOrders[i].pickup_long,
          args.lat,
          args.long
        ) <= args.max_dist
      ) {
        filteredOrders.push(sortedOrders[i]);
      }
    }
    return filteredOrders;
    // const dist : number = getDist(lat, long);
  },
});

export const deleteOldGroupOrders = mutation({
  args: {},
  handler: (ctx, args) => {
    const old = ctx.db.query("GroupOrder").filter(q => 
      q.lt(q.field("order_time"), Date.now()));
  }
});

const getDist = (lat: number, long: number, lat2: number, long2: number) => {
  return Math.sqrt(Math.pow(lat - lat2, 2) + Math.pow(long - long2, 2));
};

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

export const send = mutation({
  args: {
    group_order_id: v.id("GroupOrder"),
    author: v.string(),
    body: v.string(),
    author_email: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("Messages", {
      author: args.author,
      author_email: args.author_email,
      group_order_id: args.group_order_id,
      body: args.body,
    });
  },
});
