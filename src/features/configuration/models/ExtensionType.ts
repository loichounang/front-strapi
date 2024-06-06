//import IEnumeration, { defaultEnumeration } from "./Enumeration";

export type _ExtensionType = 'text' | 'integer' | 'decimal' | 'float' | 'date' | 'boolean' | 'time' | 'enumeration' | 'entity';

export type BaseType = 'string' | 'numeric' | 'boolean' | 'date' | 'time';

export interface IExtensionType {
    id: number,
    name: string,
    description: string,

    type: _ExtensionType,
    textLength: number,
    formattedText: boolean,
    enumerationId: number,
    enumerationName: string,
    entityName: string,
    entityDescription: string,

    baseType: BaseType,

    //enumeration: IEnumeration
  }

  export interface IExtension {
    id: number,
    extensionTypeId: number,
    alias: string,
    description: string,

    isRequired: boolean,
    isUniqueField: boolean,
    isPrivateField: boolean,
    isMainField: boolean,

    type: 'contentType';

    productId: number,
    isRiskExtension: boolean,
    productInvoiceId: number,
    evaluationItemTypeId: number,
    
    extensionTypeName: string,
    extensionTypeType: _ExtensionType,
    extensionTypeTextLength: number,
    extensionTypeFormattedText: boolean,
    extensionTypeBaseType: BaseType,

    extensionType: IExtensionType
  }

  export interface IExtensionValue extends IExtension {
    value: any,
    descValue: string,

    textValue?: string,
    integerValue?: number,
    decimalValue?: number,
    floatValue?: number,
    dateValue?: Date,
    booleanValue?: boolean,
    timeValue?: Date,
    enumerationItemCode?: string,
    entityId?: number,
  }


  export const defaultExtensionType : IExtensionType = {
    id: 0,
    name: '',
    description: '',
    type: 'text',

    textLength: 0,
    formattedText: false,
    enumerationId: 0,
    enumerationName: '',
    entityName: '',
    entityDescription: '',

    baseType: 'string',

    //enumeration: defaultEnumeration
  }

  export const defaultExtension : IExtension = {
    id: 0,
    extensionTypeId: 0,
    alias: '',
    description: '',

    isRequired: false,
    isUniqueField: false,
    isPrivateField: false,
    isMainField: false,

    type: 'contentType',

    productId: 0,
    isRiskExtension: false,
    productInvoiceId: 0,
    evaluationItemTypeId: 0,

    extensionTypeName: '',
    extensionTypeType: 'text',
    extensionTypeTextLength: 0,
    extensionTypeFormattedText: false,
    extensionTypeBaseType: 'string',

    extensionType: defaultExtensionType
  }


  export interface IExtensionTypeSearch {
    name: string,
    description: string
  }