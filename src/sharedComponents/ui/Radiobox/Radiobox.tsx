import React, { FC, ElementType } from 'react'
import styles from './Radiobox.module.scss'
import { classNames } from '@/sharedComponents/lib/classNames/classNames'

interface Props {
    checkedValue?: any
    className?: string
    icon?: string
    label: string
    description?: string
    onChange?: (value: any) => void
    value: any
}

export const Radiobox: FC<Props> = ({
    checkedValue = true,
    className,
    icon,
    label,
    description,
    onChange,
    value,
}) => {

    const checked = checkedValue === value

    return (
        <div
            className={ classNames(styles.wrap, {
                [styles.checkedWrap]: checked,
                [styles.bgWhite]: !!description,
            }, [className]) }
            onClick={ () => {
                if (onChange) {
                    onChange(value)
                }
            } }
        >
            <div
                className={ classNames( styles.radiobox, {
                    [styles.checked]: checked,
                    [styles.smallIcon]: !!description,
                }) }
            />
            
            <div className={ classNames(styles.label, { [styles.notBoldLabel]: !!description}) }>
                { icon !== undefined ? <span className={ styles.icon }>{icon ?? <span />}</span> : null }
                <span>{ label }</span>

                {!!description && <div className={ styles.description }>{ description }</div>}
            </div>
        </div>
    )
}
