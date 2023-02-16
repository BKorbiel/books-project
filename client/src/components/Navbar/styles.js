import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      flexDirection: 'column'
    },
  },
  toolBar: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column'
    },
  },
  heading: {
    justifyContent: 'flex',
    color: 'rgba(150, 75, 0, 0.8)',
    textDecoration: 'none',
  },
  image: {
    marginLeft: '15px',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  profile: {
    cursor: 'pointer',
    marginLeft: 'auto',
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '40px',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '100px',
    [theme.breakpoints.down('sm')]: {
      margin: 0,
    },
  },
}));