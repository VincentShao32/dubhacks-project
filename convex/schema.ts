import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  GroupOrder: defineTable({
    author: v.string(),
    restaurant: v.string(),
    pickup_address: v.string(),
    pickup_lat: v.number(),
    pickup_long: v.number(),
    uber_link: v.string(),
    order_time: v.string(),
    emails: v.array(v.string()),
    pickup_location: v.string()
  }),

  User: defineTable({
    name: v.string(),
  }),

  Messages: defineTable({
    author: v.string(),
    body: v.string(),
    group_order_id: v.id("GroupOrder"),
    author_email: v.string(),
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
