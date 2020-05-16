import React, {useState,useEffect} from 'react';
import {fetchDailyData} from '../../api';
import { Line,Bar } from 'react-chartjs-2';
import styles from './Charts.module.css';
import {Grid} from '@material-ui/core';
const Charts = ({data:{confirmed,recovered,deaths},country}) =>{

    const[dailyData,setDailyData] = useState([]);
    useEffect(() => {
        const setData = async () => { 
            setDailyData(await fetchDailyData());
        };
        
        setData();
        //console.log(dailyData);
    },[]);

    const lineChart=(
        dailyData.length ? (
        <Line
            data={{
                labels : dailyData.map(({date})=>date),
                datasets :[{
                    data:dailyData.map(({confirmed})=>confirmed),
                    label : 'Infected People',
                    borderColor:'#333fff',
                    fill:true
                },{
                    data:dailyData.map(({deaths})=>deaths),
                    label : 'Deaths',
                    borderColor:'red',
                    fill:true
                }]                

            }}
        /> 
        ) : null
    );
    const barChart=(
        confirmed ? (
                <Bar 
    data={{    
        labels : ['Infected','Recovered','Deaths'],
        datasets:[{
            label:'People',
            backgroundColor:['rgba(0, 0, 255, 0.5)','rgba(0, 255, 0, 0.5)','rgba(255, 0, 0, 0.5)'],
            data : [confirmed.value,recovered.value,deaths.value]
        }]
    }}
    options={{
        legend:{display: false},
        label : {display : true, text:`Current update in ${country}`}
    }}                
                
                />
 
       ) : null
    );
   return(
       <div className={styles.container} >
             <Grid container >
        <Grid item xs={12} md={12}>
        {country ? barChart : lineChart }
        </Grid>
        </Grid>
           
       </div>
   )
}

export default Charts;