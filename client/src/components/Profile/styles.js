import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  paper: {
    padding:"20px", 
    borderRadius: '15px',
    [theme.breakpoints.down('sm')]: {
      padding: "5px"
    },
  },
  profile: {
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center"
  },
  avatar: {
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center"
  },
  name: {
    maxWidth: "100%", 
    wordWrap: "break-word", 
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  list: {
    maxWidth: 'calc(100% - 40px)'
  },
  book: {
    display: 'flex', 
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
    
  }
}));