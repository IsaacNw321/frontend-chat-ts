import { useEffect, useMemo } from "react";
const useDebounce = (callback: () => void, delay: number) => {
    const debouncedCallback = useMemo(() => callback, [callback]);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            debouncedCallback();
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [debouncedCallback, delay]);
};

export default useDebounce