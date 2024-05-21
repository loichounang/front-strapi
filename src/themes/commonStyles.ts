/** Flexbox styles */

export const flexBetween = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  
  export const flexBetweenCenter = {
    display: 'flex',
    justifyContent: { xs: 'space-between', md: 'space-between' },
    alignItems: 'center',
  };
  
  export const footerLayout = {
    display: 'flex',
    flexDirection: { sx: 'column' },
    justifyContent: { xs: 'center', md: 'space-between' },
    alignItems: 'center',
  };
  
  export const flexCenter = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  export const fullWidthFlex = {
    display: 'flex',
    width: '100%',
  };
  
  export const justifyCenter = { display: 'flex', justifyContent: 'center' };
  
  export const dFlex = {
    display: 'flex',
    flexDirection: 'row',
  };
  
  export const fixedBottom = {
    position: 'absolute',
    bottom: 100,
    width: '100%',
  };
  
  export const displayOnDesktop = { display: { xs: 'none', md: 'block' } };

  export const displayOnMobile = { display: { xs: 'flex', md: 'none' } };
  
  // sx={{ display: { xs: 'flex', md: 'none' } }}
  /** Custom carousel styles */
  
  export const carouselDot = {
    color: '#fff',
    backgroundColor: '#000',
    opacity: 0.5,
    borderRadius: 10,
    p: 1,
    minWidth: 'auto',
  };
  
  export const fixedIcon = {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 10,
  };
  
  export const carouselImage = {
    height: 275,
    display: 'block',
    overflow: 'hidden',
    width: '100%',
    borderRadius: 3,
  };

  export const justifyCenter2 = { fontWeight: 'bold',
  fontStyle: 'italic', };

  export const typographyGroupBoxStyling = {
    //borderRadius: 2,
    //border: '1px solid',
    //borderColor: 'secondary.main',
    //backgroundColor: 'green',
    //padding: 6,
    //margin: 12,
    fontSize: 14,
    fontWeight: 'bold',
    fontStyle: 'italic',
    
    //maxWidth: 200,
  }

  export const typographyBigGroupBoxStyling = {
    //borderRadius: 2,
    //border: '1px solid',
    //borderColor: 'secondary.main',
    //backgroundColor: 'green',
    //padding: 6,
    //margin: 12,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic',
    
    //maxWidth: 200,
  }

  export const typographySmallHandWriting = {
    //borderRadius: 2,
    //border: '1px solid',
    //borderColor: 'secondary.main',
    //backgroundColor: 'green',
    //padding: 6,
    //margin: 12,
    fontFamily: 'Arizonia',
    fontSize: 20,
    //fontWeight: 'bold',
    fontStyle: 'italic',
    
    //maxWidth: 200,
  }
  
  export interface IAppTheme {
    primary: string, //"#FF957B", // "#435939", 
    secondary: string, //"#0A1840",
    success: string, //"#4CAF50",
    info: string, //"#00a2ff",
    danger: string, //"#FF5722",
    warning: string, //"#FFC107",
    dark: string, //"#0e1b20",
    light: string, //"#aaa",
    muted: string, //"#abafb3",
    border: string, //"#DDDFE1",
    inverse: string, //"#2F3D4A",
    shaft: string, //"#333",

    background: string, //"#FBEEE5",

    ///////////////
    // Menu button, 
    ///////////////
    menuButton: string, //"#F27244",
    menuIcon: string, //"#F27244",
    ///////////////
    // Grid color header, alt
    ///////////////
    gridHeader: string, //"#A3CBD7", //"#4B32A6", //"#A68695",
    gridAlt: string, //"#A3CBD7", // "#7350F2", //"#d1adcc",
    gridActiveRow: string, //"#ABAFB3",
    gridSelectedRows: string, //"rgb(230,230,230)",

    ///////////////
    // Grays
    ///////////////
    dim_grey: string, //"#696969",
    dove_gray: string, //"#d5d5d5",
    body_bg: string, //"#f3f6f9",
    light_gray: string, //"rgb(230,230,230)",
    ///////////////
    // Solid Color
    ///////////////
    white: string, //"#fff",
    black: string, //"#000",
  }

  export const defaultAppTheme : IAppTheme = {
    primary: "#922790", //"#F0F2F5", //"#FF957B", // "#435939", 
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

    background: "#fff", //"#7BAFD4",

    ///////////////
    // Menu button, 
    ///////////////
    menuButton: "#3FA657",
    menuIcon: "#3FA657",
    ///////////////
    // Grid color header, alt
    ///////////////
    gridHeader: "#A3CBD7", //"#4B32A6", //"#A68695",
    gridAlt: "#A3CBD7", // "#7350F2", //"#d1adcc",
    gridActiveRow: "#ABAFB3",
    gridSelectedRows: "rgb(230,230,230)",

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
  }