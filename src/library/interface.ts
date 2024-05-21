

export interface IResult<TData> {
    data: TData,
    succeeded: boolean,
    messages: string[]
  }

  export interface IFeatureParameter {
    name: string,
    type: 'string' | 'numeric' | 'boolean' | 'date';
    label: string,
    dataType: 'Base' | 'Enumeration' | 'Entity';
    value: any,
    dateValue: Date,
    
    options?: {value: string, name: string}[],

    isRequired: boolean,
    enumerationCode?: string,
}

export interface IFeatureDescription {
    
  
    saveBeforeAction?: boolean,

    entityId?: number,
    entityContextualItems?: {entityName: string, entityId: number}[],

    name: string,
    label: string,
    entityName?: string,
    type?: number,
    inputType?: number,

    params: IFeatureParameter[]
}

export interface IReportDescription {    
  
    reportId: number,
    language: string,
    saveBeforeAction?: boolean,

    entityId?: number,
    isDirectReport: boolean,
    hubConnectionId?: string,
    
    name: string,
    label: string,
    entityName?: string,
    //type?: number,
    //inputType?: number,

    // params: IFeatureParameter[]
}

export interface IEntity {
    id: number,
    name?: string,
    description?: string,

    properties: IEntityProperty[]
}

export interface IEntityProperty {
    name: string,
    description: string,
    type: string,
    isPrimitive: boolean,
    isEnumerable: boolean,

    underlyingType: string
}

export const defaultFeatureDescription: IFeatureDescription = {
    name: '',
    label: '',
    params: [],
}