import React from 'react';
import { Popover, List, ListItem, Button } from '@mui/material';
import { useTranslation } from 'react-i18next'; // Importe useTranslation pour utiliser la traduction
import {  Link } from 'react-router-dom';


interface ServicesSubMenuProps {
  open: boolean;
  onClose: () => void;
  
  
}
const SousMenus: React.FC<ServicesSubMenuProps> = ({ open, onClose}) => {
    const { t } = useTranslation();
  

    return (
      <Popover
        open={open}
        onClose={onClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 112, left: 450 }}
        PaperProps={{ sx: { width: 300, height: 300 } }} 
        
      >
        <List sx={{ display: 'flex', flexDirection: 'row', justifyContent:'center' }}>
          <ListItem sx={{ marginRight: '20px' }}>
            <List > 
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/soins-de-visage" onClick={onClose}>
                  {t('SOINS DE VISAGE')}
                </Button>
              </ListItem>
              <ListItem>
              
              <Button sx={{ fontFamily: 'Poppins', color: '#000', fontWeight: '400' }}  component={Link} to="/soins-de-corps" onClick={onClose}>
                {t('SOINS DE CORPS')}
              </Button>
            </ListItem>
            <ListItem>
              
              <Button sx={{ fontFamily: 'Poppins', color: '#000', fontWeight: '400' }}  component={Link} to="/mains-et-pieds" onClick={onClose}>
                {t('MAINS ET PIEDS')}
              </Button>
            </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/bien-être" onClick={onClose}>
                {t('BIEN-ETRE')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="#" onClick={onClose}>
                {t('RELOOKING VISAGE ET MICRO PIGMENTATION')}
                </Button>
              </ListItem>
            </List>
          </ListItem>
          
        </List>
      </Popover>
    );
  };
  
  export default SousMenus;
  