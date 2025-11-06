import { useEffect, useState } from "react";

export function useCloseModal(parentClassname: string) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggling = () => setIsModalOpen((cur) => !cur);

  const onCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    function onClickOutsideMenu(e: MouseEvent) {
      const el = e.target as HTMLElement;

      if (!el.closest(parentClassname)) {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.addEventListener("click", onClickOutsideMenu);
    }

    return () => document.removeEventListener("click", onClickOutsideMenu);
  }, [parentClassname, isModalOpen]);

  return { isModalOpen, handleModalToggling, onCloseModal };
}
