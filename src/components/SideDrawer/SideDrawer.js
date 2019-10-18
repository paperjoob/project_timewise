// ========== REACT ========== //
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ========== MATERIAL UI ========== //
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// ========== STYLE ========== //
import { makeStyles } from '@material-ui/core/styles';
import './SideDrawer.css';

// ========== ICONS ========== //
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/ListAlt'


const useStyles = makeStyles({
    list: {
        width: 250,
    },

    fullList: {
        width: 'auto',

    },
});

function TemporaryDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {['TimeWise'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>

            <Divider />
            <List>
                <ListItem component={Link} to="/home" button><HomeIcon className="icon" /> Home</ListItem>
                <ListItem component={Link} to="/profile" button><AccountIcon className="icon" /> Profile </ListItem>
                {props.user.username ? <ListItem component={Link} to="/addtime" button><DashboardIcon className="icon" /> My TimeCard</ListItem> : <div></div>}
                {props.user.username ? <ListItem component={Link} to="/timesheetreport" button><ListIcon className="icon" /> Timesheet Reports</ListItem> : <div></div>}
                {props.user.admin === true ? <ListItem component={Link} to="/manage" button><ListIcon className="icon" /> Manage Employees</ListItem> : <div></div>}
                <ListItem component={Link} to="/about" button><InfoIcon className="icon" /> About</ListItem>
            </List>

            <Divider />
            {props.user.username ?
                <List>
                    <ListItem
                        component={Link} to="/home"
                        onClick={() => props.dispatch({ type: 'LOGOUT' })}
                        button>
                        Logout
                    </ListItem>
                </List>
                :
                <div></div>
            }
            
        </div>
    );


    return (
        <div>
            <IconButton onClick={toggleDrawer('left', true)}><MenuIcon /></IconButton>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(TemporaryDrawer);
