import {
  HTMLAttributes, memo, ReactNode,
} from 'react';
import cls from './Button.module.scss';
import { classNames } from '@/sharedComponents/lib/classNames/classNames';

export const enum ButtonTheme {
  DEFAULT = 'default',
  CLEAR = 'clear',
  OUTLINE = 'outline',
  BACKGROUND = 'background',
}

export const enum ButtonSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl',
}

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = memo<ButtonProps>((props) => {
  const {
    className,
    theme = ButtonTheme.DEFAULT,
    children,
    square = false,
    size = ButtonSize.M,
    disabled,
    ...otherProps
  } = props;

  const mods: Record<string, boolean | undefined> = {
    [cls.square]: square,
    [cls.disabled]: disabled,
  };

  const clsName: string = classNames(
    cls.button,
    mods,
    [
      className,
      cls[theme],
      cls[size],
    ],
  );

  return (
    <button
      data-testid="button"
      type="button"
      className={clsName}
      {...otherProps}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
