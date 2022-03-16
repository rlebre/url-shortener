import { MutableRefObject, useRef } from 'react';
import { StatusCode } from '../../constants/StatusCodes';
import { useOutsideClick } from '../click-outside/click-outside';
import styles from './modal.module.scss';

interface Props {
  status?: StatusCode;
  handleCloseClick: () => void;
  title?: string;
  children: JSX.Element | JSX.Element[] | string;
}

export const Modal = ({ status, handleCloseClick, title, children }: Props) => {
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
        <div className={styles.modal__description}>
          {status === StatusCode.OK && (
            <i className={`${styles.modal__description__icon} eva eva-checkmark-circle-2 text-green-500`} />
          )}
          {status === StatusCode.Warning && (
            <i className={`${styles.modal__description__icon} eva eva-alert-circle text-orange-400`} />
          )}
          {status === StatusCode.Error && (
            <i className={`${styles.modal__description__icon} eva eva-close-circle text-red-700`} />
          )}

          {children}
        </div>
      </div>
    </div>
  );
};
