import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children, open, onClose, className = '' }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }
        return () => modal.close();//se ejecutará cada vez que esta función de efecto esté a punto de ejecutarse de nuevo. Así que cada vez que el valor de la prop abierta cambia,
    }, [open]);

    return createPortal(
        <dialog
            ref={dialog}
            className={`modal ${className}`}
            onClose={onClose}
        >
            {children}
        </dialog>,
        document.getElementById('modal')
    );
}