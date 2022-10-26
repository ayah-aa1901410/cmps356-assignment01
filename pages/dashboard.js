import Pair from "./components/Pair.js"
import Grid from '@mui/material/Grid';
import { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Container from '@mui/material/Container';

export default function Dashboard(){

    const [forex, setForex] = useState([])
    const symbols = useRef([])
    const [query, setQuery] = useState("USD")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function setFromLocal(){
            if(!window.localStorage.getItem("query")){
                setQuery("USD")
            }else{
            setQuery(window.localStorage.getItem("query",query))
            }
        }
        setFromLocal()
    }, [query]);

    useEffect(()=> {
        async function getSymbols() {
            const url1 = "https://api.exchangerate.host/symbols";
            const response1 = await fetch(url1).then(response => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                return response.json()
              }).catch(err=>{
              console.log(err)
          });
          console.log(response1)
            symbols.current = await response1;
        }
        setLoading(true)
        getSymbols()
        setLoading(false)
    },[])

    // useEffect(() => {
    //     function saveToStorage(){
    //         window.localStorage.setItem("query",query);
    //         console.log("saving to local",window.localStorage.getItem("query"))
    //     }
    //     saveToStorage() 
    //   }, [query]);

      
    useEffect(() => {
        async function getForex() {
          const url2 = `https://api.exchangerate.host/latest?base=${query}`;
          const response2 = await fetch(url2);
          setForex(await response2.json());
        }
        setLoading(true)
        getForex()
        setLoading(false)
      },[query])  

  let syms =[];
  if(symbols.current.symbols !== undefined){
    Object.keys(symbols.current.symbols).map((key, index) => syms.push(key))
  }

  let rates = []
  if(forex.rates !== undefined){
       rates = Object.entries(forex.rates)
  }


    return loading? <div></div> : <>
        <Container maxWidth="lg" sx={{justifyContent: "center", alignContent: "center", alignItems: "center", width: "100%", marginLeft: "auto", boxSizing: "border-box", marginRight: "auto", display: "block", padding: "20px"}}>
            <Box sx={{ minWidth: 120, width: 300, height:100, justifyContent: "center", alignItems: "center", boxSizing: "border-box", display: "flex", flexDirection: "row", margin: "10px 0 20px"}}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Base Currency</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Base Currency"
                    value={query}
                    onChange={e => {
                        window.localStorage.setItem("query",e.target.value)
                        setQuery(e.target.value)
                        }}
                >
                {syms.map(sym => <MenuItem key={sym.id} value={sym}>{sym}</MenuItem>)}
                </Select>
                </FormControl>
            </Box>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 12 }} sx={{padding: "0px 15px", justifyContent: "justify", boxSizing: "border-box", display: "flex", flexWrap: "wrap", flexDirection: "row", marginTop: "-20px", marginLeft: "-20px"}}>
                {rates.map(rate => <Pair key={rate.id} rate={rate} base={forex.base} />)}
            </Grid>
        </Container> 
    </>
}