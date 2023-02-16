import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  card: {
    display: 'flex', 
    width:"100%", 
    height:"100%",
    [theme.breakpoints.down('lg')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  image: {
    width: 128,
    maxWidth: 128, 
    height: 168, 
    cursor:"pointer",
    [theme.breakpoints.down('lg')]: {
      maxWidth:"100%"
    },
  },
  details: {
    display: 'flex', 
    maxWidth: 'calc(100% - 128px)', 
    flexDirection: 'column',
    [theme.breakpoints.down('lg')]: {
      maxWidth:"100%"
    },
  },
  title: {
    textDecoration: "none", 
    color: "black", 
    wordWrap: "break-word"
  },
  addToList: {
    display: 'flex', 
    flexDirection: 'column', 
    marginLeft: 0,
    marginRight: "auto"
  }
}));