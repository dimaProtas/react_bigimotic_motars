import React, { useEffect, useRef } from 'react';
import s from './ScrollUsers.module.css';
import { AiOutlineReload } from 'react-icons/ai';

const Scroll = (props) => {
    const scrollTimeoutRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            clearTimeout(scrollTimeoutRef.current);

            scrollTimeoutRef.current = setTimeout(() => {
                const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
                if (scrolledToBottom) {
                    props.getNextUsers();

                }
            }, 200);

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
                clearTimeout(scrollTimeoutRef.current);
            };
        };

        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(scrollTimeoutRef.current);
        };
    }, [props, props.setShowScrollIcon]);

    return (
        <div>
            {props.showScrollIcon && (
                <p className={s.ScrollIcon}>
                    <AiOutlineReload />
                </p>
            )}
        </div>
    );
};

export default Scroll;
