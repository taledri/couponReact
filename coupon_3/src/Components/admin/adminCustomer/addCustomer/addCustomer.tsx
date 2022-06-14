import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@material-ui/core";
import { ContactMail, Password, VerifiedUserOutlined, ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import globals from "../../../Util/Globals";
import notify from "../../../Util/Notify";

interface formable{
    email:string;
    id:Number;
    firstName:string;
   lastName:string;
    password:string;
}

function AddCustomer(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:11};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();
    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        try{
        const response = await axios.post<formable>(globals.admin.addCustomer,data);
        console.log(response);
        notify.success("customer add")
    } catch {
        notify.error("customer email exits")
    }

    }

      return (
         <div className="login BoxSolid">
             <form onSubmit={handleSubmit(send)}>
            <Typography variant="h4" className="HeadLine">add Customer</Typography><hr/>
                <ContactMail style={fieldDesign}/>
                <TextField label="email" variant="outlined" {...register("email",{required:true})}/>
                <br/>
                <div >{errors.email && "You must give user email"}</div>
                <br/>
                <Password style={fieldDesign}/>
                <TextField  type="password" label="password" variant="outlined" {...register("password",{required:true})}/>
                <br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField  label="first_name" variant="outlined" {...register("firstName",{required:true})}/>
                <br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField  label="last_name" variant="outlined" {...register("lastName",{required:true})}/>
                <br/>
                <ViewAgenda style={fieldDesign}/>
                <TextField label="id" type="number" variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give id company"}
                <Checkbox/>
                <label>remember me</label>
                <Checkbox/>
                <label>cancel</label>
                <br/>
                <button>add</button><br/>
                </form>

            </div>
        );
    }
    
    
export default AddCustomer;
