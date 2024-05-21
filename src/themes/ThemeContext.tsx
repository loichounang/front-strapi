
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createTheme, ThemeProvider, Theme, } from '@mui/material/styles';

import { useRecoilState } from 'recoil';
import { colorsAtom } from 'library/store';



interface ThemeContextProps {
  theme: Theme;
}


export const DrawerWidth = 350;


const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderExProps {
    children: React.ReactNode; // Make sure children is defined in the props
  }

  export const ThemeProviderEx: React.FC<ThemeProviderExProps> = ({ children }) => {

    const [Colors, setColors] = useRecoilState(colorsAtom);

    const [muiTheme, setMuiTheme] = useState<Theme>(createTheme(
        {
            palette: {
              primary: {
                main: Colors.primary,
              },
              secondary: {
                main: Colors.secondary,
              },
              background: {
                default: Colors.background, // Gris clair
              },
            },
          
              typography : {
                fontFamily: ["Raleway"].join(","),
                button: {
                  textTransform: 'none'
                }
              },
          
              
            }
      ));

    
    //const [recoilTheme, setRecoilTheme] = useRecoilState(themeState);
  
  
  // Generate or update Material-UI theme based on the theme data
  //const muiTheme = ;

  useEffect(() => {
    setMuiTheme(
        createTheme(
            {
                palette: {
                  primary: {
                    main: Colors.primary,
                  },
                  secondary: {
                    main: Colors.secondary,
                  },
                  background: {
                    default: Colors.background, // Gris clair
                  },
                },
              
                  typography : {
                    //fontFamily: ["Raleway"].join(","),
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
                      styleOverrides: {
                        root: {
                          backgroundColor: Colors.background, 
                          //padding: '16px', 
                        },
                      },
                      defaultProps: {
                        elevation: 0,
                      },
                    },
                    MuiLink: {
                      defaultProps: {
                        sx: {
                          //color: (theme: { palette: { primary: { main: any; }; }; }) => theme.palette.primary.main,
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
                          '&[readonly]': {
                            backgroundColor: '#FFCCCC', // Couleur gris personnalisée pour les TextField en lecture seule
                          },
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
              
                    MuiList: {
                        
                      styleOverrides: {
                        root: {
                          backgroundColor: Colors.background,
                          
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
                          backgroundColor: Colors.background,
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
                          backgroundColor: Colors.gridHeader,
              
                          lineHeight: '32px',
                          paddingLeft: '8px',
                          paddingRight: '8px',
                          paddingBottom: '4px',
                          paddingTop: '4px',
              
              
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
                
                    // MuiToolbar: {
                    //   styleOverrides: {
                    //     root: {
                    //       minHeight: '32px',
                    //       height: '32px',
                    //       '@media (min-width: 0px)': {
                    //           minHeight: '32px',
                    //         },
                    //       '@media (min-width: 600px)': {
                    //           minHeight: '32px',
                    //           paddingRight: '0px',
                    //       },
                            
                    //     }
                    //   }
                    // },
              
                    MuiToggleButton: {
                        
                      styleOverrides: {
                        root: {
                          '&.Mui-selected': {
                            fontWeight: 'bold',
                            color: Colors.primary, // Change this to the desired foreground color
                          },
                        },
                      },
                    },
              
                    MuiTabs: {
                      styleOverrides: {
                        root: {
                          minHeight: '48px',
                          height: '48px',
                          '@media (min-width: 0px)': {
                              minHeight: '48px',
                            },
                          '@media (min-width: 600px)': {
                              minHeight: '48px',
                              paddingRight: '0px',
                          },
                            
                        }
                      },
              
                      defaultProps: {    
                                 
                        //sx: {marginTop: '2px', marginLeft: '8px', marginRight: '8px',},
                        sx: {
                          
                          '& button': {borderRadius: 2},
                          '& button: hover': {backgroundColor: Colors.gridHeader},
                          '& button: active': {backgroundColor: Colors.light_gray},
                          '& button.Mui-selected': {backgroundColor: Colors.gridAlt, fontWeight: 'bold',},
                          borderRight: 1, borderColor: 'divider' }          
                      },        
                    },
              
                    MuiTab: {
                      styleOverrides: {
                        root: {
                          minHeight: '48px',
                          height: '48px',
                          '@media (min-width: 0px)': {
                              minHeight: '48px',
                              paddingRight: '4px',
                            },
                          '@media (min-width: 600px)': {
                              minHeight: '48px',
                              paddingRight: '8px',
                          },
                            
                        }
                      },
                           
                    },
                
                  },
                }
          )
    );
  }, [Colors]);


  return (
    <ThemeContext.Provider value={{ theme: muiTheme }}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};