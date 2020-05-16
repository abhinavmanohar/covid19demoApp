import React,{useState,useEffect} from 'react';
import {FormControl,NativeSelect} from '@material-ui/core';
import {fetchCountryList} from '../../api';

const CountryPicker = ({handleCountryPickerChange}) =>{
    const [countryList,setCountryList] = useState([]);

    useEffect(()=>{
        const countryListData = async () =>{
            setCountryList(await fetchCountryList());
        }
        countryListData();
    },[]);
    
    
    return(
        countryList.length ? (
        <FormControl>
            <NativeSelect onChange={(e)=>{handleCountryPickerChange(e.target.value)}}>
        <option value=''>Global</option>
            {countryList.map((country,i)=><option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
        ) : null
    )
}

export default CountryPicker;