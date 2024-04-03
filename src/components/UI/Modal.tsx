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
    const modal = dialog.current;

    if (open) {
      if (modal !== null) {
        modal.showModal();
      } else {
        console.error('Dialog reference is null!');
      }
    }
    /* in order to close the dialogue when this runs again, we can use a cleanup function here, which will be executed whenever this effect function is about to run again. So whenever the open prop value changes,  */

    return () => modal?.close();
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
