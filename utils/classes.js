const classes = {
  //common
  flex: {
    display: 'flex',
  },
  visible: {
    display: 'initial',
  },
  hidden: {
    display: 'none',
  },
  sort: {
    marginRight: 1,
  },
  fullHeight: { height: '100vh' },
  fullWidth: {
    width: '100%',
  },
  error: {
    color: '#f04040',
  },
  form: {
    width: '100%',
    maxWidth: 800,
    margin: '0 auto',
  },
  //layout
  main: {
    marginTop: 2,
    minHeight: '100vh',
  },
  section: {
    marginTop: 1,
    marginBottom: 10,
  },
  // header
  appbar: {
    backgroundColor: '#454545',
    '& a': {
      color: '#ffffff',
      marginLeft: 1,
    },
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  grow: {
    flexGrow: 1,
  },
  navbarButton: {
    color: '#ffffff',
    textTransform: 'initial',
  },

  menuButton: { padding: 0 },

  // search

  searchForm: {
    border: '1px solid #ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 1,
  },
  searchInput: {
    paddingLeft: 1,
    color: '#000000',
    '& ::placeholder': {
      color: '#606060',
    },
  },
  searchButton: {
    backgroundColor: '#1d9123',
    padding: 1,
    borderRadius: '0 5px 5px 0',
    '& span': {
      color: '#000000',
    },
  },
  // Footer
  footer: {
    backgroundColor: '#454545',
    width: `100%`,
    position: 'relative',
    overflow: 'hidden',
    marginTop: '6em',
    padding: '2em 0 ',
    textAlign: 'center',
    flexGrow: '1',
  },
  link: {
    fontSize: '1.2em',
    color: '#fff',
    '&:hover': {
      color: 'black',
    },
  },
  // review
  reviewItem: {
    marginRight: '1rem',
    borderRight: '1px #808080 solid',
    paddingRight: '1rem',
  },

  // map
  mapInputBox: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    right: 0,
    margin: '10px auto',
    width: 300,
    height: 40,
    '& input': {
      width: 250,
    },
  },
  avator: {
    width: '8em',
    height: '8em',
    boxShadow: '0px 0px 10px 1px #b2b2b28f',
  },
  snsIcon: {
    width: '30px',
    height: '30px',
  },
  '&:hover': {
    color: '#808080',
  },

  copylight: {
    color: '#fff',
    fontSize: '1em',
    '&:hover': {
      color: 'white',
    },
  },
};

export default classes;
