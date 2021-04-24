import React from 'react' ;
import './App.css' ;
import SideMenu from '../components/SideMenu' ;
import { makeStyles,CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from '../components/Header' ;
import Employees from '../pages/Employees/Employees' ;

const theme=createMuiTheme({
    palette:{
        primary:{
            main:"#333996",
            light:"#3c44b126"
        },
        secondary:{
            main:"#f83245",
            light:"f8324526"
        },
        background:{
            default:"#f4f5fd"
        }
    },
    shape:{
        //borderRadius:"12px"
    },
    props:{
        MuiIconButton:{
            disableRipple:true
        }
    }
})

const useStyles=makeStyles({
    appMain:{
        paddingLeft:"200px",
        width:"100%",
        
    }
})

const App = () => { ;
    const classes=useStyles() ;
    return (
        <>
        <ThemeProvider theme={theme}>
            <SideMenu />
            <div className={classes.appMain}>
                <Header/>
                <Employees />
            </div>
            <CssBaseline />
        </ThemeProvider>
        </>
    )
}

export default App
