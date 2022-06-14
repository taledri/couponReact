import { Typography, TextField, Checkbox, ButtonGroup, Button } from "@material-ui/core";
import { ContactMail, Password, VerifiedUserOutlined, ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
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

function AddCoupon(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();

    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        const response = await axios.post<formable>(globals.company.addCoupon,data);
        console.log(response);
        notify.success("coupon add")
    }
        return (
            <div className="login BoxSolid">
             <form onSubmit={handleSubmit(send)}>
            <Typography variant="h4" className="HeadLine">add Coupon</Typography><hr/>
                <ContactMail style={fieldDesign}/>
                <TextField type="string"label="category" variant="outlined" {...register("category",{required:true})}/>
                <div >{errors.category && "You must give coupon category"}</div>
                <Password style={fieldDesign}/>
                <TextField  type="string" label="description" variant="outlined" {...register("description",{required:true})}/>
                <br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField type="string" label="##-##-#### end Date " variant="outlined" {...register("endDate",{required:true})}/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField type="string" label="##-##-#### start Date" variant="outlined" {...register("startDate",{required:true})}/>
                <br/>
                <VerifiedUserOutlined style={fieldDesign}/>
                <TextField type="string" label="image " variant="outlined" {...register("image",{required:true})}/>
                <ViewAgenda style={fieldDesign}/>
                <TextField label="id" type="number" variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give coupon id"}
                <ViewAgenda style={fieldDesign}/>
                <TextField label="amount" type="number" variant="outlined" {...register("amount",{min:1,required:true})}/>
                {errors.id && "You must give coupon amount"}
                <ViewAgenda style={fieldDesign}/>
                <TextField label="company Id" type="number" variant="outlined" {...register("companyId",{min:1,required:true})}/>
                <br/>{errors.id && "You must give company Id"}
                <ViewAgenda style={fieldDesign}/>
                <TextField label="price" type="number" variant="outlined" {...register("price",{min:1,required:true})}/>
                <br/>{errors.id && "You must give coupon price"}
                <button>add</button><br/>
                        <Checkbox/>
                <label>cancel</label>
                </form>
            </div>
        );
    }
    
    
export default AddCoupon;
