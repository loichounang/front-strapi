import React, { useState, useEffect } from 'react';
import { Popover, List, ListItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface SubCategory {
  id: number;
  sousCategorie: string;
  sousCategorie_Text: string;
  sousCategorie_Parent: string;
  sousCategorie_ParentText: string;
}

interface ServicesSubMenuProps {
  open: boolean;
  onClose: () => void;
}

const SousMenus: React.FC<ServicesSubMenuProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<{ [key: string]: SubCategory[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://skrapi-api.univ-soft.com/api/production/content/v1/uivso3e8mh70hadagairiyamswx/subCategory/get-contents');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        const data: SubCategory[] = await response.json();
        const categoriesMap: { [key: string]: SubCategory[] } = {};

        data.forEach((subcategory: SubCategory) => {
          if (!categoriesMap[subcategory.sousCategorie_ParentText]) {
            categoriesMap[subcategory.sousCategorie_ParentText] = [];
          }
          categoriesMap[subcategory.sousCategorie_ParentText].push(subcategory);
        });

        setCategories(categoriesMap);
      } catch (error) {
        console.error('Erreur:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCategoryHover = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCategoryLeave = () => {
    setSelectedCategory('');
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
        <ListItem sx={{ marginRight: '20px' }}>
          <List>
            {Object.keys(categories).map((categoryName) => (
              <ListItem key={categoryName}>
                <Link
                  to="#"
                  onClick={() => handleCategorySelect(categoryName)}
                  onMouseEnter={() => handleCategoryHover(categoryName)}
                  onMouseLeave={handleCategoryLeave}
                  style={{
                    textDecoration: 'none',
                    fontFamily: 'Poppins',
                    color: selectedCategory === categoryName ? '#ff0000' : '#000',
                    fontWeight: '600',
                  }}
                >
                  {t(categoryName)}
                </Link>
              </ListItem>
            ))}
          </List>
        </ListItem>

        <ListItem sx={{ marginRight: '20px' }}>
          <List>
            {categories[selectedCategory]?.map((subcategory) => (
              <ListItem key={subcategory.id}>
                {t(subcategory.sousCategorie_Text)} - {subcategory.sousCategorie}
              </ListItem>
            ))}
          </List>
        </ListItem>
      </List>
    </Popover>
  );
};

export default SousMenus;
