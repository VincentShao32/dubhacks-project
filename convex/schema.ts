import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  GroupOrder: defineTable({
    author: v.string(),
    restaurant: v.string(),
    pickup_location: v.string(),
    pickup_address: v.string(),
    restaurant_address: v.string(),
    order_time: v.string(),
    emails : v.array(v.string())
  }),

//   users: defineTable({
//     name: v.string(),
//     email: v.string(),
//   }),

//   likes: defineTable({
//     liker: v.string(),
//     messageID: v.string(),
//   }).index("byMessageID", ["messageID"]),
});
