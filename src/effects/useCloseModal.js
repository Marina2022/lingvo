import {useEffect} from "react";

export const useCloseModalHook = (modal, isOpen, setIsOpen)=> {

  useEffect(() => {
    const escHandler = e => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
  
    if (isOpen) {
      window.document.addEventListener('keydown', escHandler)
    }

    return () => {
      window.document.removeEventListener('keydown', escHandler)
    }
  }, [isOpen]);
}