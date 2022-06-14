import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Coupon from "../../model/coupon";
import SingleCoupon from "../../model/singleCoupon";
import globals from "../../Util/Globals";
import notify from "../../Util/Notify";


function GetCustomerCouponByCategory(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const [cusCoup,setCusCoup] = useState<Coupon[]>([]);
    const {register,handleSubmit,formState:{errors}} = useForm<Coupon>();
    async function send(coupon:Coupon){
       try{
        const response = await axios.get(globals.customer.getCustomerCouponByCategory+coupon.category);
        console.log(response.data);
        setCusCoup(response.data);
        console.log(coupon);
        notify.success("There is a Coupon with that category");
    } catch {
        notify.error("coupons are empty")  
    }
}
            return (
                <div className="login BoxSolid">
                    {cusCoup.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}

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