import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@material-ui/core";
import { ContactMail, Password, VerifiedUserOutlined, ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import Coupon from "../../model/coupon";
import globals from "../../Util/Globals";
import notify from "../../Util/Notify";

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

function UpdtaeCoupon(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();
    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        try{
        const response = await axios.put<formable>(globals.company.updateCoupon,data);
        console.log(response);
        notify.success("coupon update");
        }catch{
            notify.error("unsuccessfully");

        }

    }

     return (
        <div className="login BoxSolid">
            <form onSubmit={handleSubmit(send)}>
            <Typography variant="h4" className="HeadLine">Updtae Coupon</Typography><hr/>
            <ContactMail style={fieldDesign}/>
            <ViewAgenda style={fieldDesign}/>
                <TextField type="number" label="id " variant="outlined" {...register("id",{min:1,required:true})}/>
                <ViewAgenda style={fieldDesign}/>
                <TextField type="number" label="companyId " variant="outlined" {...register("companyId",{min:1,required:true})}/><br/>
                <TextField type="string"label="category" variant="outlined" {...register("category",{required:true})}/>
                {errors.category && "You must give coupon category"}
                <Password style={fieldDesign}/>
                <TextField  type="string" label="description" variant="outlined" {...register("description",{required:true})}/>
                <br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField type="string" label="end Date" variant="outlined" {...register("endDate",{required:true})}/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField type="string" label="start Date" variant="outlined" {...register("startDate",{required:true})}/>
                <br/>
                <ViewAgenda style={fieldDesign}/>
                <TextField label="price" type="number" variant="outlined" {...register("price",{min:1,required:true})}/>
                {errors.id && "You must give coupon price"}
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField label="amount" type="number" variant="outlined" {...register("amount",{min:1,required:true})}/>
                {errors.id && "You must give coupon amount"}
                <br/>
                <ViewAgenda style={fieldDesign}/>
                <TextField type="string" label="image " variant="outlined" {...register("image",{required:true})}/><br/>
                <ViewAgenda style={fieldDesign}/>
                <TextField type="string" label="title " variant="outlined" {...register("title",{required:true})}/><br/>
                <Checkbox/>
                <label>cancel</label>
                <button>update</button>
            </form>

            </div>
        );
    }
    
    
export default UpdtaeCoupon;