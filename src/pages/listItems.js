import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ViewListIcon from '@mui/icons-material/ViewList';
import BeenhereIcon from '@mui/icons-material/Beenhere';

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
  <div>
    <ListItemLink href={"/dashboard"}>
      <ListItemIcon>
      <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemLink>
    <ListItemLink href={"/New_request"}>
      <ListItemIcon>
        <AddBoxIcon />
      </ListItemIcon>
      <ListItemText primary="New request" />
    </ListItemLink>
    <ListItemLink href={"/List_request"}>
      <ListItemIcon>
        <ViewListIcon />
      </ListItemIcon>
      <ListItemText primary="List request" />
    </ListItemLink>
    <ListItemLink href={"/Accept_request"}>
      <ListItemIcon>
        <BeenhereIcon />
      </ListItemIcon>
      <ListItemText primary="Accept request" />
    </ListItemLink>
  </div>
);