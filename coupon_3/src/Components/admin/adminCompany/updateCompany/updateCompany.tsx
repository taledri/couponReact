import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@material-ui/core";
import { ContactMail, Password, VerifiedUserOutlined, ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Company from "../../../model/company";
import Coupon from "../../../model/coupon";
import globals from "../../../Util/Globals";
import notify from "../../../Util/Notify";

interface formable{
    email:string;
    id:Number;
    name:string;
    password:string;
}

function UpdtaeCompany(): JSX.Element {
     const fieldDesign = {fontSize:40, margin:10};
     const {register,handleSubmit,formState:{errors}} = useForm<Company>();
     const send:SubmitHandler<Company> = async (data)=>{
        console.log(data);
        try{
            console.log("jjjj");
        const response = await axios.put<Company>(globals.admin.updateCompany,data);
        console.log(response);
        notify.success("company update");
        }catch{
            notify.error("failed")

        }

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
                <TextField type="number" label="companyId"  variant="outlined" {...register("id",{min:1,required:true})}/>
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