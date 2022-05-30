import axios from "axios";
import { Key, ReactChild, ReactFragment, ReactPortal, useState } from "react";
import Company from "../../../model/company";

function CompanyList(): JSX.Element {
    const[companyList,setCompany] = useState<Company[]>([]);
    const getCompanies=()=>{
        const url = "http://localhost:8080/admin/getAllCompanies";
        axios.get<Company[]>(url)
        .then(response=>{
            //console.log(response.data);
            setCompany(response.data);
            console.log(companyList);
        })
        .catch(error=>{

        });
    
    };
    return (
        <div className="companyList">
			<h1>Company List</h1>
            <button onClick={getCompanies}>get all companies</button>
            {companyList.map((company: { id: Key | null | undefined; name: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; email: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; coupons: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; })=><span key={company.id}>
                <div className="Box">
                    {company.name}<hr/>
                    {company.email}<br/>
                    {company.coupons}<br/>
                </div>
            </span>)}
        </div>
    );
}

export default CompanyList;

