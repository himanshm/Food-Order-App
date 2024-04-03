import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type ModalProps = {
  children: ReactNode;
  open: boolean;
  className: string;
};
function Modal({ children, open, className = '' }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      if (dialog.current !== null) {
        dialog.current.showModal();
      } else {
        console.error('Dialog reference is null!');
      }
    }
  }, [open]);
  const modalRoot = document.getElementById('modal');
  if (!modalRoot) {
    console.error('Modal root not found!');
    return;
  }
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    modalRoot
  );
}

export default Modal;
