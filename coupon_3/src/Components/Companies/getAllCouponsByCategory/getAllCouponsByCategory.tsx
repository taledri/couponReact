import { Typography, TextField, ButtonGroup, Button, MenuItem, Select } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Company from "../../model/company";
import Coupon from "../../model/coupon";
import SingleCoupon from "../../model/singleCoupon";
import globals from "../../Util/Globals";
import notify from "../../Util/Notify";
import enumCategory from "../enumCategory/enumCategory";

interface formable{
    category:string;
}

function GetCouponByCategory(): JSX.Element {
        const fieldDesign = {fontSize:40, margin:10};
        const [category, setCategory] = useState<enumCategory>();
        const [cusCoup,setCusCoup] = useState<Coupon[]>([]);
        const {register,handleSubmit,formState:{errors}} = useForm<Coupon>();
        async function send(coupon:Coupon){
            try{
            const response = await axios.get(globals.company.getAllCouponByCategory+coupon.category);
            console.log("jkgjgjhg",response.data);
            setCusCoup(response.data);
            console.log(coupon);
            if(response.data.length){
                notify.success("There is a Coupon with that category");
            }
            else{notify.error("coupons are empty") }
        } catch {
            notify.error("coupons are empty")  
        }
    }
      
            return (
                <div className="login BoxSolid">
                 {cusCoup.map (item => <SingleCoupon key= {item.id} myCoupon={item}/>)}
                    <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Get Coupon by category</Typography><hr/>
                <ViewAgenda style={fieldDesign}/>
                <TextField type="string" variant="outlined"label="chose category " {...register("category",{required:true})} />
                <br/>{errors.category && "You must give  category"}
            options:<br/>ELECTRICITY<br/>FOOD<br/>PETS<br/>TOURISM<br/>OUTDOOR<br/>VACATION<br/>PHOTORESTAURANTS <br/>
                <button >get</button> 
                </form>
               

                </div>
        );
    }
    export default GetCouponByCategory;