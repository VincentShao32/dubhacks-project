const ReceivedMessage = ({ name, message }) => {
  return (
    <div className="flex flex-col font-[family-name:var(--font-satoshi-medium)] gap-2">
      <h1>{name}</h1>
      <div className="bg-red rounded-2xl text-white w-fit p-2">{message}</div>
    </div>
  );
};

export default ReceivedMessage;
