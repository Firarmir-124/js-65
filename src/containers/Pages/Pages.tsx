import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Content} from "../../types";
import axiosApi from "../../axiosApi";
import Form from "../../components/Form/Form";
import {Alert, Box, LinearProgress, Paper, Typography} from "@mui/material";

const Pages = () => {
  const {pagesName} = useParams();
  const [pages, setPages] = useState<Content | null>(null);
  const [loader, setLoader] = useState(false);

  let url = '/pages/' + pagesName + '.json';

  if (!pagesName) {
    url = '/pages/about.json'
  }

  const resPages = useCallback(async () => {
    try {
      setLoader(true)
      const newPage = await axiosApi.get<Content>(url);
      setPages(newPage.data);

    }finally {
      setLoader(false)
    }
  }, [url])

  useEffect(() => {
    resPages().catch(console.error)
  }, [resPages])

  return (
    <>
      {
        ! loader ?
          <Box component='div' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {pagesName === 'admin' ? (
                <>
                  <Typography component='h1' variant='h1' sx={{mb: 5}}>Админ панель</Typography>
                  <Form/>
                </>
              ) :
              <>
                {pages ? (
                  <Box component='div' sx={{mt: 5}}>
                    <Paper elevation={3} sx={{mr: 2, mb: 2, p: 3}}>
                      <Typography component='h1' variant='h2'>{pages.title}</Typography>
                    </Paper>
                    <Paper elevation={2} sx={{p: 3}}>
                      <Typography component='p' variant='h5'>{pages.content}</Typography>
                    </Paper>
                  </Box>
                ): <Alert severity="info">Информации нет !</Alert>}
              </>
            }
          </Box> : <LinearProgress sx={{p: '2px'}} color="inherit" />
      }
    </>
  );
};

export default Pages;