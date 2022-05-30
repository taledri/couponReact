import { Button, ButtonGroup, Checkbox, TextField, Typography } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface formable{
    id: number;
}


function DeleteCoupon(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();
    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        const url = "http://localhost:8080/company/deleteCoupon/"+data.id;
        const response = await axios.delete<formable>(url);
        console.log(response);
    }

    return (
        <div className="login BoxSolid">
            <form onSubmit={handleSubmit(send)}>
             <Typography variant="h4" className="HeadLine">delete Coupon</Typography><hr/>
             <ViewAgenda style={fieldDesign}/>
                <TextField label="enter id" type="number" variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give coupon id"}
                <br/><br/>
    
                <button>send</button>
            </form>
                
                </div>
        );
    }
    
    
    export default DeleteCoupon;



