import React, {useCallback, useEffect, useState} from 'react';
import {AppBar, CircularProgress, List, ListItem, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {ContentList, ContentMutation} from "../../types";
import axiosApi from "../../axiosApi";
import './NavBar.css';

const NavBar = () => {
  const [links, setLinks] = useState<ContentMutation[]>([])
  const [loader, setLoader] = useState(false);

  const fetchPages = useCallback(async () => {
    try {
      setLoader(true)

      const resPages = await axiosApi.get<ContentList>('/pages.json');
      const pages = resPages.data;

      if (!pages) {
        setLinks([])
        return;
      }

      const newPages = Object.keys(pages).map(id => {
        return {
          ...pages[id],
          id
        }
      })
      setLinks(newPages)
    } finally {
      setLoader(false)
    }
  }, [])

  useEffect(() => {
    fetchPages().catch(console.error)
  }, [fetchPages])

  return (
    <AppBar component="nav" sx={{position: 'static'}}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
        >
          Static Pages
        </Typography>
        {
          !loader ?
            <List sx={{display: 'flex'}}>
              {links.map(name => (
                <ListItem key={name.id}>
                  <NavLink className='link' to={'/pages/' + name.id}>{name.id[0].toUpperCase() + name.id.slice(1)}</NavLink>
                </ListItem>
              ))}
              <ListItem>
                <NavLink className='link-admin' to='/pages/admin'>Admin</NavLink>
              </ListItem>
            </List> : <CircularProgress color="secondary" />
        }
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;