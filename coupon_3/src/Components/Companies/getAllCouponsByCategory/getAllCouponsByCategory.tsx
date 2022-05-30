import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface formable{
    category:string;
}

function GetCouponByCategory(): JSX.Element {
        const fieldDesign = {fontSize:40, margin:10};
        const {register,handleSubmit,formState:{errors}} = useForm<formable>();
        const send:SubmitHandler<formable> = async (data)=>{
            console.log(data);
            const url = "http://localhost:8080/company/getAllCouponsByCategory/"+data.category;
            const response = await axios.get<formable>(url);
            console.log(response);
            
        }
            return (
                <div className="login BoxSolid">
                      <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">Get Coupon by category</Typography><hr/>
                <ViewAgenda style={fieldDesign}/>
               <TextField type="string" variant="outlined"label="chose category " {...register("category",{required:true})}/>
                <br/>{errors.category && "You must give  category"}
                <br/><br/> 

                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">get</Button>
                </ButtonGroup>
                </form>

                </div>
        );
    }
    export default GetCouponByCategory;