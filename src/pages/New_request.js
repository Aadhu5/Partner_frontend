import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { mainListItems } from './listItems';
import List from '@mui/material/List'; 
import Button from '@mui/material/Button';
import { BrowserRouter as Router } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import web3 from './web3';


const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const mdTheme = createTheme();


function RequestContent() {
  const [open, setOpen] = React.useState(true);
  const [to_address, setto_address ] = React.useState('');
  const [partner_msg, setpartner_msg ] = React.useState('');
  const [dialog, setDialog] = React.useState(false);
  const [dialog_tit, setDialog_tit] = React.useState('');
  const [dialog_msg, setDialog_msg] = React.useState('');
  const [loader, setLoader] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const DialogClose = () => {
    setDialog(false);
  };
  const submitForm = async event => {
    event.preventDefault(); setLoader(true);
    const accounts = await web3.eth.getAccounts();
    if(accounts!=='')
    {
      if(to_address!== undefined && partner_msg!== undefined)
      {
        const signature = await web3.eth.personal.sign(partner_msg, accounts[0]);
        console.error(signature);
        if(signature!== undefined)
        {
          const now = new Date();
          const addUser = await fetch(process.env.REACT_APP_API_URL+'/insert_from', {
            method: 'POST',
            headers: {'Accept': 'application/json','Content-Type': 'application/json'},
            body: JSON.stringify({
              fr_add: accounts[0],
              to_add: to_address,
              fr_hash: signature,
              fr_time: now,
              details: partner_msg
            })
          }).then(add_res => add_res.json())
          .then(function(api_add){ return api_add; });
          if(addUser['status']!==0)
          {
            setDialog_tit('Success !'); setDialog_msg('Request sent successfully'); setDialog(true); setLoader(false);
            setTimeout(() => {
              setLoader(false);
              window.location.href = process.env.REACT_APP_WEB_URL+'/New_request';
            }, 5000);
          } else {
            setDialog_tit('Failed !'); setDialog_msg(addUser['message']); setDialog(true); setLoader(false);
          }
        } else {
          setDialog_tit('Alert! Process Failed'); setDialog_msg('Process failed, please do after some hours'); setDialog(true); setLoader(false);
        }
      } else { 
        setDialog_tit('Alert! Entries Missing'); setDialog_msg('Please enter valid details into the form, And all fields are mandatory'); setDialog(true); setLoader(false);
      }
    } else {
      setDialog_tit('Alert! Connect wallet'); setDialog_msg('Please connect your ethereum wallet here. Your ethereum address is missing'); setDialog(true); setLoader(false);
    }
  };
  
  return (
    <Router>
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px', /* keep right padding when drawer closed */ }} >
            <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={toggleDrawer} sx={{ marginRight: '36px', ...(open && { display: 'none' }), }} >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }} >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1], }} >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>{mainListItems}</List>
        </Drawer>
        <Box component="main" sx={{ backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900], flexGrow: 1, height: '100vh', overflow: 'auto', }} >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
          <form noValidate autoComplete="off" onSubmit={submitForm}>
                <List >
                    <ListItem alignItems="flex-start">
                        <Typography variant="h4">Send Request</Typography>
                    </ListItem>
                    <ListItem>
                        <TextField id="outlined-basic" value={to_address} onChange={e => setto_address(e.target.value)} fullWidth label="To: Public Address" variant="outlined"/>
                    </ListItem>
                    <ListItem>
                        <TextareaAutosize value={partner_msg} onChange={e => setpartner_msg(e.target.value)} style={{width: 'inherit'}} minRows={10} aria-label="maximum height" placeholder="Message" name="messageto"/>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" color="primary" type="submit">Send</Button>
                    </ListItem>
                </List>
            </form>

            <Dialog open={dialog} onClose={DialogClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                {dialog_tit}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {dialog_msg}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={DialogClose} autoFocus>
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loader} >
              <CircularProgress color="inherit" />
            </Backdrop>

          </Container>
        </Box>
      </Box>
    </ThemeProvider>
    </Router>
  );
}

export default function New_request() {
  return <RequestContent />;
}