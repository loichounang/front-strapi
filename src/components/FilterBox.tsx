
import React, { useState } from 'react';

import Slide from '@mui/material/Slide';
import { Box, styled } from "@mui/system";

import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';


import { Colors } from 'themes/theme';
import TextField from '@mui/material/TextField';

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from '@mui/material/IconButton';
import { BasicTextFilterForm, BasicTextFilterProps } from './ui/BasicTextFilterForm';
import { IFeatureDescription } from 'library/interface';
import { HeadCell } from './ui/EnhancedTable';
import { Height } from '@mui/icons-material';

import { currentUserSessionAtom, isSearchBoxShowAtom, currentBasicTextFilterPropsAtom } from 'library/store';


export function FilterBox()  {

    const { t, i18n } = useTranslation();

    // const [currentUserSession, setCurrentUserSession] = useRecoilState(currentUserSessionAtom);

    //const entityName = useRecoilValue(currentEntityNameForActionDrawerAtom);
    //const entityId = useRecoilValue(currentEntityIdForActionDrawerAtom);

  const [isSearchBoxShow, setIsSearchBoxShow] = useRecoilState(isSearchBoxShowAtom);
  const [currentBasicTextFilterProps,setCurrentBasicTextFilterProps ] = useRecoilState(currentBasicTextFilterPropsAtom);

  
const handleDoubleClickRowFilterFeature = async (event: React.MouseEvent<unknown>, row: IFeatureDescription) => {
    
  }

  return (
    <Slide direction="down" in={isSearchBoxShow} timeout={500}>
        <Box sx={ {position: "absolute",
            top: 0,
            left: '5%',
            width: "90%",
            height: "100%",
            background: Colors.primary,
            //display: "flex",
            //justifyContent: "center",
            //alignItems: "center",
            zIndex: 99999,
            opacity: 0.95,}  }>
            
              <IconButton
                  onClick={() => setIsSearchBoxShow(false) }
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                  }}
        >
          <CloseIcon sx={{ fontSize: "2rem" }} color="secondary" />
        </IconButton>
            {/* <BasicTextFilterForm title={t('Features')} headCells={headFeatureCells} objKey='name'
                onFilterButtonClick={handleClickFilterFeatureButton} onRowDoubleClick={handleDoubleClickRowFilterFeature}
                rows={filteredFeatures} filterElements={filterFeatures} /> */}
                <BasicTextFilterForm {...currentBasicTextFilterProps }  />
        </Box>        
    </Slide>
  )
}
