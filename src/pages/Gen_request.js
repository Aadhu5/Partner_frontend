import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { BrowserRouter as Router } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const mdTheme = createTheme();
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function GenreqDetails() {
  let [req_data, setReq_data ] = React.useState([]);

  React.useEffect(() => {
    const getAcc = async (id) => {
        const temp_acc = await fetch(process.env.REACT_APP_API_URL+'/req_details/'+id)
        .then(response => response.json())
        .then(data => {
          let dataValues=data.data[0];
          console.error(dataValues.details);
          setReq_data(prev=>dataValues.details)
        });
        return temp_acc;
    }
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');
    getAcc(id);
  },[])  

  return (
    <Router>
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto', }} >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {req_data.map((row,index) => 
            
            <Box sx={{ flexGrow: 1 }} key={row['id']}>
                <Typography variant="h3" component="h2" color="primary" style={{paddingBottom: '30px',paddingTop: '30px',textAlign: 'center',fontWeight: "600",}}>Project Name</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={1} md={1}><Item style={{fontWeight: "700"}}>From</Item></Grid>
                    <Grid item xs={11} md={11}><Item style={{textAlign: "left"}}>{row['fr_add']}</Item></Grid>
                    
                    <Grid item xs={1} md={1}><Item style={{fontWeight: "700"}}>Hash ID</Item></Grid>
                    <Grid item xs={9} md={9}><Item style={{textAlign: "left"}}>{row['fr_hash']}</Item></Grid>
                    <Grid item xs={2} md={2}><Item style={{textAlign: "left"}}>{row['fr_time']}</Item></Grid>
                    
                    <Grid item xs={1} md={1}><Item style={{fontWeight: "700"}}>Details</Item></Grid>
                    <Grid item xs={11} md={11}><Item style={{textAlign: "left"}}>{row['details']}</Item></Grid>

                    <Grid item xs={1} md={1}><Item style={{fontWeight: "700"}}>To</Item></Grid>
                    <Grid item xs={11} md={11}><Item style={{textAlign: "left"}}>{row['to_add']}</Item></Grid>
                    
                    <Grid item xs={1} md={1}><Item style={{fontWeight: "700"}}>Hash ID</Item></Grid>
                    <Grid item xs={9} md={9}><Item style={{textAlign: "left"}}>{row['to_hash']}</Item></Grid>
                    <Grid item xs={2} md={2}><Item style={{textAlign: "left"}}>{row['to_time']}</Item></Grid>
                    
                    <Grid item xs={1} md={1}><Item style={{fontWeight: "700"}}>Details</Item></Grid>
                    <Grid item xs={11} md={11}><Item style={{textAlign: "left"}}>{row['replay']}</Item></Grid>
                    
                    <Grid item xs={1} md={1}><Item style={{fontWeight: "700"}}>Status</Item></Grid>
                    <Grid item xs={11} md={11}><Item style={{textAlign: "left"}}><Typography style={{fontWeight: "700"}} color="secondary">Accepted</Typography></Item></Grid>
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    <Grid item xs={12} md={12}><Item>Verify this signatures on EtherScan <a target="_blank" href="https://etherscan.io/verifySig" rel="noreferrer">Verify</a></Item></Grid>
                </Grid>
            </Box>
          )} 
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </Router>
  );
}

export default function Gen_request() {
    return <GenreqDetails />;
}