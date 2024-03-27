import React from 'react'
import { Box, Grid, Typography, TextField, Button } from '@mui/material'

function NewLetters() {
  return (
    <Box>
        <Grid >
         < Grid >
          <Typography variant='h6' sx={{fontFamily:'Poppins', fontWeight:'bold'}}>NOTRE NEWSLETTER</Typography>
          </Grid>
          <br/>
          <Grid >
          <Typography variant='body1'  sx={{fontFamily:'Poppins', fontSize:'18px', lineHeight:'33px'}}>Abonnez-vous à notre newsletter et recevez toute notre actualité</Typography>
          </Grid>
          <br/>
          <Grid >
          <TextField label='Email '  variant='outlined' sx={{fontFamily:'Poppins', width:'100%', color:'white'}}/>
          </Grid>
       
          <Button variant='contained' className='btn' sx={{fontFamily:'Poppins', width:'100%', height:'50px', color:'#fff', marginTop:'10px'}}>INSCRIVEZ-VOUS</Button>

        </Grid>
    </Box>
  )
}

export default NewLetters
