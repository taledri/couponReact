import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Coupon from "../../model/coupon";
import Customer from "../../model/customer";
import SingleCoupon from "../../model/singleCoupon";
import globals from "../../Util/Globals";
import notify from "../../Util/Notify";



function GetCustomerCouponByCategory(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const [cusCoup,setCusCoup] = useState<Coupon[]>([]);
    const {register,handleSubmit,formState:{errors}} = useForm<Coupon>();
    async function send(coupon:Coupon){
        try{
            //lecturer is in json mode, ready to send.....      
            const response = await axios.get(globals.customer.getCustomerCouponByMaxPrice+coupon.price);
            const myResponse = response.data;
            setCusCoup(myResponse);

            notify.success("that coupons");
        } catch {
            notify.error("* Value must be positive. or coupons empty");
        }
    }
   
            return (
                <div className="login BoxSolid">
                     {cusCoup.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
                      <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Get Customer Coupon up to price</Typography><hr/>
                <ViewAgenda style={fieldDesign}/>
               <TextField type="string" variant="outlined"label="enter max price " {...register("price",{required:true})}/>
                <br/>{errors.price && "You must give coupon max Price"}
                <br/><br/>
                <button >get</button> 
               
                </form>
                </div>
        );
    }
    export default GetCustomerCouponByCategory;