import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import { render } from "@testing-library/react";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Coupon from "../../model/coupon";

interface formable{
     amount: number;
     category: string;
     companyId:number;
     description: string;
     endDate: string;
     id: number;
     image: string;
     price: number;
     startDate: string;
     title:string;
}
function GetCustomerCoupon(): JSX.Element {
    var coupons:Coupon[];
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();
    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        const url = "http://localhost:8080/customer/getCustomerCoupons";
        const response = await axios.get<formable[]>(url);
        console.log(response.data);
        
    }
         return (
            <div className="login BoxSolid">
                <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Get Customer Coupon</Typography><hr/>
            
                <br/><br/>
                <button >get</button>  
                </form>
                
            </div>
        );
    }
    
    
    export default GetCustomerCoupon;