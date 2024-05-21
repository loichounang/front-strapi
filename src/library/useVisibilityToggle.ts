import { useState } from 'react';

const useVisibilityToggle = () => {
  const [show, setShow] = useState(false);

  const toggleVisibility = () => {
    setShow((prevShow) => !prevShow);
  };

  return {
    show,
    toggleVisibility,
  };
}

export default useVisibilityToggle;
