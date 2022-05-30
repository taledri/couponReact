import { Login } from "@mui/icons-material";
import { Console } from "console";
import { Component } from "react";
import { render } from "react-dom";
import { NavLink } from "react-router-dom";
import clientType from "../../login/Enums/clientType";
import login from "../../login/login";



class Menu extends Component{
    state = {
        tal: String
      }
   
    private adminMenu = ():JSX.Element =>{
        //localStorage.setItem("user","admin");
        return (
            <>
            
                <br/> <hr/>admin<br/>
                <NavLink exact to="/addCompany">add Company</NavLink><br/>
                <NavLink exact to="/updateCompany">update Company</NavLink><br/>
                <NavLink exact to="/deleteCompany">delete Company</NavLink><br/>
                <NavLink exact to="/getAllCompanies">get All Companies</NavLink><br/>
                <NavLink exact to="/getOneCompany">get One Company</NavLink><br/><br/>
                <NavLink exact to="/addCustomer">add Customer</NavLink><br/>
                <NavLink exact to="/updateCustomer">update Customer</NavLink><br/>
                <NavLink exact to="/deleteCustomer">delete Customer</NavLink><br/>
                <NavLink exact to="/getAllCustomer">get All Customer</NavLink><br/>
                <NavLink exact to="/getOneCustomer">get One Customer</NavLink><br/><hr/>
            </>
        )
    }

    private companyMenu = ():JSX.Element=>{
       // localStorage.setItem("user","company");
        return (
            <>
             <hr/>company<br/>
             <NavLink exact to="/addCoupon">add Coupon</NavLink><br/>
             <NavLink exact to="/updateCoupon">update Coupon</NavLink><br/>
             <NavLink exact to="/deleteCoupon">delete Coupon</NavLink><br/>
             <NavLink exact to="/getAllCoupons">get All Coupons</NavLink><br/>
             <NavLink exact to="/getAllCouponsByCategory">get All Coupons By Category</NavLink><br/>
             <NavLink exact to="/getAllCouponsByPrice">get All Coupons By Price</NavLink><br/>
             <NavLink exact to="/getCompanyDetails">get Company Details</NavLink><br/>
            </>
        )
    }

    private customerMenu = ():JSX.Element=>{
        //localStorage.setItem("user","customer");

        return (
            <div>
             <hr/> customer<br/>
             <NavLink exact to="/purchaseCoupon">purchase Coupon</NavLink><br/>
             <NavLink exact to="/getCustomerCoupon">get Customer Coupon </NavLink><br/>
             <NavLink exact to="/getCustomerCouponByCategory">get Customer Coupon By Category</NavLink><br/>
             <NavLink exact to="/getCustomerCouponByMaxPrice">get Customer Coupon By Max Price</NavLink><br/>
             <NavLink exact to="/getCustomerDetails">get Customer Details</NavLink><br/><hr/>
            </div>
        )
    }

    private guestMenu=():JSX.Element=> {
       // localStorage.setItem("user","guest");

        return(
            <>
            
            </>
        )
    }
    
     public userLog(params:String|null):JSX.Element {

             switch (params) {
                case clientType.ADMINISTRATOR:
                       return (<div>{this.adminMenu()}</div>) 
                       
                case clientType.COMPANY:
                    return (<div>{this.companyMenu()}</div>)
                       
                case clientType.CUSTOMER:
                    return (<div>{this.customerMenu()}</div>)
                
                default:
                    return (<div>{this.guestMenu()}</div>)
                    }
            
    }   


    public render(): JSX.Element {
        return (
            <div className="Menu">

              <NavLink exact to="/login">Login/ </NavLink>
              <NavLink exact to="/LogOut">LogOut</NavLink>
              <br/>
              <NavLink exact to="/">Home</NavLink>

              {this.userLog(localStorage.getItem("user"))}
             
             {/* 
              {localStorage.getItem("user")==="admin"&&this.adminMenu()}
              {localStorage.getItem("user")==="company"&&this.companyMenu()}
              {localStorage.getItem("user")==="customer"&&this.customerMenu()}
        */}

       
            </div>
        );
                
    }
}
export default Menu;
