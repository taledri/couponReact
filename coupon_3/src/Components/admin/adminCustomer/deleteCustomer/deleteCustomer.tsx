import { Button, ButtonGroup, Checkbox, TextField, Typography } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import globals from "../../../Util/Globals";
import notify from "../../../Util/Notify";

interface formable{
    id:Number;
}


function DeleteCustomer(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();
    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        try{
        const response = await axios.delete<formable>(globals.admin.deleteCustomer+data.id);
        console.log(response);
        notify.success("custome deleted")
    } catch {
        notify.error("id not found")
    }
    }
        return (
            <div className="login BoxSolid">
                <form onSubmit={handleSubmit(send)}>
             <Typography variant="h4" className="HeadLine">delete Customer</Typography><hr/>
             <ViewAgenda style={fieldDesign}/>
                <TextField type="number" variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give id company"}
                <br/><br/>
    
                <button>send</button>

                </form>
                </div>
        );
    }
    
    
    export default DeleteCustomer;



