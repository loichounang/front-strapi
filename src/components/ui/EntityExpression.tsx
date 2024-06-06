import React, {useState, useEffect, useRef} from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IntegrationInstructionsOutlinedIcon from '@mui/icons-material/IntegrationInstructionsOutlined';

import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import EnhancedTable, { HeadCell } from './EnhancedTable';
import { IEntityProperty } from 'library/interface';

import entityService from 'features/services/Entity';
import { isFalsy } from 'utility-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ArrayFieldTableEx, { ActionIconTableRow } from './ArrayFieldTableEx';
import { FormDialog } from './FormDialog';

export interface IEntityExpressionProps {
    entityName: string,
    expression: string, 
    properties: IEntityProperty[],

    setExpression: React.Dispatch<React.SetStateAction<string>>
}

export const defaultEntityExpressionProps : IEntityExpressionProps = {
    entityName: '',
    expression: '', 
    properties: [],
    setExpression: (exp : React.SetStateAction<string>) => {}
}

const EntityExpression = ( props: IEntityExpressionProps ) => {

 const { t, i18n } = useTranslation();  

 const {entityName, expression, setExpression} = props;

 const [properties, setProperties] = useState<IEntityProperty[]>([]);

 const expressionRef = useRef();

 const methods = useForm<IEntityExpressionProps>( {defaultValues: {...defaultEntityExpressionProps, 
        setExpression: setExpression, expression:  expression}} );

 const { register, setValue ,getValues, watch, reset ,handleSubmit ,control , formState: { errors } } = methods;

 const watchExpression = watch('expression');

 const { getEntityProperties } = entityService();

 const [currentPropertyName, setCurrentPropertyName] = useState<string>('');
 const [currentPropertyTypeName, setCurrentPropertyTypeName] = useState<string>('');

 const [innerExpression, setInnerExpression] = useState('');
 const [openInnerExpression, setOpenInnerExpression] = useState<boolean>(false);
 const entityPropertyRowActionIcon = ( reportField: IEntityProperty) : ActionIconTableRow<IEntityExpressionProps,IEntityProperty> => {  
    const res: ActionIconTableRow<IEntityExpressionProps,IEntityProperty> = {
      toolTip: 'remove',
      icon: IntegrationInstructionsOutlinedIcon,
      hasAction: (index: number,row: IEntityProperty) => !row.isPrimitive, 
      isActionExecuting: true,
      onRowClickIcon: (event : any, index: number, row: IEntityProperty) => {           
        const {name, type} = row;

        setCurrentPropertyName(name);     
        setCurrentPropertyTypeName(type);
        setOpenInnerExpression(true);    
           
      }
    }
    return res;
  }

 const [headEntityPropertyCells, setHeadEntityPropertyCells]  = useState<HeadCell<IEntityProperty>[]>([]);
    useEffect(() => {
        setHeadEntityPropertyCells([            
        {id:'name', label : t('Name'),  display: true, type: 'string', width: 50, },
        {id:'description', label : t('Description'),  display: true, type: 'string', width: 50, },
         
            
        //{id:'extensionTypeDescription', label : t('Type description'),  display: true, type: 'string',} ,  
        //{id:'extensionTypeType', label : t('Type'),  display: true, type: 'string',} ,  
      ]  )
    }, [t,i18n])


    const handleClickOkInnerExpression = () => {
        
        setOpenInnerExpression(false);
        if( innerExpression.trim() === '') return;
        if(isFalsy(expressionRef.current)) return;

        if( (expressionRef.current as HTMLInputElement).selectionEnd === null && 
            (expressionRef.current as HTMLInputElement).selectionEnd === undefined)
        return;

        const position = (expressionRef.current as HTMLInputElement).selectionEnd || 0;
        const newExpression = watchExpression.substring(0, position) + `${currentPropertyName}.${innerExpression}` + watchExpression.substring(position);
        setValue('expression', newExpression);        
      }

    const handlePropertyDoubleClick = (event: React.MouseEvent<unknown>,index: number,row: IEntityProperty) => {  
      
        const {name} = row;        
        
        if(isFalsy(expressionRef.current))
            return;
        
        if( (expressionRef.current as HTMLInputElement).selectionEnd === null && 
                (expressionRef.current as HTMLInputElement).selectionEnd === undefined)
            return;
        
        const position = (expressionRef.current as HTMLInputElement).selectionEnd || 0;        
        const newExpression = watchExpression.substring(0, position)  + `${name}` + watchExpression.substring(position);
        setValue('expression', newExpression);
        //alert(newExpression);
    }

    useEffect( () => {
        
        setExpression(watchExpression);
    }, [watchExpression]) 

    useEffect( () => {
        async function loadEntityProperties() {

            if(isFalsy(entityName)) return;

            const entityExpression = getValues();
            const properties = await getEntityProperties(entityName);
            reset( {...entityExpression, properties: properties || [] });
            //setProperties([...properties]);
        }

        loadEntityProperties();
    }, [entityName])
  

    
  return (
    <FormProvider {...methods} > 
        <Grid container component="main" sx={{  width: '100%' }} alignItems="flex-start">
            <Grid item xs={12} component={Paper}  square>
                <Stack flexDirection='column'  >
                    <Box sx={{ mt: 1, width: '100%' }} >
                        <TextField sx={{width:'calc(100% - 8px)'}} id="name" label={t('Name')} {...register('expression')} 
                            multiline rows={3} inputRef={expressionRef}
                            inputProps={ { autoComplete: 'new-password', style: {textTransform: 'none'} } } />  
                    </Box>
                    <Box sx={{ mt: 1, width: '100%' }} >
                        <ArrayFieldTableEx<IEntityExpressionProps, IEntityProperty,'name'> 
                            isEditable={false} mainObject={getValues()} fieldKey='name' 
                            rowsPathName='properties'  headCells={headEntityPropertyCells} 
                            title={'Prop...'} rowActionIcon={entityPropertyRowActionIcon}  
                              
                            //stateSelected={stateSelected}
                            onRowSelected={undefined} onRowDoubleClick={handlePropertyDoubleClick} 
                            onRowCheckedSelectChange={undefined} toolbarActions={undefined} 
                        />
                        { openInnerExpression && <FormDialog open={openInnerExpression} maxWidth='md'
                                    okText={t('OK')} cancelText='' title={t('Entity filter')} onCancel={()=> {}} 
                                    onClose={()=> {setOpenInnerExpression(false);}} onOk={handleClickOkInnerExpression}  >
                                    <EntityExpression entityName={currentPropertyTypeName} properties={[]} 
                                      expression={innerExpression} setExpression={setInnerExpression} />
                                  </FormDialog>  }
                    </Box>
                </Stack>                              
            </Grid>
            
        </Grid>
    </FormProvider>
  )
}

export default EntityExpression