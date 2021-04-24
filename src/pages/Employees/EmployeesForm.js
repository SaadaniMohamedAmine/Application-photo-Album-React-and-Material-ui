import React,{useEffect} from 'react' ;
import {Grid } from '@material-ui/core'  ;
import {useForm,Form} from '../../components/useForm' ;
import Controls from '../../components/controls/Controls' ; 
import  * as employeeService  from "../../services/EmployeeService";


const initialFValues={
    id:0 ,
    fullName:"",
    email:"" ,
    mobile:0,
    city:"" ,
    gender:"male" ,
    departmentId:"",
    hireDate:new Date(),
    isPermanent:false 
}

const genderItems=[
    {id:"male",title:"male"},
    {id:"female",title:"female"},
    {id:"other",title:"other"}
]

const EmployeesForm = (props) => {
    const {addOrEdit,recordForEdit}=props ;
    const validate=(fieldValues=values)=>{
        let temp={...errors} ;
        if('fullName' in fieldValues)
            temp.fullName=fieldValues.fullName?"":"This field is required !" ;
        if('email' in fieldValues)
            temp.email=(/$^|.+@.+..+/).test(fieldValues.email)?"":"Email is not valid !" ;
            if('mobile' in fieldValues)    
            temp.mobile=fieldValues.mobile.length>9?"":"Minimum 10 numbers are required!" ;
        if('departmentId' in fieldValues)
            temp.departmentId=fieldValues.departmentId.length!=0?"":"This field is required !" ;
            setErrors({
                ...temp
            }) ;
            if(fieldValues==values)
            return Object.values(temp).every(x=>x==="") ;
        }
    
   const {
       values,
       setValues,
       errors,
       setErrors,
       handleInputChange,
       resetForm
   }=useForm(initialFValues,true,validate) ;
   const handleSubmit=(e)=>{
       e.preventDefault() ;
      if(validate())
       {
            addOrEdit(values,resetForm)
    }
   } ;
   useEffect(()=>{
        if(recordForEdit!=null) {
            setValues({...recordForEdit})
        }
   },[recordForEdit])
    return (
        
            <Form onSubmit={handleSubmit}>
                 <Grid container>
                <Grid item xs={6}>
                    <Controls.Input   label="Full Name" name="fullName" value={values.fullName} onChange={handleInputChange}  error={errors.fullName} />
                    <Controls.Input variant="outlined" label="E-mail"  name="email"  value={values.email} onChange={handleInputChange} error={errors.email} />
                    <Controls.Input variant="outlined" label="Phone number"  name="mobile"  value={values.mobile} onChange={handleInputChange} error={errors.mobile}/>
                    <Controls.Input variant="outlined" label="City"  name="city"  value={values.city} onChange={handleInputChange}/>
                </Grid>
                <Grid item xs={6}>
                    <Controls.RadioGroup
                       label="gender"
                       name="gender" 
                       value={values.gender} 
                       onChange={handleInputChange}
                       items={genderItems}
                    />
                    <Controls.Select 
                    name="departmentId" 
                    label="Department" 
                    value={values.departmentId}
                    onChange={handleInputChange}
                    options={employeeService.getDepartmentCollection()}
                    error={errors.departmentId}
                    />
                    <Controls.DatePicker 
                        name=" hireDate"
                        label="Hire date"
                        value={values.hireDate}
                        onChange={handleInputChange}
                    />
                    <Controls.CheckBox 
                       name="isPermanent"
                       value={values.isPermanent}
                       label="Permanent Employee"
                       onChange={handleInputChange}
                    />
                    <div>
                        <Controls.Button 
                            type="submit"
                            text="Submit"
                        />
                        <Controls.Button
                            text="Reset"
                            color='default'
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
            </Form>
           
        
    )
}

export default EmployeesForm
 