
export interface IMainInformation {
    id: number, 
    portable1: string,
    logo1: string,
    logo1_Url: string,
    email1: string,
    horaire1: string,
    titreCentre : string,
    titreBienvenue: string,
    descriptionBienvenue : string,
    lienFacebook : string,
    lienLinkedin : string,
    lienTwitter : string,
    lienInstagram : string,
    localisation : string
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

export interface ISpeciality {
    id: number,
    nom: string,
    description: string,   
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

export interface IGaleryResultatSoins {
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
    titreGlobal : string,
    profil1 : string,
    profil1_Url: string,
    profil2 : string,
    profil2_Url: string,
    description:string

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

export interface IDefSoinVisage{
    id: number;
    image : string;
    image_Url : string;
    titrePrincipal : string;
    titreSecondaire : string;
}

export interface IDefSoinCorps{
    id: number;
    image : string;
    image_Url : string;
    titrePrincipal : string;
    titreSecondaire : string;
}

export interface IDefMainPied{
    id: number;
    image : string;
    image_Url : string;
    titrePrincipal : string;
    titreSecondaire : string;
}


export interface IDefBienEtre{
    id: number;
    image : string;
    image_Url : string;
    titrePrincipal : string;
    titreSecondaire : string;
}

export interface IPackageSoinsCorps{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface IGommageCorps{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface IEpilation{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface ISoinMinceur{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface ISoinVisage{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface IMassage{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface IRelaxation{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface IEpilationCire{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface ISoinAmincissant{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface IVajacial{
    id: number;
    titre: string;
    duree : string;
    prix : string
}

export interface IOnglerie{
    id: number;
    titre: string;
    duree : string;
    prix : string
}


export const defaultMainInformation : IMainInformation = {
    id: 0,
    portable1: '',
    logo1: '',
    logo1_Url: '',
    email1: '',
    horaire1: '',
    titreCentre: '',
    titreBienvenue: '',
    descriptionBienvenue: '',
    lienFacebook: "",
    lienLinkedin: "",
    lienTwitter: "",
    lienInstagram: "",
    localisation: ""
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
    titrePrincipal: "",
    titreSecondaire: "",
    titreGlobal: "",
    profil1: "",
    profil1_Url: "",
    profil2: "",
    profil2_Url: "",
    description: ""
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

export const defaultSoinsVisage : IDefSoinVisage = {
    id: 0,
    image: "",
    image_Url: "",
    titrePrincipal: "",
    titreSecondaire: "",
    
}

export const defaultSoinsCorps : IDefSoinCorps = {
    id: 0,
    image: "",
    image_Url: "",
    titrePrincipal: "",
    titreSecondaire: "",
    
}

export const defaultMainPied : IDefMainPied = {
    id: 0,
    image: "",
    image_Url: "",
    titrePrincipal: "",
    titreSecondaire: "",
    
}

export const defaultBienEtre : IDefBienEtre = {
    id: 0,
    image: "",
    image_Url: "",
    titrePrincipal: "",
    titreSecondaire: "",
    
}