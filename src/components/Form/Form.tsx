import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, InputAdornment, TextField} from "@mui/material";
import {Content} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import Select from "../Select/Select";

const Form = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [value, setValue] = useState<Content>( {
    title: '',
    content: '',
  })
  const [loader, setLoader] = useState(false);

  const onChange = async (e:React.ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const {name, value} = e.target;
    setValue(prev => ({...prev, [name]:value}))
  }

  useEffect(() => {
    if (category !== '') {
      const resContent = async () => {
        try {
          setLoader(true)
          const content = await axiosApi.get<Content>('/pages/' + category + '.json');
          setValue(prev => ({...prev, content: content.data.content, title: content.data.title}))
        } finally {
          setLoader(false)
        }
      }
      resContent().catch(console.error)
    }
  }, [category])

  const updateContent = async (e:React.FormEvent) => {
    e.preventDefault();
    if (category !== '') {
      await axiosApi.put('/pages/' + category + '.json', value);
      navigate(`/pages/${category}`)
    }
  }

  const onChangeSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setCategory(e.target.value)
  }



  return (
    <Box component='form' sx={{width: '500px'}} onSubmit={updateContent}>
      <Select value={category} onChange={onChangeSelect}/>
      <TextField
        sx={{mb: 2}}
        fullWidth
        id="outlined-basic"
        label="Название: "
        variant="outlined"
        name='title'
        value={value.title}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {loader ? <CircularProgress/> : null }
            </InputAdornment>
          )
        }}
        required
      />

      <TextField
        sx={{mb: 2}}
        fullWidth
        id="standard-multiline-flexible"
        label="Текст: "
        multiline
        rows={8}
        variant="outlined"
        name='content'
        value={value.content}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {loader ? <CircularProgress/> : null }
            </InputAdornment>
          )
        }}
        required
      />

      <Button type='submit' sx={{width: 150}} variant="contained">
        изменить
      </Button>
    </Box>
  );
};

export default Form;