import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Pair({key, rate, base}){
    console.log(rate)
    console.log(base)
    return rate!=undefined? (
    <>       
        <Card sx={{ boxShadow: "0.2px", height: 90, width: 170, margin: "12px 10px 12px 10px", border: "0.2px", borderColor: "gray", borderRadius: "20px"}}>
            <Grid item xs={2} sm={4} md={4} key={key}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {base}/{rate[0]}
                    </Typography>
                    <Typography variant="h7" component="div">
                    {rate[1]}
                    </Typography>
                </CardContent>
            </Grid>
        </Card>
    </>
    ): <div></div>
}