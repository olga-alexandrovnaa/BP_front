import {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";
import styles from "./Input.module.scss";
import InputMask from "react-input-mask";
import autosize from "autosize";
import { ReactComponent as Clear } from "@/sharedComponents/assets/icons/close.svg";
import { classNames } from "@/sharedComponents/lib/classNames/classNames";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange" | "readOnly" | "onBlur"
>;

type Props = {
  label: string;
  children?: ReactNode;
  onBlur?: () => void;
  onChange?: (value: any) => void;
  onPhotoChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  value?: any;
  width?: "small" | "smaller" | "medium" | "big" | "bigger";
  buttonIcon?: ReactElement;
  rowStartIcon?: ReactElement;
  disabled?: boolean;
  textAfterInput?: string;
  dateValueString?: string;
  isWithEvent?: boolean;
  buttonLabel?: string;
  eventAction?: () => void;
  notDisabledEvent?: boolean;
  clearable?: boolean;
  required?: boolean;
} & HTMLInputProps;

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      className,
      onBlur,
      onChange,
      children,
      onPhotoChange,
      value,
      width,
      type,
      disabled,
      notDisabledEvent,
      textAfterInput,
      dateValueString,
      isWithEvent,
      buttonLabel,
      eventAction,
      buttonIcon,
      rowStartIcon,
      clearable,
      required,
      ...props
    },
    forwardedRef
  ) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "number") {
        let data = String(e.target.value);
        if(data.length !== 1 && !['.', ','].includes(data[1])){
          data = data.replace(/^0+/, '');
          refInput.current.value = data;
        }
        onChange?.(Number(data));
      } else {
        onChange?.(e.target.value);
      }
    };

    const onChangeTextAreaHandler = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      onChange?.(e.target.value);
    };

    const rowStartIconComponent = rowStartIcon ?? null;
    const buttonIconComponent = buttonIcon ?? null;

    const onButtonClick = useCallback(() => {
      if (eventAction) eventAction();
    }, [eventAction]);

    const refInput = useRef<HTMLInputElement>(null);

    const ref = useRef<HTMLTextAreaElement>(null);

    const onInputClick = useCallback(() => {
      if (type === "number") {
        if (refInput.current) {
          refInput.current.focus();
          if(value == 0){
            refInput.current.select();
          }
        }
      } else if (type === "textarea") {
        if (ref.current) {
          ref.current.focus();
        }
      } else {
        if (refInput.current) {
          if (type === "date") {
            refInput.current.showPicker();
          } else {
            refInput.current.focus();
          }
        }
      }
    }, [type, value]);

    useEffect(() => {
      if (ref.current) {
        autosize(ref.current);
      }
    }, []);

    useEffect(() => {
      if (ref.current) {
        autosize.update(ref.current);
      }
    }, [value]);

    let input = (
      <div className={styles.htmlInputBlock}>
        <input
          onChange={onChangeHandler}
          className={classNames(styles.htmlInput, {
            [styles.disabled]: disabled,
          })}
          ref={refInput}
          value={value ?? ''}
          disabled={disabled}
          {...props}
          type={type}
          onBlur={onBlur}
        />
        <span>{textAfterInput}</span>
      </div>
    );

    if (type === "textarea") {
      input = (
        <div className={styles.htmlInputBlockTextArea}>
          <textarea
            onChange={onChangeTextAreaHandler}
            className={classNames(styles.htmlInput, {
              [styles.disabled]: disabled,
            })}
            value={value ?? undefined}
            placeholder={props.placeholder}
            ref={ref}
            disabled={disabled}
            onBlur={onBlur}
          />
          <span>{textAfterInput}</span>
        </div>
      );
    }

    if (type === "phone") {
      input = (
        <InputMask
          onChange={onChangeHandler}
          value={value ?? "+7 (***) *** - ** - **"}
          alwaysShowMask
          className={classNames(styles.htmlInput, {
            [styles.disabled]: disabled,
          })}
          disabled={disabled}
          mask="+7 (***) *** - ** - **"
          maskChar="_"
          onBlur={onBlur}
          {...props}
        />
      );
    }

    if (type === "date") {
      input = (
        <div className={styles.dateDiv}>
          <input
            onChange={onChangeHandler}
            value={value}
            ref={refInput}
            className={classNames(styles.htmlInputDate, {
              [styles.disabled]: disabled,
            })}
            {...props}
            type={type}
            disabled={disabled}
            onBlur={onBlur}
          />

          <div
            className={classNames(styles.htmlInputText, {
              [styles.disabled]: disabled,
            })}
          >
            {dateValueString ? dateValueString : value ?? ""}
          </div>

          {clearable && !!value && (
            <div className={styles.clear} onClick={() => onChange(undefined)}>
              <Clear width={10} height={10} />
            </div>
          )}
        </div>
      );
    }

    if (type === "file") {
      input = (
        <div className={styles.htmlInputBlock}>
          <label className={styles.uploadPhotoLabel} htmlFor="upload-photo">
            Загрузить&#160;фото
          </label>
          <input
            type={"file"}
            id={"upload-photo"}
            accept="image/*,image/jpeg"
            disabled={disabled}
            onChange={onPhotoChange}
            onBlur={onBlur}
            className={classNames(styles.htmlInput, {
              [styles.disabled]: disabled,
            })}
            {...props}
          />
        </div>
      );
    }

    return (
      <div
        className={classNames(
          styles.input,
          {
            [styles.disabled]: disabled,
            [styles.width]: width,
          },
          [className]
        )}
        onClick={onInputClick}
      >
        {!!rowStartIcon && (
          <span className={styles.rowStartIcon}>{rowStartIconComponent}</span>
        )}

        {label}
        <div
          className={classNames(styles.inputBlock, {
            [styles.inputBlockFile]: type === "file",
            [styles.inputBlockTextArea]: type === "textarea",
          })}
        >
          {children ? children : input}
        </div>
        {type === "file" && (
          <label className={styles.img}>{value ? value : undefined}</label>
        )}
        {(!disabled || notDisabledEvent) &&
          (!!buttonIconComponent || !!buttonLabel) && (
            <button
              className={classNames(styles.button, {
                [styles.disabled]: disabled,
              })}
              onClick={onButtonClick}
            >
              {!!buttonIcon && (
                <span className={styles.icon}>{buttonIconComponent}</span>
              )}
              {!!buttonLabel && <span>{buttonLabel}</span>}
            </button>
          )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
