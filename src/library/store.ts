
import { atom, atomFamily, selector, selectorFamily, useRecoilState, useRecoilValue, } from 'recoil';
import { getUnixTime } from 'date-fns';

import { defaultUserSession, IUserSession } from 'features/identity/models/User';
import { BasicTextFilterProps, defaultBasicTextFilterProps } from 'components/ui/BasicTextFilterForm';
import { IAppTheme, defaultAppTheme } from 'themes/commonStyles';
//import { IContractMessage } from 'features/production/models/Contract';


export const lastUnixTimeStampAtom = atom<number>({
  key: "lastUnixTimeStampState",
  default: getUnixTime(new Date())
});

export const currentFormNameAtom = atom<string>({
  key: "currentFormNameState",
  default: ""
});

export const isActionDrawerOpenAtom = atom<boolean>({
    key: "isActionDrawerOpenState",
    default: false
  });

  export const isPrintDrawerOpenAtom = atom<boolean>({
    key: "isPrintDrawerOpenState",
    default: false
  });

export const currentEntityNameForActionDrawerAtom = atom<string>({
    key: "currentEntityNameForActionDrawerState",
    default: ""
  });

export const currentEntityIdForActionDrawerAtom = atom<number>({
    key: "currentEntityIdForActionDrawerState",
    default: 0
  });

  export const isSaveLoadingAtom = atom<boolean>({
    key: "isSaveLoadingState",
    default: false
  });

  export const currentEntityContextualItemsForActionDrawerAtom = atom<{entityName: string, entityId: number}[]>({
    key: "currentEntityIdItemForActionDrawerState",
    default: []
  });

  export const isSearchBoxShowAtom = atom<boolean>({
    key: "isSearchBoxShowState",
    default: false
  });

  export const isAuthorizationBoxShowAtom = atom<boolean>({
    key: "isAuthorizationBoxShowState",
    default: false
  });

  export const isDesktopPublishingBoxShowAtom = atom<boolean>({
    key: "isDesktopPublishingBoxShowState",
    default: false
  });
  
  export const isExportBoxShowAtom = atom<boolean>({
    key: "isExportBoxShowState",
    default: false
  });

  export const hubConnectionIdAtom = atom<string>({
    key: "hubConnectionIdState",
    default: ''
  });

  export const currentBasicTextFilterPropsAtom = atom<BasicTextFilterProps<any>>({
    key: "currentBasicTextFilterPropsState",
    default: defaultBasicTextFilterProps
  });
 
  export const requestDataSendedIdsAtom = atom<number[]>({
    key: "requestDataSendedIdsState",
    default: []
  });

  export const requestDataSendedOkIdsAtom = atom<number[]>({
    key: "requestDataSendedOkIdsState",
    default: []
  });

  export const requestDataResponseCheckedIdsAtom = atom<number[]>({
    key: "requestDataResponseCheckedIdsState",
    default: []
  });

  export const requestDataResponseCheckedOkIdsAtom = atom<number[]>({
    key: "requestDataResponseCheckedOkIdsState",
    default: []
  });

  export const requestDataResponseArrivedIdsAtom = atom<number[]>({
    key: "requestDataResponseArrivedIdsState",
    default: []
  });

  export const requestDataItemResponseArrivedIdsAtom = atom<number[]>({
    key: "requestDataItemResponseArrivedIdsState",
    default: []
  });

  export const requestDataNotificationKeyAtom = atom<string>({
    key: "requestDataNotificationKeyState",
    default: ''
  });


  // export const newContractMessagesAtom = atom<IContractMessage[]>({
  //   key: "newContractMessagesState",
  //   default: []
  // });
    
  export const fileTokensAtom = atom<{token:string, name: string, isFileGenerated: boolean, isFileOpened: boolean}[]>({
    key: "fileTokensState",
    default: []
  });

export const currentUserSessionAtom = atom<IUserSession>({
    key: 'currentUserSessionState',
    default: defaultUserSession as IUserSession
  });

export const currentUserSessionSetAuthentication = selector({
    key: 'disconnectUser',
    get: ({get}) => get(currentUserSessionAtom),
    set: ({set, get}) => {
        //const userSession = get(currentUserSessionState);
        set(currentUserSessionAtom,{...get(currentUserSessionAtom), isAuthenticated: false})
    }
});

export const colorsAtom = atom<IAppTheme>({
  key: 'colorsState',
  default: defaultAppTheme/*{
    primary: "#ff0000", //"#d9d9d9", // "#435939",   
    secondary: "#0A1840",
    success: "#4CAF50",
    info: "#00a2ff",
    danger: "#FF5722",
    warning: "#FFC107",
    dark: "#0e1b20",
    light: "#aaa",
    muted: "#abafb3",
    border: "#DDDFE1",
    inverse: "#2F3D4A",
    shaft: "#333",

    background: "#003366",

    ///////////////
    // Menu button, 
    ///////////////
    menuButton: "#ff6600",
    menuIcon: "#ff6600",
    ///////////////
    // Grid color header, alt
    ///////////////
    gridHeader: "#A3CBD7", //"#4B32A6", //"#A68695",
    gridAlt: "#A3CBD7", // "#7350F2", //"#d1adcc",
    gridActiveRow: "#ABAFB3", //"#ABAFB3",
    gridSelectedRows: "rgb(230,230,230)", //"rgb(230,230,230)",
    ///////////////
    // Grays
    ///////////////
    dim_grey: "#696969",
    dove_gray: "#d5d5d5",
    body_bg: "#f3f6f9",
    light_gray: "rgb(230,230,230)",
    ///////////////
    // Solid Color
    ///////////////
    white: "#fff",
    black: "#000",
  },*/
});

  