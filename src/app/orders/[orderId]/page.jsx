"use client";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import OrderListing from "../../components/OrderListing";
import { useUser } from "@auth0/nextjs-auth0/client";
import ReceivedMessage from "../../components/ReceivedMessage";
import SentMessage from "../../components/SentMessage";
import { useState, useEffect } from "react";

const page = ({ params }) => {
  const order = useQuery(api.functions.getGroupOrderByID, {
    id: params.orderId,
  });
  let messages = useQuery(api.functions.list_messages, {
    group_order_id: params.orderId,
  });
  const sendMessage = useMutation(api.functions.send);

  const joinGroupOrder = useMutation(api.functions.addUserToGroupOrder);
  const leaveGroupOrder = useMutation(api.functions.leaveGroupOrder);

  const { user, error, isLoading } = useUser();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  const colors = [
    "bg-light-red",
    "bg-light-green",
    "bg-yellow",
    "bg-light-blue",
    "bg-light-purple",
    "bg-dark-pink",
  ];
  let i = -1;

  const [newMessageText, setNewMessageText] = useState("");

  useEffect(() => {
    function get_location() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }

    get_location();
  }, []);

  const getRandomColor = () => {
    //const randomIndex = Math.floor(Math.random() * colors.length);
    //return colors[randomIndex];
    i++;
    if (i == 5) {
      i = 0;
    }
    return colors[i];
  };

  const get_dist = (lat, long, lat2, long2) => {
    return Math.sqrt(Math.pow(lat - lat2, 2) + Math.pow(long - long2, 2));
  };

  return (
    <div className="mt-24 max-w-[800px] w-full mx-auto flex flex-col gap-4">
      {order && (
        <OrderListing
          order={order}
          color={getRandomColor()}
          distance={
            Math.round(
              get_dist(
                location.latitude,
                location.longitude,
                order.pickup_lat,
                order.pickup_long
              ) *
                69 *
                100
            ) / 100
          }
        />
      )}
      <div className="flex justify-between border-4 w-full border-red rounded-xl items-center">
        <button
          onClick={() => {
            if (
              order.emails.indexOf(user.email) === -1 &&
              order.author_email != user.email
            ) {
              joinGroupOrder({
                order_id: params.orderId,
                user_email: user.email,
              });
            } else {
              leaveGroupOrder({
                order_id: params.orderId,
                user_email: user.email,
              });
            }
          }}
          className="rounded-lg text-white bg-red py-2 px-4 font-[family-name:var(--font-satoshi-medium)]"
        >
          {order &&
          user &&
          order.emails.indexOf(user.email) === -1 &&
          order.author_email !== user.email
            ? "Join Group"
            : "Leave Group"}
        </button>
        <a
          href=""
          className="font-[family-name:var(--font-satoshi-medium)] italic pr-8"
        >
          {order && order.uber_link}
        </a>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col rounded-lg w-[33%]">
          <div className="p-4 w-full object-cover rounded-t-lg bg-red text-white font-[family-name:var(--font-satoshi-variable)]">
            Conversation starter:
          </div>
          <div className="flex p-4 rounded-b-lg w-full items-center bg-gray-100 text-red text-3xl font-[family-name:var(--font-satoshi-variable)] h-[490px]">
            <h1>What's your ultimate comfort food?</h1>
          </div>
        </div>
        <div className="flex flex-col w-[65%] gap-4">
          <div className="flex flex-col bg-gray-100 rounded-lg p-4 gap-4 h-[475px] overflow-y-scroll snap-end">
            {messages &&
              user &&
              messages.map((message) => {
                if (message.author_email === user.email) {
                  return (
                    <SentMessage name={message.author} message={message.body} />
                  );
                } else {
                  return (
                    <ReceivedMessage
                      name={message.author}
                      message={message.body}
                    />
                  );
                }
              })}
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await sendMessage({
                body: newMessageText,
                author: user.name,
                group_order_id: params.orderId,
                author_email: user.email,
              });
              setNewMessageText("");
            }}
            className="flex justify-between "
          >
            <input
              value={newMessageText}
              onChange={async (e) => {
                const text = e.target.value;
                setNewMessageText(text);
              }}
              placeholder="Write a message…"
              className="bg-gray-100 rounded-lg p-4 w-[80%] font-[family-name:var(--font-satoshi-variable)]"
            />
            <button
              type="submit"
              disabled={!newMessageText}
              className="w-[15%] bg-red rounded-lg text-white font-[family-name:var(--font-satoshi-variable)]"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
