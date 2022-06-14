import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Customer from "../../../model/customer";
import globals from "../../../Util/Globals";
import notify from "../../../Util/Notify";

interface formable{
    id:Number;
}
function GetOneCustomer(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const [customer,setCustomer] = useState<Customer>(new Customer());
    const [customerId,setCustomerId] = useState(0);
    const {register,handleSubmit,formState:{errors}} = useForm<Customer>();
    const send:SubmitHandler<Customer> = async (data)=>{
        console.log(data);
        try{
            const response = await axios.get<Customer>(globals.admin.getOneCustomer+data.id);
            console.log(response.data);
            setCustomer(response.data);
            console.log(customer);
            notify.success("There is a customer with that id.");
        } catch {
            notify.error("There is NO customer with that id.")
        }
    }
        const customerUpdate = (args:SyntheticEvent)=>{
            let custId =Number( (args.target as HTMLInputElement).value);
            setCustomerId(custId);
           
        }

    return (
        
        <div className="login BoxSolid">
                    <form onSubmit={handleSubmit(send)}>
        <Typography variant="h4" className="HeadLine">get one Customer</Typography><hr/>
        <ViewAgenda style={fieldDesign}/>
        <TextField type="number"  variant="outlined" {...register("id",{min:1,required:true})} onClick={customerUpdate}/>
        <br/>{errors.id && "You must give id customer"}
        <br/><br/>
            <button>get</button>
        
        </form>
        <div className="BoxSolid">
              EMAIL:       {customer?.id>0 && customer?.email}<br/>
              First Name:  {customer?.id>0 && customer?.firstName}<br/>
              Last Name:   {customer?.id>0 && customer?.lastName}<br/>
        </div>
        </div>
        
    );
 
    }
    
 export default GetOneCustomer;