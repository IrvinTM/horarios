import { Card } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export function Subject({code, subject, url}) {
  return (
    <div>
      <Card className="text-center flex flex-col justify-center content-center items-center w-80 h-60" sx={{ maxWidth: 345 }}>
        <Typography variant="h2">{code}</Typography>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {subject}
          </Typography>
        </CardContent>
        <CardActions>
            <a href={url}> <Button variant="contained" size="small">horarios</Button></a>
         
        </CardActions>
      </Card>
    </div>
  );
}
