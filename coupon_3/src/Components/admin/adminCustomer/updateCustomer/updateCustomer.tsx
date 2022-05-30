import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@material-ui/core";
import { ContactMail, Password, VerifiedUserOutlined, ViewAgenda } from "@mui/icons-material";
import { useForm } from "react-hook-form";

interface formable{
    email:string;
    id:Number;
    name:string;
    password:string;
}

function UpdtaeCustomer(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();

        return (
            <div className="login BoxSolid">
            <Typography variant="h4" className="HeadLine">update Customer</Typography><hr/>
                <ContactMail style={fieldDesign}/>
                <TextField label="email" variant="outlined" {...register("email",{required:true})}/>
                <br/>
                <div >{errors.email && "You must give user email"}</div>
                <br/><br/>
                <Password style={fieldDesign}/>
                <TextField  type="password" label="password" variant="outlined" {...register("password",{required:true})}/>
                <br/><br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField  label="name" variant="outlined" {...register("name",{required:true})}/>
                <br/><br/>
                <ViewAgenda style={fieldDesign}/>
                <TextField type="number" variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give id company"}
                <br/><br/>
                <Checkbox/>
                <label>cancel</label>
                <br/>
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">update</Button>
                </ButtonGroup>

            </div>
        );
    }
    
    
export default UpdtaeCustomer;