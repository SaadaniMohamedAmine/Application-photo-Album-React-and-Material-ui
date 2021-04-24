import React,{useState} from 'react' ;
import EmployeesForm from './EmployeesForm'  ;
import PageHeader from '../../components/PageHeader' ;
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import {makeStyles, Paper,TableBody,TableRow,TableCell,Toolbar,InputAdornment } from '@material-ui/core' ;
import useTable from '../../components/useTable' ;
import * as employeeService from '../../services/EmployeeService' ;
import Controls from  '../../components/controls/Controls' ;
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add'
import Popup from '../../components/Popup' ;
import CloseIcon from '@material-ui/icons/Close' ;
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Notification from '../../components/Notification' ;
import ConfirmDialog from '../../components/ConfirmDialog' ;

const useStyles=makeStyles(theme=>({
    pageContent:{
        margin:"4px auto" ,
        padding:theme.spacing(1.5) ,
        width:"90%",
        
    },
    searchInput:{
        width:"75%"
    },
    newButton:{
        position:"absolute",
        right:"10px"
    }
})) ;
const headCells=[
    {id:"fullName",label:"Employee Name"},
    {id:"email",label:"Employee Email"},
    {id:"mobile",label:"Employee Mobile"},
    {id:"departmentId",label:"Department"},
    {id:"actions",label:"Actions",disableSorting:true},
]
const Employees = () => {
    const classes=useStyles() ;
    const [confirmDialog,setConfirmDialog]=useState({isOpe:false,title:"",subtitle:""}) ;
    const[recordForEdit,setRecordForEdit]=useState(null) ;
    const [records,setRecords]=useState(employeeService.getAllEmployees()) ;
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const [openPopup,setOpenPopup]=useState(false) ;
    const [notify,setNotify]=useState({isOpen:false,message:'',type:''}) ;
   const {
       TblContainer,
       TblHead,
       TblPagination,
       recordsAfterPagingAndSorting
   }= useTable(records,headCells,filterFn) ;
   const handleSearch = e => {
    let target = e.target;
    setFilterFn({
        fn: items => {
            if (target.value == "")
                return items;
            else
                return items.filter(x => x.fullName.toLowerCase().includes(target.value))
        }
    })
} ;
    const addOrEdit=(employee,resetForm)=>{
        if(employee.id==0) {
            employeeService.insertEmployee(employee) ;
        }
        else {
            employeeService.updateEmployee(employee)
            resetForm();
            setOpenPopup(false);
            setRecords(employeeService.getAllEmployees()) ;
            setRecordForEdit(null) ;
            setNotify({
                isOpen:true,
                message:"Submitted Successfully",
                type:"success"
            })
        }
       
    } ;
    const openInPopup=(item)=>{
        setRecordForEdit(item) ;
        setOpenPopup(true) ;
    };
    const onDelete=(id)=>{
        setConfirmDialog({
            ...confirmDialog,isOpen:false
        })
        employeeService.deleteEmployee(id) ;
        setRecords(employeeService.getAllEmployees()) ;
        setNotify({
            isOpen:true,
            message:"Delete Successfully",
            type:"Error"
        })
    }
    return (
        <>
        <PageHeader 
                    title="New Employee"
                    subtitle="Form design with validation"
                    icon={<PeopleOutlineIcon fontSize="large"/>}
                />
                <Paper className={classes.pageContent}>
                  <Toolbar>
                  <Controls.Input
                  className={classes.searchInput}
                        label="Search Employees"
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                    <Controls.Button 
                        text="Add New" 
                        variant='outlined' 
                        size="" color="" 
                        startIcon={<AddIcon />} 
                        className={classes.newButton}
                        onClick={()=>{setOpenPopup(true);setRecordForEdit(null) ;}}
                    />
                  </Toolbar>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map((record)=>(
                                    <TableRow key={record.id}>
                                        <TableCell>{record.fullName}</TableCell>
                                        <TableCell>{record.email}</TableCell>
                                        <TableCell>{record.mobile}</TableCell>
                                        <TableCell>{record.department}</TableCell>
                                        <TableCell>
                                            <Controls.ActionButton  color='primary'>
                                                <EditOutlinedIcon fontSize="small" onClick={()=>{openInPopup(record)}}/>
                                            </Controls.ActionButton>
                                            <Controls.ActionButton  
                                                color='secondary' 
                                                onClick={()=>{
                                                    setConfirmDialog({
                                                        isOpen:true,
                                                        title:"Are you sure to delete this record !",
                                                        subtitle:"You can't undo this operation",
                                                        onConfirm:()=>onDelete(record.id)
                                                    })
                                                    //onDelete(record.id)} ;
                                                }}
                                            >
                                                <CloseIcon fontSize="small" />
                                            </Controls.ActionButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </Paper>
                <Popup 
                    openPopup={openPopup} 
                    setOpenPopup={setOpenPopup}
                    title="Employee Form"
                >
                             <EmployeesForm 
                             addOrEdit={addOrEdit}
                             recordForEdit={recordForEdit}
                             />
                </Popup>
            <Notification notify={notify} setNotify={setNotify}/>
            <ConfirmDialog
               confirmDialog={confirmDialog}
               setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}

export default Employees
