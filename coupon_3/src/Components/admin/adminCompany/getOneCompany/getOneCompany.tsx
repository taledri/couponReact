import { Button, ButtonGroup, TextField, Typography } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { Component, SyntheticEvent, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Company from "../../../model/company";
import globals from "../../../Util/Globals";
import notify from "../../../Util/Notify";

interface formable{
    id:number;
}
interface CompanyState {
    company:Company
}


function GetOneCompany(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};
    const [company,setCompany] = useState<Company>(new Company());
    const [companyId,setCompanyId] = useState(0);
    const {register,handleSubmit,formState:{errors}} = useForm<Company>();
    const send:SubmitHandler<Company> = async (data)=>{
        console.log(data);
        const response = await axios.get<Company>(globals.admin.getOneCompany+data.id);
        console.log(response.data);
        setCompany(response.data);
        console.log(company);
        notify.success("There is a company with that id");

        
    }
    const companyUpdate = (args:SyntheticEvent)=>{
        let custId =Number( (args.target as HTMLInputElement).value);
        setCompanyId(custId);
        console.log("and the winner is:",companyId);
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
                <div className="BoxSolid">
                {company?.id>0 && company?.email}<br/>
                {company?.id>0 && company?.id}<br/>
                {company?.id>0 && company?.name}<br/>
                {company?.id>0 && company?.coupons}<br/>

        </div>
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