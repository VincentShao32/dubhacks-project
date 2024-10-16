import Link from "next/link";

const OrderListingLink = ({ order, color, distance }) => {
  return (
    <Link
      href={`orders/${order._id}`}
      className={` bg-yellow rounded-lg w-full flex justify-between p-6`}
    >
      <div className="flex flex-col w-[50%] justify-between">
        <div className="flex justify-between w-full">
          <h1 className="font-[family-name:var(--font-satoshi-variable)] text-2xl">
            {order.restaurant}
          </h1>
          <h1 className="font-[family-name:var(--font-satoshi-medium)] italic text-lg ">
            {`@ ${order.pickup_location}`}
          </h1>
          <h1 className="font-[family-name:var(--font-satoshi-medium)] italic text-lg">
            {`${distance} mi`}
          </h1>
        </div>
        <div className="flex w-full justify-between text-lg">
          <h1 className="font-[family-name:var(--font-satoshi-medium)] italic">
            {order.author}
          </h1>
          <h1 className="font-family-name:var(--font-satoshi-medium)] italic">
            {`${order.emails.length - 1} others have joined`}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-[family-name:var(--font-satoshi-medium)] text-right">
          ordering at
        </h1>
        <div className="flex items-center gap-2">
          <h1 className="font-[family-name:var(--font-satoshi-variable)] text-5xl">
            {new Date(order.order_time).getHours().toString().padStart(2, "0") +
              ":" +
              new Date(order.order_time)
                .getMinutes()
                .toString()
                .padStart(2, "0") +
              (new Date(order.order_time).getHours() < 12 ? " AM" : " PM")}
          </h1>
        </div>
        <div className="p-1"></div>
      </div>
    </Link>
  );
};

export default OrderListingLink;
