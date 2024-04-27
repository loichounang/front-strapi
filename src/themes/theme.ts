import { createTheme } from '@mui/material/styles';


export const DrawerWidth = 350;


export const Colors = {
  primary: "#05A6A6", //"#5f2c3e",
  secondary: "#012840", //"#d1adcc",
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

  ///////////////
  // Grid color header, alt
  ///////////////
  grid_header: "#ADD9D4", // "#A68695",
  grid_alt: "#D0F2EF",

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
};

export const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
    },
    secondary: {
      main: Colors.secondary,
    },
  },

    typography : {
      fontFamily: ["Raleway"].join(","),
      button: {
        textTransform: 'none'
      }
    },

    components: {
      MuiTypography: {
        styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              paddingTop: '4px',
              paddingBottom: '4px',
            },
          },
      },

      MuiContainer: {
        
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            paddingLeft: '2px',
            paddingRight: '2px',

            margingLeft: '4px',
            marginRight: '4px',
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          // Name of the slot
          paper: {
            width: DrawerWidth,          
            //background: Colors.primary,
            color: Colors.secondary,
            borderRadius: '60px 0px 0px 0px',
            borderRight: `1px solid ${Colors.primary}`
            
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          root: {
            paddingRight: 8
          }
        }
      },

      MuiStack: {
        
        defaultProps: {
          sx: {
            px: 1,
            py: 1,
          },
          spacing: 0,
          direction: 'row',
        },

        
      },

      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
      },
      MuiLink: {
        defaultProps: {
          sx: {
            color: (theme) => theme.palette.primary.main,
          },
          underline: 'none',
        },
      },
      
      MuiButtonBase: {
        defaultProps: {
          // The default props to change
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
      // Name of the component
      MuiButton: {
        defaultProps: {
          size: 'small',
          
          disableRipple: true,
        },
        

        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            fontSize: '1rem',
          },
        },
      },
  
      MuiFormControl: {
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            margin: '2px',
          },
        },
      },
  
      MuiInputBase: {
        styleOverrides: {
          // Name of the slot
          root: {
            
          },
          input: {
            
            // Some CSS
            padding: '0px',
            '&.Mui-disabled': {
              //background: 'grey',
              borderBottom: '1px solid rgba(255, 0, 0, 0.42)', // use your color
            },
            '&.MuiInputBase-readOnly': {
              bgColor: 'red',
              borderBottom: '1.2px solid rgba(255, 0, 0, 0.42)' // use your color
          },
            
        },
      }
    },
      
  
      MuiTextField: {
        defaultProps: {    
             
          variant: 'standard',
          
          sx: {marginTop: '2px', marginLeft: '8px', marginRight: '8px',},
          InputLabelProps: {
            shrink:true,
            style: {fontWeight: 'bold'}
          },
          inputProps: {
            autoComplete: 'new-password',
            style: {textTransform: 'uppercase'}
         }
        },

        styleOverrides: {
          // Name of the slot
          root: {
            
          },
        },
      },
  
      MuiCheckbox: {
        defaultProps: {     
          size: 'small'
        },
        styleOverrides: {
          // Name of the slot
          root: {
            // Some CSS
            minWidth: '24px',
            padding: '0px',
            
          },
        },
      },

      
      MuiListItem: {
        defaultProps: { 
          dense: true,
          sx: {paddingTop: '2px', paddingBottom: '2px' },        
        },
  
        styleOverrides: {
          root: {
            paddingLeft: '8px',
          },
        },
      },
  
      MuiListItemIcon: {
        defaultProps: {                 
        },
  
        styleOverrides: {
          root: {
            minWidth: '24px',
          },
        },
      },
  
  
  
  
      MuiListSubheader: {
        styleOverrides: {
          root: {
            lineHeight: '32px',
            paddingLeft: '8px',
            paddingRight: '8px',
            paddingBottom: '4px',
            paddingTop: '4px'
          },
        },
      },
  
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            marginLeft: '2px',
            marginRight: '2px',
            marginTop: '12px'
          },
          label: {
            // Some CSS
            fontWeight: 'bold'
            
          },
        },
      },
      
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        },
      },
  
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: '8px',
            paddingBottom: '8px',
            paddingLeft: '8px',
            paddingRight: '8px',
          },
        },
      },
  
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: '32px',
            height: '32px',
            '@media (min-width: 0px)': {
                minHeight: '32px',
              },
            '@media (min-width: 600px)': {
                minHeight: '32px',
                paddingRight: '0px',
            },
              
          }
        }
      }
  
    },
  });