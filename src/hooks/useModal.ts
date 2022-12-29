import { useState } from 'react';

type UseModalReturn = [boolean, React.Dispatch<React.SetStateAction<boolean>>, () => void];

function useModal(): UseModalReturn {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggle = (): void => {
    setIsModalOpen((prevModalOpen) => !prevModalOpen);
  };

  return [isModalOpen, setIsModalOpen, toggle];
}

export default useModal;
