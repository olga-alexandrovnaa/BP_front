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
  children?: ReactNode;
  onBlur?: () => void;
  onChange?: (value: any) => void;
  onPhotoChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: string;
  label: string;
  value?: any;
  width?: "small" | "smaller" | "medium" | "big" | "bigger";
  icon?: ReactElement;
  disabled?: boolean;
  textAfterInput?: string;
  getDateValueString?: (date?: Date) => string;
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
      className,
      onBlur,
      onChange,
      children,
      onPhotoChange,
      value,
      label,
      width,
      type,
      disabled,
      notDisabledEvent,
      textAfterInput,
      getDateValueString,
      isWithEvent,
      buttonLabel,
      eventAction,
      icon,
      clearable,
      required,
      ...props
    },
    forwardedRef
  ) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.value);
    };

    const onChangeTextAreaHandler = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      onChange?.(e.target.value);
    };

    const IconComponent = icon ?? <span />;

    const onButtonClick = useCallback(() => {
      if (eventAction) eventAction();
    }, [eventAction]);

    const ref = useRef<HTMLTextAreaElement>(null);

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
          className={classNames(
            styles.htmlInput,
            {[styles.disabled]: disabled}
          )}
          value={value ?? ""}
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
        <div className={styles.htmlInputBlock}>
          <textarea
            onChange={onChangeTextAreaHandler}
            className={classNames(
              styles.htmlInput,
              {[styles.disabled]: disabled}
            )}
            value={value ?? ""}
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
          className={classNames(
            styles.htmlInput,
            {[styles.disabled]: disabled}
          )}
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
            className={classNames(
              styles.htmlInputDate,
              {[styles.disabled]: disabled}
            )}
            {...props}
            type={type}
            disabled={disabled}
            onBlur={onBlur}
          />

          <div
            className={classNames(
              styles.htmlInputText,
              {[styles.disabled]: disabled}
            )}
          >
            {value
              ? getDateValueString
                ? getDateValueString(value)
                : value
              : ""}
          </div>

          {clearable && !!value && (
            <div className={styles.clear} onClick={() => onChange(undefined)}>
              <Clear width={12} height={12} />
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
            className={classNames(
              styles.htmlInput,
              {[styles.disabled]: disabled}
            )}
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
      >
        <div
          className={
            type !== "file" ? styles.inputBlock : styles.inputBlockFile
          }
        >
          <span className={classNames(styles.inputLabel)}>
            {label}
            {required && (
              <span className={classNames(styles.required)}>
                {` (Обязательное поле)`}
              </span>
            )}
          </span>
          {children ? children : input}
        </div>
        {/* {isWithEvent !== undefined ? ( */}
        {type === "file" && (
          <label className={styles.img}>{value ? value : undefined}</label>
        )}
        {(!disabled || notDisabledEvent) && (
          <button
            className={classNames(
              styles.button,
              {[styles.disabled]: disabled}
            )}
            onClick={onButtonClick}
          >
            {!!icon && <span className={styles.icon}>{IconComponent}</span>}
            {!!buttonLabel && <span>{buttonLabel}</span>}
          </button>
        )}

        {/* ) : null} */}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
