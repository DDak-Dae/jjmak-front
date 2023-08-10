import * as React from 'react';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate, Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const buttonStyles = makeStyles({
  root: {
    borderRadius: "40px",
    marginleft: "5px",
    marginRight: "5px",
    color: "black",
    borderColor: "black",
    whiteSpace: "nowrap"
  }
})


// sx={{ maxWidth: 345 }}
export default function WorkSpaceCard({ showChannel, getWordCloud }) {
  const navigate = useNavigate();
  const channelUrl = '/channel/' + showChannel.channelId
  // <Link to={'/'} >버튼</Link>
  // <CardActionArea onClick={()=> {navigate('/chat')}}>
  console.log(showChannel)

  const buttonStyle = buttonStyles();

  function CardClick() {
    if (getWordCloud) {
      getWordCloud(showChannel.channelId)
    }
  }

  return (
    <Card sx={{ backgroundColor: "transparent", marginTop: '8px', border: '3px solid black' }}>
      <CardActionArea onClick={CardClick} onDoubleClick={() => { navigate(channelUrl) }}>
        <CardMedia
          component="img"
          height="140"
          image={showChannel.imgPath}
          alt="green iguana"
        />
        <CardContent>
          <Typography className="title" gutterBottom variant="h5" component="div" style={{
            fontFamily: 'Black Han Sans',
            fontFeatureSettings: "normal",
            margin: '0'
          }} noWrap>
            {showChannel.channelId}
          </Typography>
          <div className='division-line'></div>
          <Typography className="descrip" variant="h6" color="text.secondary" style={{ margin: '0' }} noWrap>
            {showChannel.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardContent sx={{ display: 'flex', overflowX: 'auto', paddingTop: '0' }}>

        {showChannel.wordCloud.slice(0, 3).map((word) => (
          <div style={{ display: "inline-flex" }}>
            <Button variant='outlined' size="small" style={{
              borderRadius: "40px",
              marginleft: "5px",
              marginRight: "5px",
              color: "black",
              borderColor: "black",
              whiteSpace: "nowrap"
            }}>{word}</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// {workspaceData.map((workspace) => {
//   console.log(workspace)
//   // workspace.wordCloud.slice(0, 3).map((word) => {
//   //   <Button variant='outlined' size="small" style={{ borderRadius: "40px", marginleft: "5px", marginRight: "5px" }}>{word}</Button>
//   // })
// })

// }
