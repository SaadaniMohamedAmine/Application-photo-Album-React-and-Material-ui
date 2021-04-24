import React from 'react'
import {AppBar, Toolbar,Grid,InputBase, IconButton,Badge,makeStyles} from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/Notifications';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';

 const useStyles=makeStyles(theme=>({
        root:{
            backgroundColor:"#fff",
            transform:"translate(0)"
        },
        searchInput:{
            opacity:"0.6",
            padding:"0 8px" ,
            fontSize:"0.8rem",
            '&:hover': {
                backgroundColor:"#f2f2f2"
            },
            '& .MuiSvgIcon-root':{
                marginRight:theme.spacing(1)
            }
        }
    })) ;
const Header = () => {
    const classes=useStyles() ;
    return (
        <AppBar position="static" className={classes.root}>
            <Toolbar>
              <Grid container alignItems="center">
                    <Grid item >
                        <InputBase placeholder="search topic" startAdornment={<SearchIcon fontSize="small"/>} className={classes.searchInput}/>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item >
                        <IconButton >
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsNoneIcon />
                            </Badge>
                        </IconButton>
                        <IconButton >
                        <Badge badgeContent={3} color="primary">
                                <ChatBubbleOutlineIcon />
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge color="error">
                                <PowerSettingsNewIcon />
                            </Badge>
                        </IconButton>
                    </Grid>
               </Grid>
            </Toolbar>
        </AppBar>
    )
}

export default Header
