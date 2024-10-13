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
      <button onClick={handleOpenGroupWindowCreate}>Create Group Order</button>
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
