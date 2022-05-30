import {useForm,SubmitHandler} from "react-hook-form";
import { Typography, TextField, Checkbox, ButtonGroup, Button, Select } from "@material-ui/core";
import { Password } from "@mui/icons-material";
import { ContactMail, VerifiedUserOutlined, ViewAgenda } from "@material-ui/icons";
import axios from "axios";
import notify from "../Util/Notify";
import { useHistory } from "react-router-dom";
import model from "../model/model";
import clientType from "./Enums/clientType";
import jwt_decode from "jwt-decode"


function Login(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<model>();
    //const send:SubmitHandler<formable> = async (data)=>{
       // console.log(data);
       const history = useHistory();
       async function send(credential: model) {
        switch (credential.clientType){
            case clientType.ADMINISTRATOR:
                try{
                    console.log(credential);
                    const response = await axios.post<string>("http://localhost:8080/admin/adminLogin",credential);
                    console.log(response.data);
                    localStorage.setItem("JWT",response.data)
                    localStorage.setItem("user","admin");
                    const decoded =JSON.parse(JSON.stringify( jwt_decode(response.data)));
                    const userInfo = {email:decoded.sub,password:"",clientType:decoded.userType, token:response.data,userId:decoded.id,name:decoded.name}
                    console.log(userInfo);
                    notify.success("* Admin login successful!");
                    history.push("/adminPage");
                    

                }catch(err){
                    notify.error(" Login failed. You either typed wrong details, or this account does not exist.");
                    console.log(err);

                } 
                    
        break;
        case clientType.COMPANY:
            try{
                console.log(credential);
                const response = await axios.post<string>("http://localhost:8080/company/companyLogin",credential);
                console.log(response.data);
                localStorage.setItem("JWT",response.data)
                localStorage.setItem("user","company");
                const decoded =JSON.parse(JSON.stringify( jwt_decode(response.data)));
                const userInfo = {email:decoded.sub,password:"",clientType:decoded.userType, token:response.data,userId:decoded.id,name:decoded.name}
                console.log(userInfo);
                notify.success("company login successful!");
                history.push("/companyPage");
             

            }catch(err){
                notify.error(" Login failed. You either typed wrong details, or this account does not exist.");
                console.log(err);
            }     
    break;
    case clientType.CUSTOMER:
        try{
            console.log(credential);
            const response = await axios.post<string>("http://localhost:8080/customer/customerLogin",credential);
            console.log(response.data);
            localStorage.setItem("JWT",response.data)
            localStorage.setItem("user","customer");
            const decoded =JSON.parse(JSON.stringify( jwt_decode(response.data)));
            const userInfo = {email:decoded.sub,password:"",clientType:decoded.userType, token:response.data,userId:decoded.id,name:decoded.name}
            console.log(userInfo);
            notify.success("* customer login successful!");
            history.push("/customerPage");

        }catch(err){
            notify.error("* Login failed. You either typed wrong details, or this account does not exist.");
            console.log(err);
        }     
break;
        default:
            history.push("/home");
            break;
      
    }
    
}

    return (
        <div className="login BoxSolid">
             <form onSubmit={handleSubmit(send)}>
            <Typography variant="h4" className="HeadLine">Login Screen</Typography><hr/>
                <ContactMail style={fieldDesign}/>
                <TextField label="email" variant="outlined" {...register("email",{required:true})}/>
                <br/>
                <div >{errors.email && "You must give user email"}</div>
                <br/>
                <Password style={fieldDesign}/>
                <TextField  type="password" label="password" variant="outlined" {...register("password",{required:true})}/>
                <div >{errors.password && "You must give user password"}</div>
                <br/><br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <select name= "select1">
                   <option value= "">client Type</option>
                   <option value= "1">admin </option>
                   <option value= "2">customer  </option>
                   <option value= "3">company </option>
                </select>
              <TextField  label="clientType" variant="outlined" {...register("clientType",{required:true})}/>
              <div >{errors.clientType && "You must give user clientType"}</div>
                <br/><br/>
                <Checkbox/>
                <label>Remmber me</label>
                <br/>
                <button >get</button> 
            
                </form>
            </div>
            );

    }
export default Login;

