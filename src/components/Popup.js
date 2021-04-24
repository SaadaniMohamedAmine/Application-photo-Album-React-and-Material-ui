
import React from 'react' 
import {Dialog,DialogTitle,DialogContent,makeStyles,Typography} from '@material-ui/core'
import Controls from './controls/Controls'
import CloseIcon from '@material-ui/icons/Close';

const useStyles=makeStyles(theme=>({
        dialogWrapper:{
            padding:theme.spacing(2) ,
            position:'absolute' ,
            top:theme.spacing(5)
        },
        dialogTitle:{ 
            padding:'0px'
        }
}))

const Popup=(props)=>{
    const classes=useStyles() ;
    const {title,children,openPopup,setOpenPopup}=props ;
    return (
        <Dialog open={openPopup} maxWidth="md" classes={{paper:classes.dialogWrapper}}>
            <DialogTitle  className={classes.dialogTitle}>
                <div style={{display:"Flex",justifyContent:"spaceBetween"}}>
                   <Typography variant="h6" component='div' style={{flexGrow:'1'}}>
                        {title}
                   </Typography>
                   <Controls.ActionButton text="X" color='secondary' onClick={()=>setOpenPopup(false)}> 
                        <CloseIcon />
                   </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent>
               {children}
            </DialogContent>
        </Dialog>
    )
}

export default Popup ;