import React from 'react';

function MyButton() {
  const handleClick = () => {
    alert('You clicked the button!');
  };

  return (
    <>
    <button onClick={handleClick}>
        <p className="text-3xl pb-4 text-gray-600">...</p>
    </button>
  </>
  );
}

export default MyButton;