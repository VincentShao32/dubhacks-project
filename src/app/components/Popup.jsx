import { useState } from "react";

const Popup = () => {
  let a = 5;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenGroupWindowCreate = () => {
    setIsOpen(true);
  };

  // Function to close the popup
  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpenGroupWindowCreate}
        className="fixed right-24 bottom-24 z-20 bg-black text-white font-[family-name:var(--font-satoshi-medium)] px-8 py-4 text-xl rounded-xl"
      >
        Create Group Order
      </button>
      <div className="select-none fixed z-10 bg-white right-[85px] bottom-[85px] border-[3px] border-black rounded-xl text-white px-8 py-4 text-xl">
        Create Group Order
      </div>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Popup Title</h2>
            <p>
              This is the popup content. You can put anything you want here.
            </p>
            <button onClick={closePopup}>Close Popup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
