//import { IUserContract } from "features/security/models/User"
// import { IApplicationSetup, defaultApplicationSetup } from "features/setup/models/ApplicationSetup"
//import { IRequestTypeBusinessApp } from "features/setup/models/RequestType"


export interface IUserCredential {
    userName: string,
    password: string,
    
    language: string, 

    tenantAlias: string,
    hubConnectionId: string,  
  }


  export interface IUserSession {
    isAuthenticated: boolean,
    token: string,
    refreshToken: string,
    language: string,
        
    userName: string,
    userDescription: string,

    contractIds: number[],
    //userContracts: IUserContract[],

    shouldResetPassword: boolean,
    isPasswordComplexityAllowed: boolean,
    displayPasswordExpirationWarning: boolean,
    isExtractAndExportAllowed: boolean,
    
    currentFormName: string,

    currentEntityNameForAction: string,
    currentEntityIdForAction: number,

    isBackendOperation: boolean,

    roleEntities: {
        entityName: string,

        canCreate: boolean,
        canRetreive: boolean,
        canUpdate: boolean,
        printAllowed: boolean,
        worflowAllowed: boolean,
        attachAllowed: boolean,
        relativeViewAllowed: boolean,
        securityAllowed: boolean,
        linkAllowed: boolean,        
        
        caption: string,        
        icon: string,
        name: string,

        roleEntityFeatures: {
              id: number,
              roleEntityId: number,
              featureName: string,
              featureDescription: string,
            }[]
      } [],
    
      //applicationSetup: IApplicationSetup 
  }


  export const defaultUserSession : IUserSession = {
    isAuthenticated: false,
    token: '',
    refreshToken: '',
    language: 'fr-FR',

    userName: '',
    userDescription: '',

    contractIds: [],
    //userContracts: [],

    shouldResetPassword: false,
    isPasswordComplexityAllowed: false,
    displayPasswordExpirationWarning: false,
    isExtractAndExportAllowed: false,

    currentFormName: '',

    isBackendOperation: false,


    roleEntities: [],

    currentEntityNameForAction: '',
    currentEntityIdForAction: 0,

    //applicationSetup: defaultApplicationSetup,
    
  }


  export interface IPasswordChange {
    userID: number,
    userName: string,
 
    password: string,
    newPassword: string,
    confirmNewPassword: string
  }
  
  export const defaultPasswordChange: IPasswordChange = {
   userID: 0,
   userName: '',
 
   password: '',
   newPassword: '',
   confirmNewPassword: ''
  }