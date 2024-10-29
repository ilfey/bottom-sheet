import {TouchEvent, TouchEventHandler, useEffect, useMemo, useRef, useState} from "react";

export const useBottomSheet = (
    isOpen: boolean,
    onClose: () => void,
    fullScreenPoint = 0.3,
    closePoint = 0.7,
    startPoint = 0.7,
) => {
    const fullScreenMemo = useMemo(() => window.innerHeight * fullScreenPoint, [fullScreenPoint]);
    const closeMemo = useMemo(() => window.innerHeight * closePoint, [closePoint]);
    const startMemo = useMemo(() => window.innerHeight * startPoint, [startPoint]);

    const touch = useRef<TouchEvent<HTMLDivElement> | null>(null)
    const [innerY, setInnerY] = useState(0)
    const sheetRef = useRef<HTMLDivElement>(null);

    const [top, setTop] = useState(window.innerHeight);

    useEffect(() => {
        if (isOpen) {
            setTop(startMemo);
            document.documentElement.classList.add("disable-pull-to-refresh");
        } else {
            setTop(window.innerHeight);
            document.documentElement.classList.remove("disable-pull-to-refresh");
        }
    }, [isOpen, setTop]);

    const onTouchEnd: TouchEventHandler<HTMLDivElement> = () => {
        const cY = touch.current!.touches[0].clientY;

        sheetRef.current?.classList.add("transition");

        if (cY <= fullScreenMemo) {
            setTop(0)
            return
        }

        if (cY >= closeMemo) {
            setTop(window.innerHeight)
            onClose()
            return
        }
    };

    const onTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
        touch.current = event
        const cY = event.touches[0].clientY

        if (cY > 0) {
            setTop(cY + innerY);
        }
    };

    const onTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
        const cY = event.touches[0].clientY
        setInnerY(top - cY);
        sheetRef.current?.classList.remove("transition");
    }

    return {
        sheetRef,
        top,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
    }

}