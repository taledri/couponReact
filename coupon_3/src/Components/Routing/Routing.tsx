import { Route, Switch } from "react-router-dom";
import addCompany from "../admin/adminCompany/addCompany/addCompany";
import deleteCompany from "../admin/adminCompany/deleteCompany/deleteCompany";
import getAllCompanies from "../admin/adminCompany/getAllCompanies/getAllCompanies";
import getOneCompany from "../admin/adminCompany/getOneCompany/getOneCompany";
import updateCompany from "../admin/adminCompany/updateCompany/updateCompany";
import addCustomer from "../admin/adminCustomer/addCustomer/addCustomer";
import deleteCustomer from "../admin/adminCustomer/deleteCustomer/deleteCustomer";
import getAllCustomer from "../admin/adminCustomer/getAllCustomer/getAllCustomer";
import getOneCustomer from "../admin/adminCustomer/getOneCustomer/getOneCustomer";
import updateCustomer from "../admin/adminCustomer/updateCustomer/updateCustomer";
import purchaseCoupon from "../Customers/purchaseCoupon/purchaseCoupon";
import getCustomerCouponByCategory from "../Customers/getCustomerCouponByCategory/getCustomerCouponByCategory";
import getCustomerDetails from "../Customers/getCustomerDetails/getCustomerDetails";
import login from "../login/login";
import Main from "../mainarea/Main/Main";
import getCustomerCoupon from "../Customers/getCustomerCoupon/getCustomerCoupon";
import getCustomerCouponByMaxPrice from "../Customers/getCustomerCouponByMaxPrice/getCustomerCouponByMaxPrice";
import addCoupon from "../Companies/addCoupon/addCoupon";
import deleteCoupon from "../Companies/deleteCoupon/deleteCoupon";
import getAllCoupons from "../Companies/getAllCoupons/getAllCoupons";
import getAllCouponsByCategory from "../Companies/getAllCouponsByCategory/getAllCouponsByCategory";
import getAllCouponsByPrice from "../Companies/getAllCouponsByPrice/getAllCouponsByPrice";
import getCompanyDetails from "../Companies/getCompanyDetails/getCompanyDetails";
import updateCoupon from "../Companies/updateCoupon/updateCoupon";
import adminPage from "../admin/adminPage/adminPage";
import companyPage from "../Companies/companyPage/companyPage";
import customerPage from "../Customers/customperPage/customerPage";
import Page404 from "./Page404/Page404";
import logout from "../layout/logout/logout";




function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Switch>
                <Route path="/" component={Main} exact/>
                <Route path="/login" component={login} exact/>
                <Route path="/logout" component={logout} exact/>
                <Route path="/home" component={Main} exact/>
                <Route path="/addCompany" component={addCompany} exact/>
                <Route path="/updateCompany" component={updateCompany} exact/>
                <Route path="/deleteCompany" component={deleteCompany} exact/>
                <Route path="/getAllCompanies" component={getAllCompanies} exact/>
                <Route path="/getOneCompany" component={getOneCompany} exact/>
                <Route path="/addCustomer" component={addCustomer} exact/>
                <Route path="/updateCustomer" component={updateCustomer} exact/>
                <Route path="/deleteCustomer" component={deleteCustomer} exact/>
                <Route path="/getAllCustomer" component={getAllCustomer} exact/>
                <Route path="/getOneCustomer" component={getOneCustomer} exact/>
                <Route path="/getCustomerDetails" component={getCustomerDetails} exact/>
                <Route path="/getCustomerCouponByCategory" component={getCustomerCouponByCategory} exact/>
                <Route path="/getCustomerCouponByMaxPrice" component={getCustomerCouponByMaxPrice} exact/>
                <Route path="/getCustomerCoupon" component={getCustomerCoupon} exact/>
                <Route path="/purchaseCoupon" component={purchaseCoupon} exact/>
                <Route path="/addCoupon" component={addCoupon} exact/>
                <Route path="/updateCoupon" component={updateCoupon} exact/>
                <Route path="/deleteCoupon" component={deleteCoupon} exact/>
                <Route path="/getAllCoupons" component={getAllCoupons} exact/>
                <Route path="/getAllCouponsByCategory" component={getAllCouponsByCategory} exact/>
                <Route path="/getAllCouponsByPrice" component={getAllCouponsByPrice} exact/>
                <Route path="/getCompanyDetails" component={getCompanyDetails} exact/>
                <Route path="/adminPage" component={adminPage} exact/>
                <Route path="/companyPage" component={companyPage} exact/>
                <Route path="/customerPage" component={customerPage} exact/>
                        

                <Route component={Page404}/>

           </Switch>
        </div>
    );
}

export default Routing; 