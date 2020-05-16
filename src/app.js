import React from 'react';


//import Cards from './components/Cards/Cards';
//import Charts from './components/Charts/Charts';
//import CountryPicker from './components/CountryPicker/CountryPicker';

import {Cards,Charts,CountryPicker} from './components';
import styles from './App.module.css';
import {fetchData} from './api';

class App extends React.Component{
   
    state = {
        data:{},
        country:''
    }
   async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data:fetchedData});
        //console.log(data);
    }
    handleCountryPickerChange = async (countryName) =>{
        console.log("country value",countryName);
        const countrySpecificData = await fetchData(countryName);
        console.log(countrySpecificData);
        this.setState({data:countrySpecificData,country:countryName});
    }
    render(){
        return(
            <div className={styles.container}>
            <Cards data={this.state.data}/>
            <CountryPicker handleCountryPickerChange={this.handleCountryPickerChange}/>
            <Charts data={this.state.data} country={this.state.country}/>
            </div>
        )
    }
}
export default App;