import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';

import Mailbox from './components/Mailbox';
import Composer from './components/Composer';

const drawerWidth = 240;
const primaryColor = "#3f51b5";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        drawer: {
            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        drawerButtonContainer: {
            display: 'flex',
            justifyContent: 'center',
        },
        drawerButton: {
            width: '83%',
            margin: '10px 0px 11px'
        },
        drawerPaper: {
            width: drawerWidth
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
                backgroundColor: primaryColor
            },
        },
        appBarButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1
        }
    })
);

interface Folder {
    name: string;
    icon: React.ComponentType<any>;
}
const Folders: Folder[] = [
    { name: "Inbox", icon: InboxIcon },
    { name: "Sent", icon: SendIcon },
    { name: "Drafts", icon: EditIcon },
    { name: "Spam", icon: BlockIcon },
    { name: "Trash", icon: DeleteIcon }
];

export default () => {
    const classes = useStyles();
    const [title, setTitle] = React.useState("Inbox");
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const toggleDrawer = () => {
        setMobileOpen(!mobileOpen);
    }
    const [view, setView] = React.useState(<Mailbox />);
    const changeView = (viewName: string) => {
        setTitle(viewName);
        if (viewName == "Compose") {
            setView(<Composer />);
        } else {
            setView(<Mailbox />);
        }
    }

    const drawer = (
        <div>
            <div className={classes.drawerButtonContainer}>
                <Button onClick={() => changeView("Compose")}
                    variant="contained"
                    color="primary"
                    size="large"
                    className={classes.drawerButton}
                    startIcon={<SendIcon />}
                >
                    Compose
                </Button>
            </div>
            <Divider />
            <List>
                {Folders.map((folder, index) => {
                    const IconComponent = folder.icon;
                    return (
                        <ListItem button key={index} onClick={() => changeView(folder.name)}>
                            <ListItemIcon><IconComponent /></ListItemIcon>
                            <ListItemText primary={folder.name} />
                        </ListItem>
                    )
                })}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                        className={classes.appBarButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <h5>{title}</h5>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer}>
                <Hidden smUp>
                    <Drawer open={mobileOpen}
                        onClose={toggleDrawer}
                        classes={{ paper: classes.drawerPaper }}
                        variant="temporary"
                        ModalProps={{ keepMounted: true }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown>
                    <Drawer open
                        classes={{ paper: classes.drawerPaper }}
                        variant="permanent"
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {view}
            </main>
        </div>
    );
}