import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { isFalsy } from 'utility-types';
import { IMainInformation, defaultMainInformation } from 'features/setup/models/MainInformation';
import useMainInformation from 'features/setup/services/MainInformation';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { typographyBigGroupBoxStyling, typographySmallHandWriting } from 'themes/commonStyles';

const SocialMedia = () => {
    const { getMainInformations } = useMainInformation();
    const { data: mainInformations } = useQuery<IMainInformation[]>(['MainInformation'], () => getMainInformations());
    const [mainInformation, setMainInformation] = useState<IMainInformation>(defaultMainInformation);
    useEffect(() => {
        if (!isFalsy(mainInformations) && mainInformations?.length > 0)
            setMainInformation(mainInformations[0]);
    }, [mainInformations]);
    return (
        <Box sx={{ mt: 0.25, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography sx={{fontSize: '45px'}} {...typographySmallHandWriting}>
                Suivez nous sur
            </Typography>
            <Typography>
                <Link to={mainInformation.lienFacebook} target="_blank" style={{ textDecoration: 'none', color: '#3b5998', marginRight: '30px' }}>
                    <FacebookIcon sx={{ fontSize: '45px' }} />
                </Link>
                <Link to={mainInformation.lienInstagram} target="_blank" style={{ textDecoration: 'none', color: '#e4405f', marginRight: '30px' }}>
                    <InstagramIcon sx={{ fontSize: '45px' }} />
                </Link>
                <Link to={mainInformation.lienTwitter} target="_blank" style={{ textDecoration: 'none', color: '#1da1f2', marginRight: '30px' }}>
                    <TwitterIcon sx={{ fontSize: '45px' }} />
                </Link>
                <Link to={mainInformation.lienLinkedin} target="_blank" style={{ textDecoration: 'none', color: '#0077b5' }}>
                    <LinkedInIcon sx={{ fontSize: '45px' }} />
                </Link>
            </Typography>
            <Typography sx={{marginTop:'6px'}}></Typography>
        </Box>
    );
}

export default SocialMedia;
