import axios from "axios";
import { Key, ReactChild, ReactFragment, ReactPortal, useState } from "react";
import { useForm } from "react-hook-form/dist/useForm";
import Coupon from "../../model/coupon";
import globals from "../../Util/Globals";
import notify from "../../Util/Notify";

function CompanyCouponsList(): JSX.Element {
    const[companyCouponsList,setCoupon] = useState<Coupon[]>([]);
    const getCoupons=()=>{
        try{
        axios.get<Coupon[]>(globals.company.getAllCoupon)
        .then(response=>{
            //console.log(response.data);
            setCoupon(response.data);
            console.log(companyCouponsList);
            notify.success("the coupons")
        })
    }catch{
        notify.error("coupons are empty")

        }
    }
    
    return (
        <div className="companyCouponsList">
			<h1>Company Coupons List</h1>
            <button onClick={getCoupons}>get Company Coupons List </button>
            <br></br>
            {companyCouponsList.map((coupon: { id: Key | null | undefined; category: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; description: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; endDate: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; })=><span key={coupon.id}>
                <div className="Box">
                    {coupon.category}<hr/>
                    {coupon.description}<br/>
                    {coupon.endDate}<br/>
                </div>
            </span>)}
    
        </div>
    );
}

export default CompanyCouponsList;

