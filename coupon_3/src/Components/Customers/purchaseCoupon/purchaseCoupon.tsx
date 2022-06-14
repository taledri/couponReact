import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import axios from "axios";
import { Component } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Coupon from "../../model/coupon";
import globals from "../../Util/Globals";
import notify from "../../Util/Notify";

    function CouponPurchase(): JSX.Element {
        const {register, handleSubmit, formState:{errors}} = useForm<Coupon>();
        //for sending the browser to specific location 
        //const history = useHistory();
    
        async function send(coupon:Coupon){
            try{
                console.log("url", globals.customer.purchaseCoupon);
                console.log("coupon id", coupon.id)
               await axios.post<Coupon>(globals.customer.purchaseCoupon+coupon.id
             /* {   {data: {
                    id: coupon.id
                }
                }
            }*/
                )
                .then(response => {
                    console.log(response.data)
                    notify.success("* Coupon successfully purchased!")
                })
                
            }catch{
                //console.log(reponse.data)
                   notify.error("unsuccessfully");
                }
            }
        
           

    
    return (
    <div className="CouponPurchase Box">  
            <h2>Coupon Purchase</h2>
            <form onSubmit={handleSubmit(send)}>
                <input type="number" aria-label="id" placeholder="Coupon's ID" {...register("id",{
                   min:1,required:true })}/>
                   <div>{errors.id && "Please enter coupon id number."}</div>
               <span><br/>{errors.id?.message}</span>
               <br/><br/>
                <button>Purchase</button>
            </form>
        </div>    
    );
    }




export default CouponPurchase;