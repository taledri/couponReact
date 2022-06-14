
import axios from "axios";
import { Key, ReactChild, ReactFragment, ReactPortal, useState } from "react";
import Coupon from "../../model/coupon";
import globals from "../../Util/Globals";
import notify from "../../Util/Notify";

function GetCustomerCoupon(): JSX.Element {
    const [coupons,setCoupon] = useState<Coupon[]>([]);
   const getCustomerCoupon=()=>{
        try{
        axios.get<Coupon[]>(globals.customer.getCustomerCoupon)
        .then(response=>{
            setCoupon(response.data);
            console.log(coupons);
        notify.success("The coupons");
        })
    } catch {
        notify.error("coupons are empty")
    }
   }

         return (
            <div className="login BoxSolid">
            
            <h1>customer Coupons List</h1>
            <button onClick={getCustomerCoupon}>get customer Coupons List </button>
            <br></br>
            {coupons.map((coupon: { id: Key | null | undefined; category: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; description: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; endDate: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; })=><span key={coupon.id}>
                <div className="Box">
                    {coupon.category}<hr/>
                    {coupon.description}<br/>
                    {coupon.endDate}<br/>
                </div>
            </span>)}
               
                
            </div>
        );
    }
    
    
    export default GetCustomerCoupon;