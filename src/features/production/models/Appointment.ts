
export interface IAppointment {
    
    id: number,

    token: string,
    instanceId: string,

    appointmentDate: Date,

    firstName: string,
    lastName: string,
    portable: string,
    whatsAppNumber: string,
    email: string,
    serviceDescription: string,

    portable1: string,
    portable2: string,
    email1: string,
    email2: string,
    notificationDate: Date,

    services: IService[],
    appointmentProducts: IAppointmentProduct[]
}

export interface IService {
    id: number,

    type: string,
    serviceId: number,
    packagingId: number,

    nom: string,
    isSelected: boolean
}

export interface IAppointmentProduct {
    id: number,
    appointmentId: number,

    type: string,
    startTime: Date,
    endTime: Date,

    serviceId: number,
    packagingId: number
}



export const defaultAppointment : IAppointment = {
    id: 0,

    token: '',
    instanceId: '',

    appointmentDate: new Date(),

    firstName: '',
    lastName: '',
    portable: '',
    whatsAppNumber: '',
    email: '',

    portable1: '',
    portable2: '',
    email1: '',
    email2: '',
    notificationDate: new Date(),

    services: [],
    appointmentProducts: [],
    serviceDescription: ''
}


export interface IAppointmentSearch {
    firstName: string,
    lastName: string,
    
  }