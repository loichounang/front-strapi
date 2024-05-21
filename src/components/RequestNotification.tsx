import React, { useState, useEffect, useRef } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';

import { fileTokensAtom, hubConnectionIdAtom,
    requestDataNotificationKeyAtom, requestDataItemResponseArrivedIdsAtom,  requestDataSendedIdsAtom, requestDataSendedOkIdsAtom,
    requestDataResponseCheckedIdsAtom, requestDataResponseCheckedOkIdsAtom, requestDataResponseArrivedIdsAtom} from 'library/store';
import { globalConfig } from 'config';
import { useSnackbar } from 'notistack';


export const RequestNotification = () => {

    const { enqueueSnackbar } = useSnackbar();

    const [hubConnectionId, setHubConnectionId] = useRecoilState(hubConnectionIdAtom);

    const [_, setRequestDataNotificationKey] = useRecoilState(requestDataNotificationKeyAtom);
    
    const [requestDataSendedIds, setRequestDataSendedIds] = useRecoilState(requestDataSendedIdsAtom);
    const [requestDataItemResponseArrivedIds, setRequestDataItemResponseArrivedIds] = useRecoilState(requestDataItemResponseArrivedIdsAtom);

    const [requestDataSendedOkIds, setRequestDataSendedOkIds] = useRecoilState(requestDataSendedOkIdsAtom);
    const [requestDataResponseCheckedIds, setRequestDataResponseCheckedIds] = useRecoilState(requestDataResponseCheckedIdsAtom);
    const [requestDataResponseCheckedOkIds, setRequestDataResponseCheckedOkIds] = useRecoilState(requestDataResponseCheckedOkIdsAtom);
    const [requestDataResponseArrivedIds, setRequestDataResponseArrivedIds] = useRecoilState(requestDataResponseArrivedIdsAtom);

           

    const [ connection, setConnection ] = useState<HubConnection>();
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);

    // latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${globalConfig.get().apiUrl}/hubs/requestNotifications`)  //'http://localhost:45073/hubs/requestNotifications
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {   
        if (connection) {
            connection.start()
                .then( () => console.log('Connected!'))
                //.then( () => { setHubConnectionId(connection?.connectionId || ''); console.log(connection.connectionId); })
                .then(result => {
                    console.log('Connected!');
    
                    connection.on('notifyRequestSended', id => { 
                        //console.log(`notifyRequestSended ${id}`);
                        setRequestDataSendedIds([...requestDataSendedIds, Number(id)]);
                        setRequestDataNotificationKey(`notifyRequestSended ${id}`);
                    });

                    connection.on('notifyRequestSendedOk', id => { 
                        //console.log(`notifyResponseChecked ${id}`);
                        setRequestDataSendedOkIds([...requestDataSendedOkIds, Number(id)]);
                        setRequestDataNotificationKey(`notifyRequestSendedOk ${id}`);
                    });

                    connection.on('notifyResponseChecked', id => { 
                        //console.log(`notifyResponseChecked ${id}`);
                        setRequestDataResponseCheckedIds([...requestDataResponseCheckedIds, Number(id)]);
                        setRequestDataNotificationKey(`notifyResponseChecked ${id}`);
                    });

                    connection.on('notifyResponseCheckedOk', id => { 
                        //console.log(`notifyResponseCheckedOk ${id}`);
                        setRequestDataResponseCheckedOkIds([...requestDataResponseCheckedOkIds, Number(id)]);
                        setRequestDataNotificationKey(`notifyResponseCheckedOk ${id}`);
                    });

                    connection.on('notifyResponseArrived', id => { 
                        //console.log(`notifyResponseArrived ${id}`);
                        setRequestDataResponseArrivedIds([...requestDataResponseArrivedIds, Number(id)]);
                        setRequestDataNotificationKey(`notifyResponseArrived ${id}`);
                    });

                    connection.on('notifyItemResponseArrived', id => { 
                        //console.log(`notifyItemResponseArrived ${id}`);
                        setRequestDataItemResponseArrivedIds([...requestDataItemResponseArrivedIds, Number(id)]);
                        setRequestDataNotificationKey(`notifyItemResponseArrived ${id}`);
                    });

                    

                    connection.on('notifyTest', id => { 

                        // enqueueSnackbar( 'You have to select business appication before fetch business data', { variant: 'warning',
                        //         anchorOrigin : { horizontal: 'center', vertical: 'top' }, autoHideDuration : 1000 }); 
                        //console.log(`notifyItemResponseArrived ${id}`);
                        // setRequestDataItemResponseArrivedIds([...requestDataItemResponseArrivedIds, Number(id)]);
                        // setRequestDataNotificationKey(`notifyTest ${id}`);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection]);

    // const sendMessage = async (user, message) => {
    //     const chatMessage = {
    //         user: user,
    //         message: message
    //     };

    //     if (connection.connectionStarted) {
    //         try {
    //             await connection.send('SendMessage', chatMessage);
    //         }
    //         catch(e) {
    //             console.log(e);
    //         }
    //     }
    //     else {
    //         alert('No connection to server yet.');
    //     }
    // }

    return (
        <>
        </>
    );
};

//export RequestNotification;