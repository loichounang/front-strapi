import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const WhatsApp = () => {
    const iconStyle = {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        color: '#25d366',
        fontSize: '55px'
    };

    return (
        <a href="https://wa.me/237699051886" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon fontSize="large" sx={iconStyle} />
        </a>
    );
};

export default WhatsApp;
