import React, { useState, useRef, useEffect } from "react"
import uuid from "uuid"

import "./dropdown.scss"

const Dropdown = ({ items = [], activatorText = "Dropdown" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const listRef = useRef(null);
    const activatorRef = useRef(null);

    const handleWrapKeyUp = (event) => {
        if (event.key === "Escape" && isOpen) {
            setIsOpen(false);
            activatorRef.current && activatorRef.current.focus();
        }
    };

    const handleClickActivator = () => {
        setIsOpen(!isOpen);
    }

    const handleClickOutside = (event) => {
        if ((listRef.current && listRef.current.contains(event.target)) || (activatorRef.current && activatorRef.current.contains(event.target))) {
            return
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mouseup", handleClickOutside);
            listRef.current && listRef.current.querySelector('a').focus();
        } else {
            document.removeEventListener("mouseup", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [isOpen]);


    return (
        <div
            className="dropdown-wrap"
            onKeyUp={handleWrapKeyUp}
        >
            <button
                aria-haspopup="true"
                aria-controls="dropdown-list"
                className="dropdown-activator"
                ref={activatorRef}
                onClick={handleClickActivator}
            >
                {activatorText}
            </button>
            <ul
                id="dropdown-list"
                className={`dropdown-itemList ${isOpen ? "active" : ""}`}
                ref={listRef}
                role="list" >
                {items.length === 0
                    ? <li>No items</li>
                    : items.map(item => (
                        <li key={uuid()} role="listitem">
                            <a href={item.url}>{item.text}</a>
                        </li>
                    ))}

            </ul>

        </div>
    )
}
export default Dropdown
