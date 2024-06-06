import React, {useState, useEffect, ChangeEvent, ElementType,MouseEventHandler, MouseEvent, MutableRefObject} from 'react';
import { alpha } from '@mui/material/styles';

import Loader, { ThreeDots } from "react-loader-spinner";

import { useSnackbar } from 'notistack';
import { useTranslation  } from 'react-i18next';

import NumberFormat, { NumberFormatValues } from 'react-number-format';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
    Toolbar,  Typography, Paper, TextField, Checkbox, IconButton, Tooltip, FormControlLabel, Switch, SvgIcon, SvgIconProps } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import {Delete as DeleteIcon, FilterList as FilterListIcon, LineStyle as LineStyleIcon,
  DownloadForOfflineRounded as DownloadForOfflineRoundedIcon } from '@mui/icons-material';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import InputAdornment from '@mui/material/InputAdornment';

//import DatePicker from '@mui/lab/DatePicker';

import { DatePicker, TimePicker } from '@mui/x-date-pickers/';

import { visuallyHidden } from '@mui/utils';
//import * from '@mui/material/SvgIcon';

import { useForm, useFormContext, useFieldArray, ArrayPath, FieldArrayWithId, Controller, Control, UseFormRegister, Path, FieldValues, FieldArrayPath, FieldArray, FieldArrayMethodProps, UseFieldArrayReturn } from 'react-hook-form';

import {FormDialog} from './FormDialog';

import TextFieldRight from './TextFieldRight';

import { exportToExcel } from 'library/xlsx-export';

import {format, parseISO} from 'date-fns';
import numeral from 'numeral';
import { isFalsy } from 'utility-types';

import { useRecoilState, useRecoilValue } from 'recoil';
import { colorsAtom, currentUserSessionAtom } from 'library/store';


const MAX_ROW_LEN = 200;

type Order = 'asc' | 'desc';

type _DataType = 'string' | 'numeric' | 'boolean' | 'date'| 'datetime' | 'dynamic'| 'expression';

type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';

type RowCheckedMode = 'none' | 'single' | 'multiple';

function typeAlign( type: _DataType) : Alignment {
    
    if(type === 'numeric') return 'right';
    if(type === 'string') return 'left';
    
    return 'center';
  }

  type NestedKeyOf<T> = T extends object ? { [K in keyof T]: `${K & string}` | `${K & string & keyof T[K]}` }[keyof T] : never;

  function getValueById<T>(obj: T , id: keyof T | NestedKeyOf<T>): any /*T[keyof T | NestedKeyOf<T>]*/ {
    if (typeof id === 'string') {
      const nestedKeys = id.split('.') as Array<keyof T>;
      let currentValue: any = obj;

      for (const key of nestedKeys) {
          currentValue = currentValue[key];
      }
      return currentValue;
    }else {
      return obj[id];
    }
  }

  function setValueById<T>(obj: T, id: keyof T | NestedKeyOf<T>, value: any /*T[keyof T]*/): void {
    if (typeof id === 'string') {
        const nestedKeys = id.split('.') as Array<keyof T>;
        let currentObj: any = obj;

        // Traverse the object to the nested property, excluding the last key
        for (const key of nestedKeys.slice(0, -1)) {
            currentObj = currentObj[key];
        }

        // Set the value for the nested property
        currentObj[nestedKeys[nestedKeys.length - 1]] = value;
    } else {
        // Set the value for the direct property
        obj[id] = value;
    }
}


 
 export interface HeadCell<T> {
    //disablePadding: boolean;
    id: keyof T,
    label: string,
    //numeric: boolean;
    type: _DataType,
    display: boolean,

    width?: number,
    isPassword?: boolean,

    decimalScale?: 0|1|2|3|4;

    minTime?: Date,
    maxTime?: Date,

    //booleanOptions?: string[], // []

    options?: {value: string, name: string}[],

    getLabel?: (row: T, cellId: keyof T) => string,
    getEnumerationCode?: (row: T, cellId: keyof T ) => string,
    getOptions?: (row: T, cellId: keyof T , opts: {value: string, name: string}[] ) => {value: string, name: string}[],
    getVisibility?: (row: T, cellId: keyof T  ) => boolean,

    getInputAdornment?: (row: T, cellId: keyof T) => CellInputAdornment<T>;

    isEditable?: (row: T, cellId: keyof T) => boolean,

    isAllowed?: (row: T, value: any) => boolean,

    handleKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>,row: T ,index: number) => void,
}

export interface CellInputAdornment<T> {
  toolTip: string,
  onClickIcon: (event : any, index: number, row: T) => void,

  iconDisable?: boolean,
  icon: ElementType<SvgIconProps>,
}

const defaultCellInputAdornment: CellInputAdornment<any> = {
  toolTip: '',
  onClickIcon: (event: any, index: number, row: any) => {},
  icon: NotInterestedIcon,
}

export interface ActionIconTableRow<O,T> {
  toolTip: string,
  onRowClickIcon: (event : any, index: number ,/*field: FieldArrayWithId<O, ArrayPath<O>, string>,*/ row: T) => void,

  icon: ElementType<SvgIconProps>,
  hasAction?: boolean | ((index: number,row: T) => boolean),
  isActionExecuting?: boolean,
}

const defaultActionIconTableRow: ActionIconTableRow<any,any> = {
    
  toolTip: '',
  onRowClickIcon: (event: any,index: number ,/*field: any,*/ row: any) => {},
  icon: NotInterestedIcon,
  hasAction: false,
  isActionExecuting: false
}

interface ActionIconTableToolBar {
  toolTip: string,
  onClickIcon: (event : any) => void,

  icon: ElementType<SvgIconProps>,
  isActionExecuting?: boolean,
}

export interface ArrayFieldTableProps<O extends FieldValues,T, TKeyName extends string> {
    //numSelected: number;
    // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
    // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;

    isEditable?: boolean,
    //register: UseFormRegister<O>;
    //control: Control<O, object>;

    control?: Control<O>,
    
    mainObject?: O,

    //fields?: FieldArrayWithId<O, ArrayPath<O> >[],
 
    rowFilterMethod?: (obj: O | undefined,row: T) => boolean;

    //entity: O;
    //rowsName: ArrayPath<O>,
    //rows: T[];

    rowsPathName?: FieldArrayPath<O> ,

    refAppend?: MutableRefObject<(value: Partial<FieldArray<O>> | Partial<FieldArray<O>>[], options?: FieldArrayMethodProps) => void>,    
    refUpdate?: MutableRefObject<(index: number,value: Partial<FieldArray<O>> ) => void>,
    refRemove?: MutableRefObject<(index: number ) => void>,

    // order: Order;  index: number, value: Partial<FieldArray<TFieldValues, TFieldArrayName>>
    // orderBy: keyof T;
    //rowCount: number;
    headCells: HeadCell<T>[],
    fieldKey : keyof T,

    // fieldsName: string,

    //fields: FieldArrayWithId<O, ArrayPath<O> >[], //FieldArrayWithId<O, TFieldArrayName, TKeyName>[];
    
    //fieldArray: UseFieldArrayReturn<O, TFieldArrayName, TKeyName>,

    //nestedHeadCells3?: HeadCell<T3>[],
    
    onRowSelected?: (event: React.MouseEvent<unknown>,index: number,field: T) => void,

    onRowDoubleClick?: (event: React.MouseEvent<unknown>, index: number,field: T) => void,

    rowActionIcon?: (/*field: FieldArrayWithId<O, ArrayPath<O> >,*/ row: T) => ActionIconTableRow<O,T>,

    displayMore?: (/*field: FieldArrayWithId<O, ArrayPath<O> >,*/ row: T) => boolean,

    onRowCheckedSelectChange?: (event: ChangeEvent<HTMLInputElement>,checked: boolean, index: number ,row: T) => void,
    //[S, Dispatch<SetStateAction<S>>]
    stateSelected? : [any[], React.Dispatch<React.SetStateAction<any[]>>],
    stateSelectedIndex? : [number[], React.Dispatch<React.SetStateAction<number[]>>],

    title?: string,
    toolbarActions?: ActionIconTableToolBar[],

    canCheckRow?: boolean,
    canFilterColumn?: boolean,
    canDisplayHeader?: boolean,
    canDisplayColumnHeader?: boolean,

    rowCheckedMode?: RowCheckedMode,
  }

  export interface ArrayFieldTableHeadProps<T> {
    //numSelected: number;
    // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
    // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    //rows: T[];
    // order: Order;
    // orderBy: keyof T;
    // rowCount: number;
    
  headCells: HeadCell<T>[],
  canCheckRow?: boolean,
  canFilterColumn?: boolean,
  canDisplayColumnHeader?: boolean, 

  rows: T[],
}

 

function ArrayFieldTableHead<T>(props: ArrayFieldTableHeadProps<T>) {
    const {  headCells, canCheckRow, canFilterColumn, canDisplayColumnHeader, rows } = props;

    const [Colors, setColors] = useRecoilState(colorsAtom);

    const createSortHandler = (property: keyof T | NestedKeyOf<T>) => (event: React.MouseEvent<unknown>) => {
        //onRequestSort(event, property);
    };

    const handleColumnDialogClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();            
    };

    const [_canCheckRow, _canFilterColumn, _canDisplayColumnHeader] =
           [canCheckRow ?? true, canFilterColumn ?? true, canDisplayColumnHeader?? true];

    // automatically ajust cell width ....
    
    const widthUsed = headCells.map( h => (h.display && h.width)? h.width:0).reduce( (s,c) => s+c,0);
   
    const countRows = rows.length;
    const lenRow = countRows>MAX_ROW_LEN? MAX_ROW_LEN:countRows; 

   
    const headLens : {id: keyof T | NestedKeyOf<T>, nbCars: number}[] = headCells.filter(h => h.display).map( ({id, width}) => {
      let nbCars = 0;
      if( (!width && widthUsed <= 100) || widthUsed > 100 )
        for(var r=0; r<lenRow; r++){          
          const l = String( getValueById( rows[r], id) ).length; // String( rows[r][id] ).length;
          //nbCars = nbCars > l ? nbCars : l; // for taking the max
          nbCars += l/lenRow; // for taking the average.
        }
      return {id, nbCars: lenRow===0? String(id).length: nbCars}
    });


    const totalNbCars = headLens.map(h => h.nbCars).reduce( (s,c) => s+c,0) || 1;
    
    const cellWidths = headCells.filter(h => h.display).map( ({id, width}) => {
        
      const headLen = headLens.find(cell => cell.id === id)!;

      return {id, width: (width && widthUsed <= 100) ? width :  
                         (widthUsed > 100) ? Math.floor( headLen.nbCars*100/totalNbCars )
                          : Math.floor( headLen.nbCars*(100-widthUsed)/totalNbCars ) }      
    } );

    return (
      
      <TableHead>
        <TableRow>
          { _canCheckRow && <TableCell padding="checkbox" sx={{ fontWeight: 'bold', backgroundColor: Colors.gridHeader }}>
            <Checkbox
              color="primary"
              // indeterminate={numSelected > 0 && numSelected < rowCount}
              // checked={rowCount > 0 && numSelected === rowCount}
              //onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts', }}
            />
          </TableCell> }
          {headCells.filter( h => h.display).map((headCell) => { 
            const cellWidth = cellWidths.find( x => x.id == headCell.id);
            const _w = cellWidth? cellWidth.width : Math.floor(100 /  headCells.filter(h => h.display).length);
            const w = `${_w}%`;
            
            return (
            <TableCell
              key={headCell.id as string}
              align={typeAlign(headCell.type)}
              padding={true ? 'none' : 'normal'}
              style={{ whiteSpace: 'nowrap' }}
              sx={{ width: w, fontWeight: 'bold', backgroundColor: Colors.gridHeader }}
              // sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                // active={orderBy === headCell.id}
                // direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                { _canDisplayColumnHeader? headCell.label : ''}
                {/* {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null} */}
              </TableSortLabel>
            </TableCell>
            ) } )
          }
          { _canFilterColumn &&
          <TableCell padding="none" align="right" sx={{ fontWeight: 'bold', backgroundColor: Colors.gridHeader }}>
            <IconButton aria-label="filter list" onClick={handleColumnDialogClick} >
              <LineStyleIcon />
            </IconButton>   
            {/* <ColumnDialog open={openDialogColumn} columns={headCells} setColumns={setHeadCells}
              onCloseDialog={handleCloseColumnDialog} 
              onOkClick={handleOkClickColumnDialog} onCancelClick={handleCloseColumnDialog}
            />      */}
          </TableCell> }
        </TableRow>
      </TableHead>
      
    );
  }
  
  export interface ArrayFieldTableToolbarProps<T> {
    numSelected: number,
    title?: string,
    toolbarActions?: ActionIconTableToolBar[],

    canFilterColumn?: boolean,
    rows: T[]
  }

  function ArrayFieldTableToolbar<T>(props: ArrayFieldTableToolbarProps<T>) {
    const { numSelected, title, toolbarActions, canFilterColumn, rows } = props;  

    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const [isIconClicked, setIsIconClicked] = useState(false);
    const [iconIndexClicked, setIconIndexClicked] = useState<number>(-1);

    const filterColumn = canFilterColumn ?? true;

    const handleIconClick = async (event: any, indexClicked: number ,onClickIcon: (evt: any) => void ) => {
      
      if(isIconClicked) {
        enqueueSnackbar( t('There is an ongoing operation') , { variant: 'warning',
              anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1000 });
        return;
      }

      setIsIconClicked(true);
      //setIconIndexClicked(indexClicked);
      if(onClickIcon) {
          await onClickIcon(event);
      }
      
      //setIconIndexClicked(-1);
      setIsIconClicked(false);
      //onItemClick?() => onItemClick(item): () => {}
    }
  
    return (
      <Toolbar sx={ { pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, height: '32px', minHeight: '32px',
            ...(numSelected > 0 && { bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity), } ), alignItems: 'center', alignContent: 'center' } }  >
          <Typography  variant="h6" id="tableTitle" component="div" color="primary" noWrap >
            {title}
          </Typography>
          {/* {numSelected > 0 && 
            <Typography  color="secondary" variant="subtitle1" component="span" >
              {numSelected} selected
            </Typography>
          } */}
          <Box sx={{ flexGrow: 1 }} />
          { 
            toolbarActions && toolbarActions.map( ({toolTip,onClickIcon,icon, isActionExecuting}, idx) =>  {
              let IconComponent = icon;
              
              return (
                isActionExecuting ? <ThreeDots key={idx} color='#00BFFF' height={'100%'} />:
              <Tooltip title={toolTip} key={idx} >
                <IconButton onClick={(evt: any) => isIconClicked?() => {}:handleIconClick(evt,idx,onClickIcon)} color="primary" >
                  <IconComponent />
                </IconButton>
              </Tooltip>)
            } ) 
          }
          <Box sx={{ flexGrow: 1 }} />
          
          <Tooltip title="Export">
            <IconButton onClick={ () => { exportToExcel(rows, 'data ' + (title || ''));} } color="primary">
              <DownloadForOfflineRoundedIcon />
            </IconButton>
          </Tooltip>
          { filterColumn &&
          <Tooltip title="Filter list">
            <IconButton color="primary">
              <FilterListIcon />
            </IconButton>
          </Tooltip> }
        
      </Toolbar>
    );
  };

  export default function ArrayFieldTableEx<O extends FieldValues,T /*, TName extends ArrayPath<O>*/, TKeyName extends string >(props: ArrayFieldTableProps<O,T,TKeyName> ) {

    const { isEditable, 
            mainObject, fieldKey, headCells, title, toolbarActions, 
            rowsPathName, //
            
            rowActionIcon, displayMore, rowFilterMethod, 
            
            refAppend, refUpdate, refRemove,
            stateSelected, stateSelectedIndex,
            
            onRowSelected, onRowDoubleClick, onRowCheckedSelectChange,

            canCheckRow, canFilterColumn, canDisplayHeader, canDisplayColumnHeader, rowCheckedMode
              } = props;
            
    const [Colors, setColors] = useRecoilState(colorsAtom);

    const {language: lg} = useRecoilValue(currentUserSessionAtom);
       
    //const {  control  } = useFormContext();

    const {control: controlContext} = useFormContext();

    const control = props.control === undefined ? controlContext : props.control as Control<FieldValues>;
         

    
    // const rowsPathNameDef = rowsPathName as unknown as string;
    const rowsPathNameDef = String(rowsPathName); //  as unknown as string;

    let { fields, append, update ,remove,  } = useFieldArray({//<O, TName>({ //<O,`billingDetails.${number}.billingDetailTasks`>({
      name: rowsPathNameDef,
      control,            
    });


        
    const { t, i18n } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
        

    const [displayMoreColumns, setDisplayMoreColumns] = useState<boolean[]>( Array(fields.length).fill(false) );
    
    const [selected, setSelected] = React.useState<readonly any[]>([]);

    const [selectedIndex, setSelectedIndex] = React.useState<readonly number[]>([]);
   
    const [dense, setDense] = React.useState(true);    
    
    useEffect( () => { 
    
      if(refAppend) refAppend.current = append;
      if(refUpdate) refUpdate.current = update;
      if(refRemove) refRemove.current = remove;
      
    }, []);   

    const [_canCheckRow, _canFilterColumn,_canDisplayHeader,_canDisplayColumnHeader, _rowCheckedMode] = 
      [canCheckRow ?? true, canFilterColumn ?? true, canDisplayHeader ?? true, canDisplayColumnHeader ?? true, rowCheckedMode ?? 'single'];

    function displayCellBasic(cell : HeadCell<T>, row: T) : React.ReactNode {
      if(cell.type === 'boolean')
        return (<Checkbox checked={getValueById(row, cell.id) as unknown as boolean} 
            onChange={(event,checked) => _handleCellCheckedChange(event, checked, row, cell.id)} />)

      if(cell.type === 'date'){ 
          if(isFalsy( getValueById(row, cell.id) )) return '';
          
          return format(
              typeof getValueById(row, cell.id) === 'string' ?
              parseISO( getValueById(row, cell.id) as unknown as string):
              getValueById(row, cell.id) as unknown as Date
              , lg.includes('en')? 'MM/dd/yyyy':'dd/MM/yyyy');          
      }

      if(cell.type === 'numeric'){ 
        return numeral( getValueById(row, cell.id) ).format(); // format(parseISO(row[cell.id] as unknown as string), 'dd/MM/yyyy');
      }     

      return getValueById(row, cell.id) as unknown as string;
    }

    const w = '100' as string; // _fieldsPerRow === 2? '50' : '100' as string;

    function displayCell(cell : HeadCell<T>, idx: number, row: T) : React.ReactNode {

      if( ! (isEditable ?? true) ) 
          return displayCellBasic(cell, row);
    
      const cellId: string = String(cell.id);
      const rowKey = String(row[fieldKey]);
      

      // if(cell.type === 'boolean' && cell.booleanOptions && cell.booleanOptions.length === 2  ) {
                  
      //     return ((<Controller
      //         key={`key-${cellId}-${rowKey}`}
      //         render={ ({field: {onChange, value}}) => (
      //           <TextField select onChange={onChange} value={value} sx={{width:`calc(${w}% - 8px)`}}
      //             id={cell.id as unknown as string} 
      //             inputProps={ {readOnly: cell.isEditable? !cell.isEditable(row,cell.id): true }}
      //             //label={cell.getLabel?cell.getLabel(row,cell.id): row[cell.id]} 
      //             >                
      //             <MenuItem value={'true'}>{cell.booleanOptions![0]}</MenuItem>
      //             <MenuItem value={'false'}>{cell.booleanOptions![1]}</MenuItem>                
      //           </TextField>
      //         )}
              
      //         name={`${rowsPathNameDef}[${idx}].${cellId}`}
      //         control={control}
      //       />));
      // }

      if(cell.type === 'boolean')
        return (<Controller 
              key={`key-${cellId}-${rowKey}`}
               name={`${rowsPathNameDef}[${idx}].${cellId}`} // {isNested1?`${fieldsName}[${nest1}].${nestFieldsName1}[${idx}].${cell.id}` : `${fieldsName}[${idx}].${cell.id}`} 
                
                control={control}
                render={({ field: {onChange, value} }) => <Checkbox onChange={onChange} checked={value} inputProps={ {readOnly: cell.isEditable? !cell.isEditable(row,cell.id) : true }}/>}
                
             />);

      if(cell.type === 'string' && cell.getOptions  ) {
        const options = cell.getOptions(row, cell.id, cell.options || []);
          
          return ((<Controller
              key={`key-${cellId}-${rowKey}`}
              render={ ({field: {onChange, value}}) => (
                <TextField select onChange={onChange} value={value} sx={{width:`calc(${w}% - 8px)`}}
                  id={cell.id as unknown as string} 
                  inputProps={ {readOnly: cell.isEditable? !cell.isEditable(row,cell.id): true }}
                  //label={cell.getLabel?cell.getLabel(row,cell.id): row[cell.id]} 
                  >
                {options && options.map( 
                  (opt,ix) => <MenuItem key={opt.value} value={opt.value}>{opt.name}</MenuItem> )
                }
                </TextField>
              )}
              
              name={`${rowsPathNameDef}[${idx}].${cellId}`}
              control={control}
            />));
      }



      if(cell.type === 'string') { // && cell.isEditable && cell.isEditable(row, cell.id))
        const {icon: IconComponent, iconDisable, onClickIcon} = cell.getInputAdornment ? cell.getInputAdornment(row, cell.id) : defaultCellInputAdornment; 
        
        const isPassword = cell.isPassword ?? false;
        //let IconComponent = icon; 
        return (<Controller 
                key={`key-${cellId}-${rowKey} `}
                name={`${rowsPathNameDef}[${idx}].${cellId}`}
                
                control={control}
                render={({ field }) => <TextField
                   {...field} sx={{width:`calc(${w}% - 8px)`}}  type={isPassword?"password":"text"}
                   inputProps={ {readOnly: cell.isEditable? !cell.isEditable(row,cell.id): true , autoComplete: 'new-password', style: {textTransform: 'none'} }} 
                   InputProps={{
                    endAdornment: cell.getInputAdornment? (
                      <InputAdornment position="end">                            
                          <IconButton color="primary" disabled={iconDisable || false} onClick={ (event) => onClickIcon(event, idx, row) }>
                            <IconComponent />
                          </IconButton>                            
                      </InputAdornment>
                    ) : null
                  }}
                   />}
            />);

      }

      if(cell.type === 'numeric' ) // && cell.isEditable && cell.isEditable(field)
        return ( <Controller
          key={`key-${cellId}-${rowKey}`}
          
          render={({ field: {onChange, onBlur, name, value, ref} }) => {
            return (
              <NumberFormat      
                id={`${rowsPathNameDef}-id-${cellId}-${idx}`}
                isAllowed={ (values: NumberFormatValues) => {
                    if(!cell.isAllowed) return true;

                    return cell.isAllowed!(row, values.floatValue || 0);                    
                }}
                sx={{width:`calc(${w}% - 8px)`}}
                decimalScale={cell.decimalScale || 0}
                allowEmptyFormatting={false}
                control={control}             
                disabled={!cell.isEditable || !cell.isEditable(row, cell.id)}             
                fixedDecimalScale={true} 
                thousandSeparator={true}
                onValueChange={ (v) => onChange(v.floatValue) }

                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => { if(cell.handleKeyDown) cell.handleKeyDown(e,row,idx); }}
                //{...field}
                customInput={TextFieldRight}
                defaultValue={value}
                value={value}
                //customInput={(props) => <TextField {...props} sx={{width:'calc(20% - 8px)'}} id="roleName" inputProps={{style: { textAlign: 'right' }}} />}
              />
            );
          }}
          name={`${rowsPathNameDef}[${idx}].${cellId}`}          
          control={control}
        />);

        if(cell.type === 'date' && ( isFalsy( cell.isEditable ) || !cell.isEditable(row, cell.id) )){ 
          if(isFalsy( getValueById(row, cell.id))) return ''; 
  
          return format(
              typeof getValueById(row, cell.id) === 'string' ?
              parseISO( getValueById(row, cell.id) as unknown as string):
              getValueById(row, cell.id) as unknown as Date
              , lg.includes('en')? 'MM/dd/yyyy':'dd/MM/yyyy');          
        }

        if(cell.type === 'date' )  {// && cell.isEditable && cell.isEditable(field)
          
        return ( <Controller
          key={`key-${cellId}-${rowKey}`}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <DatePicker //label={t('Issue date')}
              disabled={!cell.isEditable || !cell.isEditable(row, cell.id)}    
              //disableOpenPicker={!cell.isEditable || !cell.isEditable(row, cell.id)}         
              onChange={onChange}                        
              value={value}
              renderInput={(params) => <TextField {...params} sx={{width:`calc(${w}% - 8px)`}} />}
            /> )}
          name={`${rowsPathNameDef}[${idx}].${cellId}`}
          
          control={control}
        />);
        }

        if(cell.type === 'datetime' )  {// && cell.isEditable && cell.isEditable(field)
          //console.log({minTime: cell.minTime, maxTime: cell.maxTime, isMin: isFalsy(cell.minTime), t: typeof cell.minTime });
          return (
            <Controller
              key={`key-${cellId}-${rowKey}`}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TimePicker //label={t('Time')}
                  
                  minTime={isFalsy(cell.minTime)?new Date(0,0,0,0,0):
                    typeof cell.minTime === 'string' ? parseISO(cell.minTime as unknown as string):cell.minTime as unknown as Date}
                  maxTime={isFalsy(cell.maxTime)?new Date(0,0,0,23,59):
                    typeof cell.maxTime === 'string' ? parseISO(cell.maxTime as unknown as string):cell.maxTime as unknown as Date}
                  disabled={!cell.isEditable || !cell.isEditable(row, cell.id)}
                  inputFormat="HH:mm"    
                  views={['hours', 'minutes']}   
                  //views={['hours', 'minutes', 'seconds']}  
                  onChange={onChange}                        
                  value={value}
                  renderInput={(params) => <TextField {...params} sx={{width:`calc(${w}% - 8px)`}} />}
                /> )}
              name={`${rowsPathNameDef}[${idx}].${cellId}`}         
              control={control}
            />);
          }

        return (<Controller 
              key={`key-${cellId}-${rowKey}`}
                
                name={`${rowsPathNameDef}[${idx}].${cellId}`}
                control={control}
                render={({ field }) => <TextField {...field} sx={{width:`calc(${w}% - 8px)`}} inputProps={  {readOnly: cell.isEditable? !cell.isEditable(row,cell.id): true, autoComplete: 'new-password', style: {textTransform: 'none'} }} />}
            />);
      
    }

    

    function displayDynamicBox(/*field: FieldArrayWithId<O, ArrayPath<O>, string>,*/ cell : HeadCell<T>, idx: number, row: T) : React.ReactNode {
      
      //const nest1 = (nestedIndex1 || 0);
      
      //const nestFieldsName1 = (nestedFieldsName1 || '');
      const cellId: string = String(cell.id);
      const rowKey = String(row[fieldKey]);

      if(cell.type === 'dynamic' && cell.getEnumerationCode && cell.getEnumerationCode(row,cell.id) === 'PLAGE_NBRE')
        return (<Controller
          key={`key-${cellId}-${rowKey}`}
          render={({ field }) => {
            return (
              <NumberFormat sx={{width:`calc(${w}% - 8px)`,  style: { textAlign: 'right' }}}
                label={cell.getLabel?cell.getLabel(row,cell.id): getValueById(row, cell.id) }
                //decimalScale={2}
                allowEmptyFormatting={false}
                control={control}                          
                //fixedDecimalScale={true}              
                        
                thousandSeparator={true}
                {...field}
                customInput={TextFieldRight}
                //customInput={(props) => <TextField {...props} sx={{width:'calc(20% - 8px)'}} id="roleName" inputProps={{style: { textAlign: 'right' }}} />}
              />
            );
          }}
          name={`${rowsPathNameDef}[${idx}].${cellId}`}
          
          control={control}
        />);

      
      if(cell.type === 'dynamic' && cell.getOptions && cell.getEnumerationCode && cell.getEnumerationCode(row,cell.id) !== 'TEXT') {
          const options = cell.getOptions(row, cell.id, cell.options || []);
          return (<Controller
            key={`key-${cellId}-${rowKey}`}
            render={ ({field: {onChange, value}}) => (
              <TextField select onChange={onChange} value={value} sx={{width:`calc(${w}% - 8px)`}}
                id={cell.id as unknown as string} label={cell.getLabel?cell.getLabel(row,cell.id): String( getValueById(row, cell.id) )} >
              {options && options.map( 
                (opt,ix) => <MenuItem key={opt.value} value={opt.value}>{opt.name}</MenuItem> )
              }
              </TextField>
            )}
            name={`${rowsPathNameDef}[${idx}].${cellId}`}
            
            control={control}
          />);
      }

      if(cell.type === 'boolean')
        return (<Controller 
          key={`key-${cellId}-${rowKey}`}
                name={`${rowsPathNameDef}[${idx}].${cellId}`}
                
                control={control}
                render={({ field: {onChange, value} }) => <Checkbox onChange={onChange} checked={value} inputProps={ {readOnly: cell.isEditable? cell.isEditable(row,cell.id): true }}/>}
                
             />);

      if(cell.type === 'dynamic' && cell.getEnumerationCode && cell.getEnumerationCode(row,cell.id) === 'TEXT')
        return (<Controller       
          key={`key-${cellId}-${rowKey}`}      
          render={({ field }) => <TextField sx={{width:`calc(${w}% - 8px)`}} {...field} 
                label={cell.getLabel?cell.getLabel(row,cell.id): String( getValueById(row, cell.id))}   />}
          
          name={`${rowsPathNameDef}[${idx}].${cellId}`}
          control={control}
      />);

    
      if(cell.type === 'numeric' ) // && cell.isEditable && cell.isEditable(field)
        return ( <Controller
          key={`key-${cellId}-${rowKey}`}
          render={({ field }) => {
            return (
              <NumberFormat      
                //decimalScale={2}
                allowEmptyFormatting={false}
                control={control}             
                disabled={!cell.isEditable || !cell.isEditable(row, cell.id)}             
                //fixedDecimalScale={true} 
                thousandSeparator={true}
                {...field}
                customInput={TextFieldRight}
                //customInput={(props) => <TextField {...props} sx={{width:'calc(20% - 8px)'}} id="roleName" inputProps={{style: { textAlign: 'right' }}} />}
              />
            );
          }}
          name={`${rowsPathNameDef}[${idx}].${cellId}`}
          //name={`${fieldsName}.${idx}.${cell.id}`}
          control={control}
        />);
     
      return (<Controller               
        key={`key-${cellId}-${rowKey}`}
        render={({ field }) => <TextField sx={{width:`calc(${w}% - 8px)`}} {...field} label={cell.getLabel?cell.getLabel(row,cell.id): String( getValueById(row, cell.id) )}   />}
       
        name={`${rowsPathNameDef}[${idx}].${cellId}`}
        control={control}
    />);
    }

    const _handleCellCheckedChange = (event: ChangeEvent<HTMLInputElement>,checked: boolean, row: T, cellId: keyof T | NestedKeyOf<T> ) => {
      
      if( typeof( getValueById(row, cellId) ) === 'boolean' ) 
        setValueById(row, cellId, checked as any)
        //row[cellId] = checked as any;

        
    }
    // onChange={(event,checked) => handleCheckedChange(event, checked, item[valueKey])}
  
    
  
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      // if (event.target.checked) {
      //   const newSelecteds = rows?.map((r) => r[objKey]);
      //   setSelected(newSelecteds);
      //   return;
      // }
      // setSelected([]);
    };
  
    const handleClick = (event: React.MouseEvent<unknown>, name: any) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = []; 
  
      // if (selectedIndex === -1) {
      //   newSelected = newSelected.concat(selected, name);
      // } else if (selectedIndex === 0) {
      //   newSelected = newSelected.concat(selected.slice(1));
      // } else if (selectedIndex === selected.length - 1) {
      //   newSelected = newSelected.concat(selected.slice(0, -1));
      // } else if (selectedIndex > 0) {
      //   newSelected = newSelected.concat(
      //     selected.slice(0, selectedIndex),
      //     selected.slice(selectedIndex + 1),
      //   );
      // }
  
      // setSelected(newSelected);
    };
  
  
    const getStripedStyle = (ix: number) => ( { background: ( onRowSelectedIndex === ix) ? Colors.gridActiveRow: 
                                                    selectedIndex.includes(ix) ? Colors.gridSelectedRows :
                                                    (ix % 2 ? Colors.gridAlt : Colors.background) } );
  
    // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setDense(event.target.checked);
    // };

    // const handle = (event: any) => {
    //   alert('000');
    // }

    const handleDisplayMoreColumns = (rowIndex: number) => {
      if(rowIndex < 0 || rowIndex >= fields.length)
        return;

      const arr = [...displayMoreColumns];
      arr[rowIndex] = true;
      setDisplayMoreColumns([...arr]);
    }

    const [onRowSelectedIndex, setOnRowSelectedIndex] = useState<number|undefined>();
    const _handleRowSelected = (event: MouseEvent<any>, idx: number ,row: T) => {

      setOnRowSelectedIndex(idx);
      if(onRowSelected)
        onRowSelected(event, idx ,row);
    }
 
    const _handleRowCheckedChange = (event: ChangeEvent<HTMLInputElement>,checked: boolean, index: number ,row: T) => {
      
      if(_rowCheckedMode === 'none')
        return;
      
      let newSelected = [];
      let newSelectedIndex: number[] = [];
      const val = row[fieldKey];

      const isSingleMode = _rowCheckedMode === 'single';

      if(checked) {
          newSelected = isSingleMode? [val] : selected.concat(val);
          newSelectedIndex = isSingleMode ? [index] : selectedIndex.concat(index);
      }
      else {
          newSelected = selected.filter(v => v !== val);   
          newSelectedIndex = selectedIndex.filter(idx => idx !== index);   
      }       
      
      setSelected(newSelected);
      setSelectedIndex(newSelectedIndex);

      if(onRowCheckedSelectChange)
        onRowCheckedSelectChange(event, checked, index, row);
      
      
      if(stateSelected) 
        stateSelected[1](newSelected); // this is just to call setSelectedRows

      if(stateSelectedIndex) 
        stateSelectedIndex[1](newSelectedIndex); 
    }


    let rows: T[] = [];
    for(var r=0; r< fields.length && r<MAX_ROW_LEN; r++){
      const row = fields[r] as unknown as T;
      rows.push(row);
    }
  
    const isSelected = (key: any) => selected.indexOf(key) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = 0;
      

    return (
      <Box sx={{ width: '100%' }}>
        {/* <Paper sx={{ width: '100%', mb: 2 }}> */}
          <ArrayFieldTableToolbar numSelected={selected.length} title={title} 
            toolbarActions={toolbarActions} canFilterColumn={canFilterColumn} rows={rows}/>
          <TableContainer sx={{ width: '100%' }}>
            <Table
              sx={{ width:'100%' }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              stickyHeader aria-label="sticky table"
            >
              { _canDisplayHeader && <ArrayFieldTableHead
                //numSelected={selected.length}
                
                // onSelectAllClick={handleSelectAllClick}
                // onRequestSort={handleRequestSort}
                //rowCount={rows.length}
                headCells={headCells}
                canCheckRow={canCheckRow}
                canFilterColumn={canFilterColumn}
                canDisplayColumnHeader={canDisplayColumnHeader}
                rows={rows}
              /> }
              <TableBody>
                {
                  
                  /*( isNested ? innerFields : fields)*/fields.filter(field => true ).map((field, idx) => {
                    //const row = rows[idx]; //.find( x => x[fieldKey] === field[]);
                    
                    const row = field as unknown as T;
                    const isItemSelected = isSelected(row[fieldKey]);
                    const labelId : string = `enhanced-table-checkbox-${idx}`;
                    const rowKey = String(row[fieldKey]);

                    const rowActionIconValue = rowActionIcon ? rowActionIcon(/*field,*/field as unknown  as T): defaultActionIconTableRow;
                    let IconComponent = rowActionIconValue.icon;
                    const hasAction = rowActionIconValue.hasAction;
                    
                    return ( ((rowFilterMethod && rowFilterMethod(mainObject,field as unknown as T)) || !rowFilterMethod)?
                      <TableRow
                        hover
                        //onClick={onRowSelected?(event) => onRowSelected(event, idx ,field as unknown as T) : (event) => {}}
                        onClick={(event) => _handleRowSelected(event, idx ,field as unknown as T)}
                        //onDoubleClick={handle}
                        onDoubleClick={onRowDoubleClick?(event) => onRowDoubleClick(event, idx ,field as unknown as T) : (event) => {}}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`row-${rowKey}`}
                        sx={{borderRight: 1, borderColor: 'black',}}
                        
                        selected={isItemSelected}
                        style={{ height: 20, ...getStripedStyle(idx),  }}
                      >
                        { _canCheckRow && <TableCell padding="checkbox" >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected} 
                            inputProps={{ 'aria-labelledby': labelId, }}
                            disabled={_rowCheckedMode==='none'}
                            onChange={(event, checked) => _handleRowCheckedChange(event,checked, idx ,row)}
                          />
                        </TableCell> }
                        {headCells.filter( h => h.display).map((headCell,index) => {
                          
                          return (
                            <TableCell
                                key={(headCell.id as string) + index} 
                                align={typeAlign(headCell.type)} scope="row" padding="none" >                            
                                {displayCell(/*field,*/headCell, idx, field as unknown as T)}
                            </TableCell>
                        ) } )}
                        <TableCell padding="none">
                          <>
                            {displayMore && displayMore(/*field,*/field as unknown as T)?
                              <IconButton onClick={(evt: any) => handleDisplayMoreColumns(idx)} aria-label="filter list" >
                                <MoreHorizIcon /> 
                              </IconButton>: null
                            }
                            {rowActionIcon && ( (typeof hasAction  === 'function' && hasAction(idx, field as unknown as T))  
                                              || (typeof hasAction  === 'boolean' && hasAction ) )  && 
                              <IconButton onClick={(evt: any) => rowActionIconValue.onRowClickIcon(evt,idx,/*field,*/field as unknown as T)} aria-label="filter list" >
                                <IconComponent /> 
                              </IconButton>                             
                            }
                            { displayMoreColumns[idx] && <FormDialog open={displayMoreColumns[idx]} maxWidth="xs"
                                okText={t('Close')} cancelText='' title={t('Coverage_s Options')} 
                                onCancel={()=> {setDisplayMoreColumns(displayMoreColumns.map(v => false));}} 
                                onClose={()=> {setDisplayMoreColumns(displayMoreColumns.map(v => false));}} 
                                onOk={()=> {setDisplayMoreColumns(displayMoreColumns.map(v => false));}}  >
                                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} >
                                    <Box sx={{ mt: 1, width: '100%' }} >
                                    {headCells.filter( h => !h.display).map((headCell,index) => {
                                      
                                      const display = headCell.getVisibility && headCell.getVisibility(field as unknown as T, headCell.id);
                                      return (  display?
                                        <Box key={idx} sx={{ mt: 1, width: '100%' }} >                           
                                            {displayDynamicBox(/*field,*/headCell, idx, field as unknown as T)}
                                        </Box> : null 
                                    ) } )}
                                    </Box>
                                  </Box>
                                </FormDialog> }  
                          </>
                          {/*//{rowActionIconValue.icon} <ColumnDialog open={openDialogColumn} columns={headCells} setColumns={setHeadCells}
                            onCloseDialog={handleCloseColumnDialog} 
                            onOkClick={handleOkClickColumnDialog} onCancelClick={handleCloseColumnDialog}
                          />      */}
                        </TableCell>
                      </TableRow> : null
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{height: (dense ? 33 : 53) * emptyRows, }} >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        {/* </Paper> */}
        
      </Box>
    );
  }

