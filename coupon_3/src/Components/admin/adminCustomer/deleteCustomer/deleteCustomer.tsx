import { Button, ButtonGroup, Checkbox, TextField, Typography } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import { useForm } from "react-hook-form";

interface formable{
    id:Number;
}


function DeleteCustomer(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();

        return (
            <div className="login BoxSolid">
             <Typography variant="h4" className="HeadLine">delete Customer</Typography><hr/>
             <ViewAgenda style={fieldDesign}/>
                <TextField type="number" variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give id company"}
                <br/><br/>
    
                <ButtonGroup variant="contained" fullWidth>
                    <Button type="submit" color="primary">delete</Button>
                </ButtonGroup>
                
                </div>
        );
    }
    
    
    export default DeleteCustomer;



