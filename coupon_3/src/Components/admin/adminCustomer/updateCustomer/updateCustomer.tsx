import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@material-ui/core";
import { ContactMail, Password, VerifiedUserOutlined, ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Customer from "../../../model/customer";
import globals from "../../../Util/Globals";
import notify from "../../../Util/Notify";

interface formable{
    email:string;
    id:Number;
    firstName:string;
    lastName:string;
    password:string;
}

function UpdtaeCustomer(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();
    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        try{
        const response = await axios.put<formable>(globals.admin.updateCustomer,data);
        console.log(response);
        notify.success("customer update ")
    } catch {
        notify.error("you can not update id.")
    }
    }
        return (
            <div className="login BoxSolid">
                <form onSubmit={handleSubmit(send)}>
            <Typography variant="h4" className="HeadLine">update Customer</Typography><hr/>
                <ContactMail style={fieldDesign}/>
                <TextField label="email" variant="outlined" {...register("email",{required:true})}/>
                <br/>
                <div >{errors.email && "You must give user email"}</div>
                <br/>
                <Password style={fieldDesign}/>
                <TextField  type="password" label="password" variant="outlined" {...register("password",{required:true})}/>
                <br/><br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField  label="first Name" variant="outlined" {...register("firstName",{required:true})}/>
                <br/><br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField  label="last Name" variant="outlined" {...register("lastName",{required:true})}/>
                <br/><br/>
                <ViewAgenda style={fieldDesign}/>
                <TextField type="number" variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give id company"}
                
                <Checkbox/>
                <label>cancel</label>
                
                <button>update</button>
            </form>

            </div>
        );
    }
    
    
export default UpdtaeCustomer;