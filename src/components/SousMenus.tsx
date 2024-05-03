import React, { useState } from 'react';
import { Popover, List, ListItem, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface ServicesSubMenuProps {
  open: boolean;
  onClose: () => void;
}

const SousMenus: React.FC<ServicesSubMenuProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // État pour stocker la catégorie sélectionnée

  // Fonction pour mettre à jour la catégorie sélectionnée
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 180, left: 200 }}
      PaperProps={{ sx: { width: 1000, height: 300 } }}
    >
      <List sx={{ display: 'flex', flexDirection: 'row' }}>
        {/* Première colonne */}
        <ListItem sx={{ marginRight: '20px' }}>
          <List>
            <ListItem>
              <Button
                sx={{ fontFamily: 'Poppins', color: selectedCategory === 'IP' ? '#ff0000' : '#000', fontWeight: '600' }}
                component={Link}
                to="#"
                onClick={() => handleCategorySelect('IP')}
              >
                {t('IP')}
              </Button>
            </ListItem>
            <ListItem>
              <Button
                sx={{ fontFamily: 'Poppins', color: selectedCategory === 'CCTV' ? '#ff0000' : '#000', fontWeight: '600' }}
                component={Link}
                to="#"
                onClick={() => handleCategorySelect('CCTV')}
              >
                {t('CCTV')}
              </Button>
            </ListItem>
            <ListItem>
              <Button
                sx={{ fontFamily: 'Poppins', color: selectedCategory === 'Intrusion' ? '#ff0000' : '#000', fontWeight: '600' }}
                component={Link}
                to="#"
                onClick={() => handleCategorySelect('Intrusion')}
              >
                {t('Intrusion')}
              </Button>
            </ListItem>
            <ListItem>
              <Button
                sx={{ fontFamily: 'Poppins', color: selectedCategory === 'Accessoires' ? '#ff0000' : '#000', fontWeight: '600' }}
                component={Link}
                to="#"
                onClick={() => handleCategorySelect('Accessoires')}
              >
                {t('Accessoires')}
              </Button>
            </ListItem>
            <ListItem>
              <Button
                sx={{ fontFamily: 'Poppins', color: selectedCategory === 'Reseaux' ? '#ff0000' : '#000', fontWeight: '600' }}
                component={Link}
                to="#"
                onClick={() => handleCategorySelect('Reseaux')}
              >
                {t('Reseaux')}
              </Button>
            </ListItem>
          </List>
        </ListItem>

        {/* Deuxième colonne */}
        <ListItem sx={{ marginRight: '20px' }}>
          <List>
            {/* Affiche le contenu en fonction de la catégorie sélectionnée */}
            {selectedCategory === 'IP' && (
              <>
                <ListItem>Contenu pour la catégorie IP</ListItem>
                <ListItem>Élément 1</ListItem>
                <ListItem>Élément 2</ListItem>
                <ListItem>Élément 3</ListItem>
              </>
            )}
            {/* Répéter pour chaque catégorie */}
          </List>
        </ListItem>

        {/* Troisième colonne */}
        <ListItem sx={{ marginRight: '20px' }}>
          <List>
            {/* Affiche le contenu en fonction de la catégorie sélectionnée */}
            {/* Répéter pour chaque catégorie */}
          </List>
        </ListItem>

        {/* Quatrième colonne */}
        <ListItem sx={{ marginRight: '20px' }}>
          <List>
            {/* Affiche le contenu en fonction de la catégorie sélectionnée */}
            {/* Répéter pour chaque catégorie */}
          </List>
        </ListItem>

        {/* Cinquième colonne */}
        <ListItem>
          <List>
            {/* Affiche le contenu en fonction de la catégorie sélectionnée */}
            {/* Répéter pour chaque catégorie */}
          </List>
        </ListItem>
      </List>
    </Popover>
  );
};

export default SousMenus;
