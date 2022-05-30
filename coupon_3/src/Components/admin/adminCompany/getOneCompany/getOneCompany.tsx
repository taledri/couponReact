import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { Component } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Company from "../../../model/company";

interface formable{
    id:number;
}
interface CompanyState {
    company:Company
}


function GetOneCompany(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const {register,handleSubmit,formState:{errors}} = useForm<formable>();
    const send:SubmitHandler<formable> = async (data)=>{
        console.log(data);
        const url = "http://localhost:8080/admin/getOneCompany/"+data.id;
        const response = await axios.get<formable>(url);
        console.log(response);
        
    }
    

            return (
            <div className="login BoxSolid">
                <form onSubmit={handleSubmit(send)}>
                <Typography variant="h4" className="HeadLine">get one Company</Typography><hr/>
                <ViewAgenda style={fieldDesign}/>
                <TextField type="number" variant="outlined" {...register("id",{min:1,required:true})}/>
                <br/>{errors.id && "You must give id company"}
                <button >get</button>  
                </form>
            </div>
        );
    }
    
{/*

class GetOneCompany extends Component<formable, CompanyState> {

    public constructor(props: formable) {
        super(props);
        this.state = {            
            company : new Company  
        };
        
    }
    
    public async componentDidMount(){
        const result = await axios.get("http://localhost:8080/admin/getOneCompany/"+this.props.id);
        const companyResult = result.data;
        //console.log(carData);
        this.setState({
            company : companyResult
        })
    }

    public render(): JSX.Element {
        return (
            <div className="GetCompanyCoupons">
                <br/>
                Company Details:
                <hr/>
               
                <div className="Box "> 
                                            
                    {this.state.company.id} <br/>
                    {this.state.company.name} <br/>
                    {this.state.company.email} <br/>
                    {this.state.company.password}<br/>
                    {this.state.company.coupons}<br/>
            </div>
            </div>
        );
    }

}
*/}




    export default GetOneCompany;