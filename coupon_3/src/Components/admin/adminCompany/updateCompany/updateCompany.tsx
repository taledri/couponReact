import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@material-ui/core";
import { ContactMail, Password, VerifiedUserOutlined, ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface formable{
    email:string;
    id:Number;
    name:string;
    password:string;
}

function UpdtaeCompany(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();

    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        const url = "http://localhost:8080/admin/updateCompany";
        const response = await axios.put<formable>(url,data);
        console.log(response);
    }

    return (
    <div className="login BoxSolid">
        <form onSubmit={handleSubmit(send)}>
            <Typography variant="h4" className="HeadLine">update Company</Typography><hr/>
                <ContactMail style={fieldDesign}/>
                <TextField label="email" variant="outlined" {...register("email",{required:true})}/>
                <br/>
                <div >{errors.email && "You must give user email"}</div>
                <br/>
                <Password style={fieldDesign}/>
                <TextField  type="password" label="password" variant="outlined" {...register("password",{required:true})}/>
                <br/><br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField  label="name" variant="outlined" {...register("name",{required:true})}/>
                <br/><br/>
                <ViewAgenda style={fieldDesign}/>
                <TextField type="number" variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give id company"}{errors.id&&"There is already a company with that id!"}
                <Checkbox/>
                <label>cancel</label>
                <br/>
                <button>update</button>
            </form>
     
        </div>
        );
    }
    
    
export default UpdtaeCompany;