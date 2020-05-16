import axios from 'axios';

const url= 'https://covid19.mathdro.id/api';

export const fetchData = async (countryName) =>{
    let countryURL = url;
    if(countryName){
        countryURL=`${url}/countries/${countryName}`;
    }
    try {
        const {data : {confirmed,deaths,lastUpdate,recovered}}= await axios.get(countryURL);
        return {
            confirmed,
            deaths,
            lastUpdate,
            recovered
        };
    } catch (error) {
        console.log(error);  
    }

}

export const fetchDailyData = async () =>{
try {
    const {data}= await axios.get(`${url}/daily`);
    const requiredData=data.map((dailyData)=>({
        confirmed :dailyData.confirmed.total,
        deaths:dailyData.deaths.total,
        date:dailyData.reportDate
    })) 
    return requiredData;

} catch (error) {
 console.log(error);   
}

}
export const fetchCountryList = async () =>{
    try {
        const {data:{countries}} = await axios.get(`${url}/countries`);
        //console.log(countries);
        return countries.map((country)=>country.name);
        //return countries;    
    } catch (error) {
        
    }
    
} 
