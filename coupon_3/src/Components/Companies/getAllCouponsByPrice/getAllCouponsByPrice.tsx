import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface formable{
   price:Number;
}

function GetCouponByPrice(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
        const {register,handleSubmit,formState:{errors}} = useForm<formable>();
        const send:SubmitHandler<formable> = async (data)=>{
            console.log(data);
            const url = "http://localhost:8080/company/getAllCouponsByPrice/"+data.price;
            const response = await axios.get<formable>(url);
            console.log(response);
            
        }
            return (
                <div className="login BoxSolid">
                    <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Get Coupons up to price</Typography><hr/>
                <ViewAgenda style={fieldDesign}/>
               <TextField type="string" variant="outlined"label="enter max price " {...register("price",{required:true})}/>
                <br/>{errors.price && "You must give  max Price"}
                <br/><br/> 

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">get</Button>
                </ButtonGroup>
                </form>

                </div>
        );
    }
    export default GetCouponByPrice;