import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { Component, useState } from "react";
import Company from "../../model/company";
import globals from "../../Util/Globals";

interface GetCompanyDetailsState {
    myCompany:Company;
}
class GetCompanyDetails extends Component<{}, GetCompanyDetailsState> {

    public constructor(props:{} ) {
        super(props);
        this.state = {            
            myCompany : new Company  
        };
        
    }
    public async componentDidMount(){
        const result = await axios.get(globals.company.getCompanyDetails);
        const CompanyData = result.data;
        console.log(CompanyData);
        this.setState({
            myCompany : CompanyData
        })
    }
    public render(): JSX.Element {
        return (
            <div className="GetCustomerDetails">               
                <div className="Box GetCustomerDetails"> 
                            <h3>My details:</h3>
                   ID: {this.state.myCompany.id} <br/>  
                   NAME: {this.state.myCompany.name} <br/>
                   EMAIL: {this.state.myCompany.email} <br/>
                   PASSWORD: {this.state.myCompany.password} <br/>
                </div>
            </div>
        );
    }
}


    
    
    export default GetCompanyDetails;