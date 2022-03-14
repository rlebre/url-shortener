import { MutableRefObject, useRef } from 'react';
import { useOutsideClick } from '../click-outside/click-outside';
import styles from './modal.module.scss';

interface Props {
  handleCloseClick: () => void;
  title?: string;
  children: JSX.Element | JSX.Element[] | string;
}

export const Modal = ({ handleCloseClick, title, children }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  useOutsideClick(menuRef, () => {
    handleCloseClick();
  });

  return (
    <div onKeyDown={(e) => e.key === 'Escape' && handleCloseClick()} className={styles.modal}>
      <div ref={menuRef} className={styles.modal__content}>
        {title && <span className={styles.modal__title}>{title}</span>}
        <span
          role='button'
          tabIndex={0}
          className={styles.close}
          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => e.key === 'Enter' && handleCloseClick()}
          onClick={handleCloseClick}
        >
          &times;
        </span>
        <div className={styles.modal__description}>{children}</div>
      </div>
    </div>
  );
};
