import { useEffect, useRef, useState } from "react";

export const useObserverScroll = (fetch) => {

    const [isVisible, setIsVisible] = useState(false);
    const targetRef = useRef();
    
    const callbackFunction = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction);

        const setNewObserver = () => {
            const currentTarget = targetRef.current;
            if (currentTarget) {
                observer.observe(currentTarget);
            }
        };

        if (isVisible) {
            fetch();
            setNewObserver();
        }

        setNewObserver();
    }, [targetRef, isVisible]);

    return targetRef;
}