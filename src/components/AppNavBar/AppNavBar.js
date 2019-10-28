import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SideDrawer from '../SideDrawer/SideDrawer';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#bf360c' },
    },
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontSize: 24,
    },
}));

function AppNavBar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <SideDrawer />
                        <Typography variant="h1" className={classes.title}>
                            {/* {props.user.username ? */}
                                {/* <div>Welcome, {props.user.username}!</div>
                                : */}
                                <div>TimeWise</div>
                            {/* } */}

                        </Typography>
                        <Button color="inherit" component={Link} to="/home">Home</Button>
                        {/* Show the link to the info page and the logout button if the user is logged in */}
                        {props.user.username ? 
                            <Button
                                color="inherit"
                                onClick={() => props.dispatch({ type: 'LOGOUT' })}>
                                    Logout
                            </Button>
                        :
                        <div></div>
                        }

                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
}
const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(AppNavBar);