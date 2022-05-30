import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Customer from "../../../model/customer";
import notify from "../../../Util/Notify";

interface formable{
    id:Number;
}
function GetOneCustomer(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
   const[getCustomer,setCustomer] = useState<Customer>();
    const {register,handleSubmit,formState:{errors}} = useForm<Customer>();
    const send:SubmitHandler<Customer> = async (data)=>{
        console.log(data);
        try{
        const url = "http://localhost:8080/admin/getOneCustomer/"+data.id;
        const response = await axios.get<Customer>(url);
        console.log(response);
        notify.success("There is a customer with that id.");
    } catch {
        notify.error("There is NO customer with that id.")
    }
}

    
            return (
               
                <div className="login BoxSolid">
                         <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">get one Customer</Typography><hr/>
                <ViewAgenda style={fieldDesign}/>
                <TextField type="number"  variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give id customer"}
                <br/><br/>
                {
                    

                }

                <ButtonGroup variant="contained" fullWidth>
                    <button>get</button>
                </ButtonGroup>
                </form>
                </div>
                
        );
    }
    
    
    export default GetOneCustomer;