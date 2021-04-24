import React from 'react'
import {FormControl,InputLabel,Select as MuiSelect,MenuItem, FormHelperText} from '@material-ui/core' ;

const Select = (props) => { 
    const {name,label,value,error=null,onChange,options}=props ;
    return (
        <FormControl variant="outlined" 
        {...(error && {error:true})}
        >
           <InputLabel>{label}</InputLabel>
           <MuiSelect
                name={name} 
                label={label}
                value={value}
                onChange={onChange}
           >
            <MenuItem value="">none</MenuItem>
           {
               options.map(
                   option=>(
                       <MenuItem value={option.id} key={option.id}>{option.title}</MenuItem>
                   )
               )
           }
           </MuiSelect>
           {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>

    )
}

export default Select
