import "./BottomSheet.css"
import clsx from "clsx";
import {useBottomSheet} from "./lib";
import React, {HtmlHTMLAttributes} from "react";

declare module 'react' {
    interface CSSProperties {
        [key: `--${string}`]: string | number
    }
}

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
    classNames?: {
        container?: string
        header?: string
        divider?: string
        content?: string
    }
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    options?: {
        /** Point for fullscreen open bs 0...1. Default 0.3. */
        fullScreenPoint?: number
        /** Point for close bs 0...1. Default 0.7. */
        closePoint?: number
        /** Point for open bs 0...1. Default 0.7. */
        startPoint?: number
    }
}

export const BottomSheet = ({isOpen, onClose, options, className, classNames, children, ...props}: Props) => {
    const {
        sheetRef,
        top,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    } = useBottomSheet(isOpen, onClose, options?.fullScreenPoint, options?.closePoint, options?.startPoint);

    return (
        <div
            className={clsx('bottom-sheet', 'transition', className, classNames?.container, {
                open: isOpen,
            })}
            {...props}
            style={{
                "--top": top + "px",
            }}
            ref={sheetRef}
        >
            <div
                className={clsx("bottom-sheet__header", classNames?.header)}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <hr className={clsx("bottom-sheet__header__divider", classNames?.divider)}/>
            </div>

            <div className={clsx("bottom-sheet__content", classNames?.content)}>
                {children}
            </div>
        </div>
    );
};
