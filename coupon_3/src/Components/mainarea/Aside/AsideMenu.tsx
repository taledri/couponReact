import { Component } from "react";
import { NavLink } from "react-router-dom";

class AdminMenu extends Component {
    public render(): JSX.Element {
            return (
                <div className="AdminMenu">
          <NavLink exact to="/addCompany">add Company</NavLink><br/>
          <NavLink exact to="/updateCompany">update Company</NavLink><br/>
          <NavLink exact to="/deleteCompany">delete Company</NavLink><br/>
          <NavLink exact to="/getAllCompanies">get All Companies</NavLink><br/>
          <NavLink exact to="/getOneCompany">get One Company</NavLink><br/><br/>
          <NavLink exact to="/addCustomer">add Customer</NavLink><br/>
          <NavLink exact to="/updateCustomer">update Customer</NavLink><br/>
          <NavLink exact to="/deleteCustomer">delete Customer</NavLink><br/>
          <NavLink exact to="/getAllCustomer">get All Customer</NavLink><br/>
          <NavLink exact to="/getOneCustomer">get One Customer</NavLink><br/>
          </div>
            );
    }
}
export default AdminMenu;