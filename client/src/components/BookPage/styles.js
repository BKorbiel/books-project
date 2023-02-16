import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    width: 128,
    height: 168,
  },
  card: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    margin: '10px',
    wordWrap: "break-word",
    maxWidth: "100%"

  },
  imageSection: {
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex', justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
    },
  },
  commentsInnerContainer : { marginRight: '30px', width:'50vw'},
  writeComment : {
    width: "30%",
    [theme.breakpoints.down('sm')]: {
      width: "65vw"
    }
  }
}));