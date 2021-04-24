import React,{useState} from 'react'
import {makeStyles} from '@material-ui/core'

 export const useForm = (initialFValues,validateOnChange=false,validate) => {
    const [values,setValues]=useState(initialFValues) ;
    const [errors,setErrors]=useState({}) ;
    const handleInputChange=(e)=>{
        setValues({
            ...values ,
            [e.target.name]:e.target.value
        })
        if(validateOnChange) {
            validate({[e.target.name]:e.target.value})
        }
    } ;
    const resetForm=()=>{
        setValues(initialFValues) ;
        setErrors({})
    } 
    return {
       values,
       setValues,
       errors,
       setErrors,
       handleInputChange,
       resetForm 
    }
}



const useStyles=makeStyles(theme=>({
    root:{
        '& .MuiFormControl-root': {
            width:"80%" ,
            margin:theme.spacing(1) 
        }
    }
}));

export const Form = (props) => {
    const classes=useStyles() ;
    const {children,...other}=props ;
    return (
        <form className={classes.root} autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}

