import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface formable{
    maxPrice:Number;
}

function GetCustomerCouponByCategory(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();
    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        const url = "http://localhost:8080/customer/getCustomerCouponByMaxPrice/"+data.maxPrice;
        const response = await axios.get<formable>(url);
        console.log(response);
    }
            return (
                <div className="login BoxSolid">
                      <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Get Customer Coupon up to price</Typography><hr/>
                <ViewAgenda style={fieldDesign}/>
               <TextField type="string" variant="outlined"label="enter max price " {...register("maxPrice",{required:true})}/>
                <br/>{errors.maxPrice && "You must give coupon max Price"}
                <br/><br/>
                <button >get</button> 
               
                </form>
                </div>
        );
    }
    export default GetCustomerCouponByCategory;