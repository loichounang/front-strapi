
export interface IMainInformation {
    id: number, 
    logo: string,
    logo_Url: string,
 
}

export interface IIMage4Carousel {
    id: number,
    image: string, 
    image_Url: string, 
    titrePrincipal: string, 
    titreSecondaire: string,
  
}


export interface ISlideImage {
    id: number,
    image: string, 
    image_Url: string,
    description: string
  }

export interface IValueDefintion {
    id: number,

    titreGlobal: string,
    titreListe: string,
    titreQuestion: string,

    image: string,
    image_Url: string
}

export interface IValueSpa {
    id: number,

    principale: string,
    sacondaire: string
}


export interface ISpecialOfferDefintion {
    id: number,

    titreGlobal: string,
    titre: string,    
}

export interface ISpecialOffer {
    id: number,
    nom: string,
    desc1: string,    
    desc2: string,    
    desc3: string,    
    desc4: string,    
    desc5: string,  
    
    image: string,
    image_Url: string
}


export interface ISpecialityDefinition {
    id: number,

    titreGlobal: string,
    titre: string,   
}

export interface ICategoryProduct {
    id: number,
    nom: string,  
    image: string,
    image_Url: string 
}

export interface INews {
    id: number,
    titrePrincipal: string,
    titreSecondaire: string,   
    image: string,
    image_Url: string 
}




export interface IReservation {
    id: number,

    titreGlobal: string,
    titre: string,    
    messageAccueil: string,    
    messageReservation: string,    
    messageReservationOnline: string,    
    image: string,
    image_Url: string 
}

export interface IGaleryPhoto {
    id: number,
    image: string,
    image_Url: string 
}

export interface IAstuce{
    id:number,
    titreAstuce: string,
    titreSecondaire : string,
    lienVideo1 : string,
    lienVideo2 : string
}

export interface IArrierePlan {
    id: number,
    titrePrincipal : string,
    titreSecondaire : string,
    arrierePlan : string,
    arrierePlan_Url : string,
    titreGlobal : string,
    titre : string,
    localisation :  string,
    titreTertiaire:  string,
    infosComplementaires : string
}

export interface IAboutPage {
    id: number,
    titrePrincipal : string,
    titreSecondaire : string,
    titreSecondaire1 : string,
    imageLocaux: string,
    imageLocaux_Url : string,
    titreGlobal : string,
    titreGlobal1 : string,
    titre : string,
    titre1 : string,
}

export interface IPoseGel{
    id: number,
    titrePrincipal : string,
    titre : string,
    titreSecondaire : string,
    imagePoseGel : string,
    imagePoseGel_Url : string,
    poseGel1 : string,
    poseGel2 : string,
    poseGel3 : string,
    poseGel4 : string,
    poseGel5 : string,
    poseGel6 : string,
    poseGel7 : string,
    poseGel8 : string,
    poseGel9 : string

}

export interface IPoseVernis{
    id: number,
    titrePrincipal : string,
    titre : string,
    titreSecondaire : string,
    imagePoseVernis : string,
    iimagePoseVernis_Url : string,
    typeVernis1 : string,
    typeVernis2 : string,
    typeVernis3 : string,
    typeVernis4 : string,
    typeVernis5 : string,
    typeVernis6 : string

}



export const defaultMainInformation : IMainInformation = {
    id: 0,
    logo: '',
    logo_Url: '',
  
}

export const defaultIMage4Carousel : IIMage4Carousel = {
    id: 0,
    image: '',
    image_Url: '',
    titrePrincipal: '',
    titreSecondaire: '',
   
}

export const defaultValueDefintion : IValueDefintion = {
    id: 0,

    titreGlobal: '',
    titreListe: '',
    titreQuestion: '',

    image: '',
    image_Url: ''
}

export const defaultSpecialOfferDefintion :  ISpecialOfferDefintion = {
    id: 0,

    titreGlobal: '',
    titre: '',    
}

export const defaultSpecialityDefinition : ISpecialityDefinition = {
    id: 0,

    titreGlobal: '',
    titre: '',  
}

export const defaultReservation : IReservation = {
    id: 0,

    titreGlobal: '',
    titre: '',     
    messageAccueil: '',    
    messageReservation: '',    
    messageReservationOnline: '',    

    image: '',
    image_Url: ''  
}

export const defaultAstuce : IAstuce = {
    id: 0,
    titreAstuce: "",
    titreSecondaire: "",
    lienVideo1: "",
    lienVideo2: ""
}

export const defaultArrierePlan : IArrierePlan = {
    id: 0,
    titrePrincipal : '',
    titreSecondaire : '',
    arrierePlan : '',
    arrierePlan_Url : '',
    titreGlobal : '',
    titre : '',
    localisation : '',
    titreTertiaire: '',
    infosComplementaires :''

}

export const defaultABoutPage : IAboutPage = {
    id: 0,
    titreGlobal : '',
    titreSecondaire : '',
    titreSecondaire1 : '',
    titreGlobal1 : '',
    titre : '',
    titre1 : '',
    imageLocaux  : '',
    imageLocaux_Url : '',
    titrePrincipal : ''

}

export const defaultPoseGelPage : IPoseGel = {
    id: 0,
    titre: '',
    titrePrincipal: '',
    titreSecondaire: '',
    imagePoseGel: "",
    imagePoseGel_Url: "",
    poseGel1: "",
    poseGel2: "",
    poseGel3: "",
    poseGel4: "",
    poseGel5: "",
    poseGel6: "",
    poseGel7: "",
    poseGel8: "",
    poseGel9: ""
}

export const defaultPoseVernisPage : IPoseVernis = {
    id: 0,
    titrePrincipal: "",
    titre: "",
    titreSecondaire: "",
    imagePoseVernis: "",
    iimagePoseVernis_Url: "",
    typeVernis1: "",
    typeVernis2: "",
    typeVernis3: "",
    typeVernis4: "",
    typeVernis5: "",
    typeVernis6: ""
}