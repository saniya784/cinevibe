import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function Modal({ open, onClose, children, className = '' }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto"
      style={{ animation: 'backdropIn .35s ease both' }}
      onClick={onClose}
    >
      <div
        className="min-h-full flex items-start justify-center p-4 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={className} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}