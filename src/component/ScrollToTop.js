import { React, useState, useEffect } from 'react';


export default function ScrollToTop() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    const topUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    return (
        <div className="top-to-btm">
            {showTopBtn && (
                <button
                    className="btn icon-position icon-style"
                    onClick={topUp}
                >Top</button>
            )}
        </div>
    )
}
