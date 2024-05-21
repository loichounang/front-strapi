import React, {FC, useState, ChangeEvent, useEffect, ElementType}  from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import {Divider, SvgIconProps, Typography} from '@mui/material';

import Avatar from '@mui/material/Avatar';

//import Loader from "react-loader-spinner";
import {ThreeDots} from "react-loader-spinner";


//import Checkbox from '@mui/material/Checkbox';
import ListSubheader from '@mui/material/ListSubheader';

import { blue } from '@mui/material/colors';


export interface BasicButtonListProps<T> {
    items: T[];
    valueKey : keyof T;
    displayKey : keyof T;

    //initialItemsSelected?: any[],
    title? : string,

    icon: ElementType<SvgIconProps>;
    
    onItemClick?: (item: T ) => void;

    // setSelectedItems?: React.Dispatch<React.SetStateAction<any[]>>; 
    // onItemCheckedChange?: (event: ChangeEvent<HTMLInputElement>,checked: boolean, item: T ) => void;
}

function  BasicButtonList<T>(props: BasicButtonListProps<T>) {

    const {items, valueKey, displayKey, onItemClick, icon , title} = props;
    //const [checkedItems, setCheckedItems] = useState<any[]>(initialItemsSelected || []);

    const [isItemClicked, setIsItemClicked] = useState(false);

    const handleCheckedChange = (event: ChangeEvent<HTMLInputElement>,checked: boolean, item: T ) => {
        //console.log(checkedItems);
        // const value = item[valueKey];
        // const newChecked = checkedItems.filter( v => v !== value ); 
        // if(checked)
        //     newChecked.push(value);

        //setCheckedItems(newChecked);    
        // if(setSelectedItems) setSelectedItems(newChecked);   
        // if(onItemCheckedChange) onItemCheckedChange(event, checked, item);        
    }

    const handleItemClick = async (item: T ) => {
        setIsItemClicked(true);
        if(onItemClick) {
            await onItemClick(item);
        }
        setIsItemClicked(false);
        //onItemClick?() => onItemClick(item): () => {}
    }

    const IconComponent = icon;

    //useEffect( () => { setCheckedItems(initialItemsSelected || []);}, [initialItemsSelected] );

    return(
        <List dense component="div" role="list"
            sx={{ width: '100%',  bgcolor: 'background.paper', pb: '0px'   }}
            subheader={ isItemClicked?<ThreeDots color='#00BFFF' height={'100%'} /> : 
                    <ListSubheader sx={{ pl: '100px', pt: '24px' } }>
                        <Typography
                            sx={{
                                color: 'primary', // (theme) => theme.palette.text.primary,
                                fontWeight: 'bold',
                            }}
                            >
                            {title}
                        </Typography>                        
                    </ListSubheader> }
        >
            
            {items.map((item, idx) =>{ 
                //const labelId = `checkbox-list-label-${item[displayKey] as unknown as string}`;

                return (
                <ListItem button key={idx} role="listitem" onClick={() => handleItemClick(item)} disabled={isItemClicked} >
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                            <IconComponent />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText id={item[valueKey] as unknown as string}>
                        <Typography
                            sx={{ color: 'primary', fontWeight: 'bold', }} >
                            {item[displayKey] as unknown as string}
                        </Typography>
                    </ListItemText>
                </ListItem>
            )} )
            }
        </List>
    );

}

export default BasicButtonList;