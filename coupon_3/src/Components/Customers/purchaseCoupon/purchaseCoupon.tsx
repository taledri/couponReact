import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import Coupon from "../../model/coupon";
import notify from "../../Util/Notify";
{/*function CouponPurchase(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<Coupon>();
    const send:SubmitHandler<Coupon> = async (data)=>{
        console.log(data);
        const url = "http://localhost:8080/customer/purchaseCoupon";
        const response = await axios.post<Coupon>(url,data);
        console.log(response);
    
    }*/}
    function CouponPurchase(): JSX.Element {
        const {register, handleSubmit, formState:{errors}} = useForm<Coupon>();
        //for sending the browser to specific location 
        const history = useHistory();
    
        async function send(coupon:Coupon){
            await axios.post<Coupon>("http://localhost:8080/customer/purchaseCoupon"+coupon.id)
                .then(response => {
                    console.log(response.data)
                    notify.success("* Coupon successfully purchased!")
                })
                .catch(error => {
                    console.log(error.response.data.message);
                   notify.error(error.response.data.message);
                })
            // try{
            //     const response = await AxiosRequest.post<CouponData>("coupons/purchaseCoupon/"+coupon.id);
            //     console.log(response.data);
            //     notify.success("The coupon was successfully purchased!");
    
            // } catch {
            //     notify.error("The coupon was NOT purchased.");
            // }
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