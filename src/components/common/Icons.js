import React from 'react';

export const ProgressIcon = props => {
    let {size, color} = props;
    return <svg className='progress-indicator'
                width={size ? size : '44'} height={size ? size : '44'} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="20" stroke="black" strokeOpacity="0.2" strokeWidth="4"/>
        <path d="M42 22C42 33.0457 33.0457 42 22 42" stroke="url(#paint0_linear)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        <defs>
            <linearGradient id="paint0_linear" x1="22.5" y1="42" x2="42" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor={color ? color : "white"}/>
                <stop offset="1" stopColor={color ? color : "white"} stopOpacity="0"/>
            </linearGradient>
        </defs>
    </svg>
};
