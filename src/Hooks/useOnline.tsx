import { useEffect, useState } from "react";
export function useOnline() {
    const [isOnline, setIsOnline] = useState(true);
    useEffect(() => {
        const esOnline = () => setIsOnline(true);
        const esOffline = () => setIsOnline(false);
        window.addEventListener("online", esOnline);
        window.addEventListener("offline", esOffline);
        return () => {
            window.removeEventListener("online", esOnline);
            window.removeEventListener("offline", esOffline);
        }
    }, []);
    return isOnline;
}