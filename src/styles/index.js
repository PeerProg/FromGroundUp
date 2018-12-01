export const submitButtonStyle = {
  width: '200px',
  height: '40px',
  backgroundColor: '#2096F3',
  fontSize: '17px',
  boxShadow: '0 4px 8px 1px rgba(0, 0, 0, 0.3)',
  textTransform: 'uppercase'
};

export const authFieldStyle = {
  width: '300px',
  height: '40px',
  fontSize: '15px'
};

export const loginFormContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
};

export const headerStyles = {
  root: {
    flexGrow: 1
  },
  AppBar: {
    backgroundColor: '#2096F3'
  },
  grow: {
    flexGrow: 1,
    textAlign: 'left'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  linkText: {
    textDecoration: 'none',
    color: 'white',
    fontFamily: 'Roboto'
  }
};

export const authDivContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  marginTop: '10%',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '40%'
};

export const authFormContainerStyle = {
  width: '100%',
  paddingLeft: '0',
  paddingRight: '0',
  textAlign: 'center'
};

export const registerPageStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});
