import React from 'react' ;
import {FormControl,FormLabel,RadioGroup as MuiRadioGroup,FormControlLabel,Radio} from '@material-ui/core'  

const RadioGroup = (props) => {
    const {name,label,value,onChange,items}=props ;
    return (
        <FormControl>
                    <FormLabel>
                                {label}
                    </FormLabel>
                    <MuiRadioGroup row name={name} value={value} onChange={onChange}>
                                    {items.map((item,index)=>(
                                        <FormControlLabel value={item.id} control={<Radio />} label={item.title} key={index}/>
                                    ))}
                    </MuiRadioGroup>
        </FormControl>
    )
}

export default RadioGroup
