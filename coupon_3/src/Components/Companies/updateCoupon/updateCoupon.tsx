import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@material-ui/core";
import { ContactMail, Password, VerifiedUserOutlined, ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

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
        const url = "http://localhost:8080/company/updateCoupon";
        const response = await axios.put<formable>(url,data);
        console.log(response);
    }

     return (
        <div className="login BoxSolid">
            <form onSubmit={handleSubmit(send)}>
            <Typography variant="h4" className="HeadLine">Updtae Coupon</Typography><hr/>
            <ContactMail style={fieldDesign}/>
                <TextField type="string"label="category" variant="outlined" {...register("category",{required:true})}/>
                <div >{errors.category && "You must give coupon category"}</div>
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

                <Checkbox/>
                <label>cancel</label>
                <br/>
                <button>update</button>
            </form>

            </div>
        );
    }
    
    
export default UpdtaeCoupon;