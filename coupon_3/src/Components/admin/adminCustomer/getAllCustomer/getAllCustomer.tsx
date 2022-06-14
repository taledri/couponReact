import axios from "axios";
import { Key, ReactChild, ReactFragment, ReactPortal, useState } from "react";
import Customer from "../../../model/customer";
import globals from "../../../Util/Globals";

function CustomersList(): JSX.Element {
    const[customersList,setCustomer] = useState<Customer[]>([]);
    const getCustomer=()=>{
        axios.get<Customer[]>(globals.admin.getAllCustomer)
        .then(response=>{
            //console.log(response.data);
            setCustomer(response.data);
            console.log(customersList);
        })
        .catch(error=>{

        });
    
    };
    return (
        <div className="customersList">
			<h1>Customer List</h1>
            <button onClick={getCustomer}>get all customers</button>
            <br></br>
            {customersList.map((customer: { id: Key | null | undefined; email: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; firstName: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; lastName: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined;})=><span key={customer.id}>
                <div className="Box">
                   First name: {customer.firstName}<hr/>
                   Last name: {customer.lastName}<hr/>
                   Email: {customer.email}<br/>
                </div>
            </span>)}
        </div>
    );
}

export default CustomersList;

