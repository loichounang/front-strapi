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
        anchorPosition={{ top: 112, left: 200 }}
        PaperProps={{ sx: { width: 1000, height: 300 } }} 
        
      >
        <List sx={{ display: 'flex', flexDirection: 'row' }}>
          <ListItem sx={{ marginRight: '20px' }}>
            <List>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'600'  }} component={Link} to="#" onClick={onClose}>
                  {t('Onglerie')}
                </Button>
              </ListItem>
              <ListItem>
              
              <Button sx={{ fontFamily: 'Poppins', color: '#000', fontWeight: '400' }}  component={Link} to="/service/PoseGel" onClick={onClose}>
                {t('Pose gel')}
              </Button>
            </ListItem>
            <ListItem>
              
              <Button sx={{ fontFamily: 'Poppins', color: '#000', fontWeight: '400' }}  component={Link} to="/service/PoseVernis" onClick={onClose}>
                {t('Pose vernis')}
              </Button>
            </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Manicure')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Pedicure')}
                </Button>
              </ListItem>
            </List>
          </ListItem>
          <ListItem sx={{ marginRight: '20px' }}>
            <List>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'600'  }} component={Link} to="/spa" onClick={onClose}>
                  {t('Spa')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service2" onClick={onClose}>
                  {t('Massage')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Soin de corps')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Soin de visagz')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Epilation')}
                </Button>
              </ListItem>
            </List>
          </ListItem>
          <ListItem sx={{ marginRight: '20px' }}>
            <List>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'600'  }} component={Link} to="/coiffure" onClick={onClose}>
                  {t('Coiffure')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service1" onClick={onClose}>
                  {t('Soin capillaire')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Tresses')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Coiffure femme')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins' , color:'#000', fontWeight:'400' }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Coiffure homme')}
                </Button>
              </ListItem>
            </List>
          </ListItem>
          <ListItem >
            <List>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'600'  }} component={Link} to="/soin-du-regard" onClick={onClose}>
                  {t('Soin du regard')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service2" onClick={onClose}>
                  {t('Make-up')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins' , color:'#000', fontWeight:'400' }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Regard')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins' , color:'#000', fontWeight:'400' }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Formation')}
                </Button>
              </ListItem>
              <ListItem>
                <Button sx={{ fontFamily:'Poppins', color:'#000', fontWeight:'400'  }} component={Link} to="/service/pogeGel" onClick={onClose}>
                {t('Pose gel')}
                </Button>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </Popover>
    );
  };
  
  export default SousMenus;
  