/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ReactNode,
} from 'react';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';
import { Mods, classNames } from '@/sharedComponents/lib/classNames/classNames';
import { useModal } from '@/sharedComponents/lib/hooks/useModal/useModal';

interface ModalProps {
  className?: string;
  classNameContent?: string;
  classNameOverlay?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const {
    className, classNameContent, classNameOverlay, children, isOpen, onClose, lazy,
  } = props;

  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (lazy && !isMounted) {
    return null;
  }

  return (
    <Portal>
      <div
        className={classNames(cls.Modal, mods, [className])}
      >
        <Overlay onClick={close} className={classNameOverlay} />
        <div
          className={classNames(cls.content, {}, [
            classNameContent,
          ])}
        >
          {children}
        </div>
      </div>
    </Portal>
  );
};
