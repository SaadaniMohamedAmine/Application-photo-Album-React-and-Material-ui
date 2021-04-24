import React from 'react' ;
import '../App/App.css' ;
import {makeStyles} from '@material-ui/core'

const useStyles=makeStyles({
sideMenu:{
    display:"flex" ,
    flexDirection: "column",
    position: "absolute",
    left:"0" ,
    top:"0" ,
    width:"200px" ,
    height:"100%" ,
    background:"#233053"
}
})


const SideMenu = () => {
    const classes=useStyles() ;
    return (
        <div className={classes.sideMenu}>
           
        </div>
    )
}

export default SideMenu
