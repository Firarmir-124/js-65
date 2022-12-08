import React, {useCallback, useEffect, useState} from 'react';
import {ContentList, ContentMutation} from "../../types";
import axiosApi from "../../axiosApi";
import './Select.css';

interface Props {
  value: string;
  onChange: (e:React.ChangeEvent<HTMLSelectElement>) => void
}

const Select:React.FC<Props> = ({value, onChange}) => {
  const [nameSelects, setNameSelects] = useState<ContentMutation[]>([])

  const fetchPages = useCallback(async () => {
    const resPages = await axiosApi.get<ContentList>('/pages.json');
    const pages = resPages.data;

    if (!pages) {
      setNameSelects([])
      return;
    }

    const newPages = Object.keys(pages).map(id => {
      return {
        ...pages[id],
        id
      }
    })
    setNameSelects(newPages)
  }, [])

  useEffect(() => {
    fetchPages().catch(console.error)
  }, [fetchPages])


  return (
    <select className='custom-select' name="category" value={value} onChange={onChange}  required>
      <option value="" disabled>Выберите</option>
      {nameSelects.map(name => (
        <option key={name.id} value={name.id}>{name.id[0].toUpperCase() + name.id.slice(1)}</option>
      ))}
    </select>
  );
};

export default Select;