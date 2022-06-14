import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import coupon from "../../model/coupon";
import Coupon from "../../model/coupon";
import SingleCoupon from "../../model/singleCoupon";
import globals from "../../Util/Globals";
import notify from "../../Util/Notify";



function GetCouponByPrice(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const [cusCoup,setCusCoup] = useState<Coupon[]>([]);
        const {register,handleSubmit,formState:{errors}} = useForm<Coupon>();
        async function send(coupon:Coupon){
            try{
            const response = await axios.get(globals.company.getAllCouponByPrice+coupon.price);
            console.log(response.data);
            setCusCoup(response.data);
            console.log(coupon);
            notify.success("There is a Coupons");            
        }
        catch{
            notify.error("There is NO coupons up to  that price.")


        }
    }
   
            return (
                <div className="login BoxSolid">
                {cusCoup.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
                    <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Get Coupons up to price</Typography><hr/>
                <ViewAgenda style={fieldDesign}/>
               <TextField type="string" variant="outlined"label="enter max price " {...register("price",{required:true})} />
                <br/>{errors.price && "You must give  max Price"}
                <br/><br/> 
                <button>get</button>
                </form>


                </div>
        );
    }
    export default GetCouponByPrice;