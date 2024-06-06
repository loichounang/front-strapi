import React, {ChangeEvent, ElementType, MouseEvent, useState} from 'react';
import { alpha } from '@mui/material/styles';
import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
    Toolbar,  Typography, Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch, SvgIcon, SvgIconProps } from '@mui/material';
import {Delete as DeleteIcon, FilterList as FilterListIcon, LineStyle as LineStyleIcon,
  DownloadForOfflineRounded as DownloadForOfflineRoundedIcon} from '@mui/icons-material';

  
  import NotInterestedIcon from '@mui/icons-material/NotInterested';


import { visuallyHidden } from '@mui/utils';

import {format, parseISO} from 'date-fns';
import numeral from 'numeral';

import { exportToExcel } from 'library/xlsx-export';

import { isFalsy } from 'utility-types';
import { useRecoilState, useRecoilValue } from 'recoil';
import { colorsAtom, currentUserSessionAtom } from 'library/store';

const MAX_ROW_LEN = 10;

type Order = 'asc' | 'desc';

type _DataType = 'string' | 'numeric' | 'boolean' | 'date'| 'datetime' | 'dynamic' | 'expression';

type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';

export type RowCheckedMode = 'none' | 'single' | 'multiple';

function typeAlign( type: _DataType) : Alignment {
    
    if(type === 'numeric') return 'right';
    if(type === 'string') return 'left';
    
    return 'center';
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function descendingComparatorEx(valA: any, valB: any) {
    
    if( (typeof valA) === (typeof valB) && (typeof valA) === 'number') {
      const [numA, numB] = [Number(valB), Number(valA)];
      return numB<numA ? -1 : numB>numA ? 1 : 0;
    }
    
    
    const [strA, strB] = [String(valA), String(valB)];

    return strB<strA ? -1 : strB>strA ? 1 : 0;    
  }
  
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string | any },
    b: { [key in Key]: number | string | any },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function getComparatorEx<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: number | string | any },
    b: { [key in Key]: number | string | any},
  ) => number {
    return order === 'desc'
      ? (vA, vB) => descendingComparatorEx(vA, vB)
      : (vA, vB) => -descendingComparatorEx(vA, vB);
  }
  
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  //function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
      
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);

    //return array;
  }

    
//   export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number ) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//       const order = comparator(a[0], b[0]);
//       if (order !== 0) return order;
//       return a[1] - b[1];
//     });
//     return stabilizedThis.map((el) => el[0]);
//   }

//   export function stableSort<T>(array: T[], orderBy : keyof T, order: Order ) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//       const o = order === 'asc' ? a[orderBy] < b[orderBy]
//     });
//     return stabilizedThis.map((el) => el[0]);
//   }


export interface HeadCell<T> {
    //disablePadding: boolean;
    id: keyof T,
    label: string,
    //numeric: boolean;
    type: _DataType,
    display: boolean,

    width?: number,

    decimalScale?: 0|1|2|3|4;

    options?: {value: string, name: string}[],

    getLabel?: (row: T, cellId: keyof T) => string,
    getEnumerationCode?: (row: T, cellId: keyof T) => string,
    getOptions?: (row: T, cellId: keyof T, opts: {value: string, name: string}[]) => {value: string, name: string}[],
    getVisibility?: (row: T, cellId: keyof T) => boolean,
    
    isEditable?: (row: T, cellId: keyof T) => boolean,

    getExpressionNode?: (row: T, cellId: keyof T) => React.ReactNode
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
  
 // icon: SvgIconProps,
}

export interface EnhancedTableProps<T> {
    //numSelected: number,
    // onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
    // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rows: T[],
    
    order: Order,
    orderBy: keyof T,
    //rowCount: number,
    headCells: HeadCell<T>[],
    objKey : keyof T,

    title? : string,

    onRowSelected?: (event: React.MouseEvent<unknown>, row: any) => void,
    onRowDoubleClick?: (event: React.MouseEvent<unknown>, row: T) => void,

    rowActionIcon?: ( row: T) => ActionIconTableRow<any,T>,

    onRowCheckedSelectChange?: (event: ChangeEvent<HTMLInputElement>,checked: boolean, row: T) => void,
    //[S, Dispatch<SetStateAction<S>>]
    stateSelected? : [any[], React.Dispatch<React.SetStateAction<any[]>>],

    toolbarActions?: ActionIconTableToolBar[],

    rowCheckedMode?: RowCheckedMode,
  }

  export interface EnhancedTableHeadProps<T> {
    numSelected: number,
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void,
    // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rows: T[],
    order: Order,
    orderBy: keyof T,
    rowCount: number,
    headCells: HeadCell<T>[],
  }

 

function EnhancedTableHead<T>(props: EnhancedTableHeadProps<T>) {
    const {   numSelected, onRequestSort, rows, order, orderBy,  rowCount,  headCells } = props;

    const [Colors, setColors] = useRecoilState(colorsAtom);

    const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
        
        onRequestSort(event, property);
    };

    const handleColumnDialogClick = (event: MouseEvent<HTMLButtonElement>) => {
    
      event.preventDefault();
      
    };

    
    


    // automatically ajust cell width ....
    
    const widthUsed = headCells.map( h => (h.display && h.width)? h.width:0).reduce( (s,c) => s+c,0);
    
    const countRows = rows.length;
    const lenRow = countRows>MAX_ROW_LEN? MAX_ROW_LEN:countRows; 
   
    const headLens : {id: keyof T, nbCars: number}[] = headCells.filter(h => h.display).map( ({id, width}) => {
      let nbCars = 0;
      if( (!width && widthUsed <= 100) || widthUsed > 100 )
        for(var r=0; r<lenRow; r++){          
          const l = String( rows[r][id] ).length;
          //nbCars = nbCars > l ? nbCars : l; // for taking the max
          nbCars += l/lenRow; // for taking the average.
        }
      return {id, nbCars: lenRow===0? String(id).length: nbCars}
    });
    
    // const headLens : {id: keyof T, nbCars: number}[] = headCells.filter(h => h.display).map( ({id, width}) => {
    //   let nbCars = 0;
    //   if( (!width && widthUsed <= 100) || widthUsed > 100 )
    //     for(var r=0; r<lenRow; r++){          
    //       const l = String( rows[r][id] ).length;
    //       nbCars = nbCars > l ? nbCars : l;
    //     }
    //   return {id, nbCars: lenRow===0? String(id).length: nbCars}
    // });

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
          <TableCell padding="checkbox" sx={{ fontWeight: 'bold', backgroundColor: Colors.gridHeader }}>
            <Checkbox 
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              //onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.filter( h => h.display).map((headCell, idx) =>  { 
            
            const cellWidth = cellWidths.find( x => x.id == headCell.id);
            const _w = cellWidth? cellWidth.width : Math.floor(100 /  headCells.filter(h => h.display).length);
            const w = `${_w}%`;
            
            return(
            <TableCell
              key={ `${headCell.id as string} - ${idx}`}
              align={typeAlign(headCell.type)}
              style={{ whiteSpace: 'nowrap' }}
              sx={{ width: w, fontWeight: 'bold', backgroundColor: Colors.gridHeader }}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
            ) } )
          }
          <TableCell padding="none" align="right" sx={{ fontWeight: 'bold', backgroundColor: Colors.gridHeader }}>
            <IconButton aria-label="filter list" onClick={handleColumnDialogClick} >
              <LineStyleIcon />
            </IconButton>   
            {/* <ColumnDialog open={openDialogColumn} columns={headCells} setColumns={setHeadCells}
              onCloseDialog={handleCloseColumnDialog} 
              onOkClick={handleOkClickColumnDialog} onCancelClick={handleCloseColumnDialog}
            />      */}
          </TableCell>
        </TableRow>
      </TableHead>
      
    );
  }
  
  export interface EnhancedTableToolbarProps<T> {
    numSelected: number,
    title?: string,
    toolbarActions?: ActionIconTableToolBar[],
    rows: T[]
  }

  function EnhancedTableToolbar<T>(props: EnhancedTableToolbarProps<T>) {
    const { numSelected, toolbarActions, title, rows } = props;  
  
    return (
      <Toolbar sx={ { pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, height: '32px', minHeight: '32px',
            // ...(numSelected > 0 && { bgcolor: (theme) =>
            //   alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity), } ),
              alignItems: 'center', alignContent: 'center' } }  >
          <Typography  variant="h6" id="tableTitle" component="div" color="secondary"
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {title}
          </Typography>
          {/* {numSelected > 0 && 
            <Typography  color="inherit" variant="subtitle1" component="span" >
              {numSelected} selected
            </Typography>
          } */}
          <Box sx={{ flexGrow: 1 }} />
          { 
            toolbarActions && toolbarActions.map( ({toolTip,onClickIcon,icon}, idx) =>  {
              let IconComponent = icon;
              return (
              <Tooltip title={toolTip} key={`${toolTip} - ${idx}`}>
                <IconButton onClick={onClickIcon} color="primary">
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
          <Tooltip title="Filt...">
            <IconButton color="primary">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        
      </Toolbar>
    );
  };

  export default function EnhancedTable<T>(props: EnhancedTableProps<T> ) {

    const {rows, headCells, objKey, title, onRowSelected, onRowDoubleClick, 
      rowActionIcon,
      stateSelected, onRowCheckedSelectChange, toolbarActions, rowCheckedMode} = props;


    const [Colors, setColors] = useRecoilState(colorsAtom);

    const {language: lg} = useRecoilValue(currentUserSessionAtom);




    const _rowCheckedMode = rowCheckedMode || 'single';

    //let _rows = rows ? rows : Array<T>(0);

    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<keyof T>(objKey);


    const [selected, setSelected] = useState<readonly any[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState<readonly number[]>([]);

    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [_selectedRows, _setSelectedRows] = useState<any[]>([]);

    
    function displayCell(row: T, cell : HeadCell<T> ) : React.ReactNode {
      
      if(cell.type === 'boolean')
        return (<Checkbox checked={row[cell.id] as unknown as boolean} 
            onChange={(event,checked) => _handleCellCheckedChange(event, checked, row, cell.id)} />)

      if(cell.type === 'date'){ 
        if(isFalsy(row[cell.id])) return ''; 

          return format(
              typeof row[cell.id] === 'string' ?
              parseISO(row[cell.id] as unknown as string):
              row[cell.id] as unknown as Date
              , lg.includes('en')? 'MM/dd/yyyy':'dd/MM/yyyy');          
      }

      if(cell.type === 'datetime'){ 
        if(isFalsy(row[cell.id])) return ''; 

          return format(
              typeof row[cell.id] === 'string' ?
              parseISO(row[cell.id] as unknown as string):
              row[cell.id] as unknown as Date
              , `${lg.includes('en')? 'MM/dd/yyyy':'dd/MM/yyyy'} HH:mm:ss`);          
      }

      if(cell.type === 'numeric'){ 
        const formatter = new Intl.NumberFormat(lg.includes('en')?'en-US': 'fr-FR', { 
          minimumFractionDigits: cell.decimalScale??0 , maximumFractionDigits: cell.decimalScale??0 });          
        
        return formatter.format( numeral(row[cell.id]).value()?? 0); //  numeral(row[cell.id]).format('0 0,00'); // format(parseISO(row[cell.id] as unknown as string), 'dd/MM/yyyy');
      }     

      if(cell.type === 'expression' && !isFalsy(cell.getExpressionNode))
        return cell.getExpressionNode(row, cell.id);

      if(cell.type === 'string' && cell.getOptions  ) {
        const options = cell.getOptions(row, cell.id, cell.options || []);

        const option = options.find(opt => opt.value === (row[cell.id] as unknown as string ));

        return option?.name ?? (row[cell.id] as unknown as string );
      }
      return row[cell.id] as unknown as string;
    }

    const _handleCellCheckedChange = (event: ChangeEvent<HTMLInputElement>,checked: boolean, row: T, cellId: keyof T ) => {
      
      if( typeof(row[cellId]) === 'boolean' ) 
        row[cellId] = checked as any;        
    }
    // onChange={(event,checked) => handleCheckedChange(event, checked, item[valueKey])}
  
    const handleRequestSort = ( event: React.MouseEvent<unknown>, property: keyof T, ) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = rows?.map((r) => r[objKey]);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const _handleRowCheckedChange = (event: ChangeEvent<HTMLInputElement>,checked: boolean, index: number ,row: T) => {

      if(_rowCheckedMode === 'none')
        return;
   

      let newSelected = [];
      let newSelectedIndex: number[] = [];      
      const val = row[objKey];

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
        onRowCheckedSelectChange(event, checked, row);

      if(stateSelected) 
        stateSelected[1](newSelected); // this is just to call setSelectedRows
    }

    
  
    const handleClick = (event: React.MouseEvent<unknown>, name: any) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected: readonly string[] = []; 
  
      
    };
  
     
    const getStripedStyle = (ix: number) => ( { background: selectedIndex.includes(ix) ? Colors.gridSelectedRows :
      (ix % 2 ? Colors.gridAlt : Colors.background) } );
    
  
    const isSelected = (key: any) => selected.indexOf(key) !== -1;
  
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 , overflow: 'hidden'}}>
          <EnhancedTableToolbar<T> numSelected={selected.length} title={title} toolbarActions={toolbarActions} rows={rows} />
          <TableContainer sx={{ width: '100%' }}>
            <Table
              sx={{ width:'100%' }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              stickyHeader aria-label="sticky table"
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rows={rows}
                rowCount={rows.length}
                headCells={headCells}

              />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) 
                {stableSort(rows, getComparator(order, orderBy))*/}
                {stableSort(rows, getComparator(order, orderBy))
                  //.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row[objKey]);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    const rowKey = String(row[objKey]);

                    const rowActionIconValue = rowActionIcon ? rowActionIcon(/*field,*/row as unknown  as T): defaultActionIconTableRow;
                    let IconComponent = rowActionIconValue.icon;
                    const hasAction = rowActionIconValue.hasAction;

                    return (
                      <TableRow
                        hover
                        onClick={onRowSelected?(event) => onRowSelected(event, row) : (event) => {}}
                        // onClick={(event) => handleClick(event, row[objKey])}
                        onDoubleClick={onRowDoubleClick?(event) => onRowDoubleClick(event, row) : (event) => {}}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`row-${rowKey}`}
                        selected={isItemSelected}
                        style={{ height: 20, ...getStripedStyle(index) }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId, }} //stateSelected
                            onChange={(event, checked) => _handleRowCheckedChange(event,checked,index ,row)}
                            
                          />
                        </TableCell>
                        {headCells.filter( h => h.display).map((headCell,index) => {
                          //console.log(headCell); console.log(row[headCell.id]);
                          return (
                            <TableCell
                                key={(headCell.id as string) + index} 
                                align={typeAlign(headCell.type)} scope="row" > 
                                {displayCell(row,headCell)}       
                            </TableCell>
                        ) } )}
                        <TableCell padding="none" align='right'>
                            {rowActionIcon && ( (typeof hasAction  === 'function' && hasAction(index, row as unknown as T))  
                                              || (typeof hasAction  === 'boolean' && hasAction ) )  && 
                              <IconButton onClick={(evt: any) => rowActionIconValue.onRowClickIcon(evt,index,/*field,*/row as unknown as T)} aria-label="filter list" >
                                <IconComponent /> 
                              </IconButton>                             
                            }  
                          {/* <ColumnDialog open={openDialogColumn} columns={headCells} setColumns={setHeadCells}
                            onCloseDialog={handleCloseColumnDialog} 
                            onOkClick={handleOkClickColumnDialog} onCancelClick={handleCloseColumnDialog}
                          />      */}
                        </TableCell>
                      </TableRow>
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
        </Paper>
        
      </Box>
    );
  }