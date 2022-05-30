import { Typography, TextField, ButtonGroup, Button } from "@material-ui/core";
import { ViewAgenda } from "@mui/icons-material";
import axios from "axios";
import { Component } from "react";
import customer from "../../model/customer";
{/*}
function GetCustomerDetails(): JSX.Element {
    const fieldDesign = {fontSize:40, margin:10};

    return (
        <div className="login BoxSolid">
        <Typography variant="h4" className="HeadLine">Customer details</Typography><hr/>
         <ButtonGroup variant="contained" fullWidth>
         <Button type="submit" color="primary">get</Button>
        </ButtonGroup>
        </div>

        );
    }
    
    
    export default GetCustomerDetails;
*/}
interface GetCustomerDetailsState {
    myCustomer:customer;
}

class GetCustomerDetails extends Component<{}, GetCustomerDetailsState> {

    public constructor(props:{} ) {
        super(props);
        this.state = {            
            myCustomer : new customer  
        };
        
    }

    public render(): JSX.Element {
        return (
            <div className="GetCustomerDetails">               
                <div className="Box GetCustomerDetails"> 
                            <h3>My details:</h3>
                   ID: {this.state.myCustomer.id} <br/>  
                   FIRST NAME: {this.state.myCustomer.firstName} <br/>
                   LAST NAME: {this.state.myCustomer.lastName} <br/>
                   EMAIL: {this.state.myCustomer.email} <br/>
                </div>
            </div>
        );
    }

    public async componentDidMount(){
        const result = await axios.get("http://localhost:8080/customer/getCustomerDetails");
        const CustomerData = result.data;
        console.log(CustomerData);
        this.setState({
            myCustomer : CustomerData
        })
    }
}

export default GetCustomerDetails;