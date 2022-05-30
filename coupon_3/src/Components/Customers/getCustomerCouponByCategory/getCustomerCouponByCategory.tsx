import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Coupon from "../../model/coupon";
import notify from "../../Util/Notify";

interface formable{
    category:string;
}
function GetCustomerCouponByCategory(): JSX.Element {
    const [category,setCategory] = useState("");
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();
    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        const url = "http://localhost:8080/customer/getCustomerCouponByCategory/"+data.category;
        const response = await axios.get<formable>(url);
        console.log(response);
    }
            return (
                <div className="login BoxSolid">
                    <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Get Customer Coupon by category</Typography><hr/>
                <ViewAgenda style={fieldDesign}/>
               <TextField type="string" variant="outlined"label="chose category " {...register("category",{required:true})}/>
                <br/>{errors.category && "You must give coupon category"}
                <br/><br/>
                
                <button >get</button> 
               
                </form>
                </div>
        );
            
    }

    export default GetCustomerCouponByCategory;