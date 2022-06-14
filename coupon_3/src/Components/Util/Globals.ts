class Globals{
}

class DevelopmentGlobals extends Globals{
    public admin = {
       addCompany     : "http://localhost:8080/admin/addCompany",
       deleteCompany  : "http://localhost:8080/admin/deleteCompany/",
       getAllCompanies: "http://localhost:8080/admin/getAllCompanies",
       getOneCompany  : "http://localhost:8080/admin/getOneCompany/",
       updateCompany  : "http://localhost:8080/admin/updateCompany",
       addCustomer    : "http://localhost:8080/admin/addCustomer",
       deleteCustomer : "http://localhost:8080/admin/deleteCustomer/",
       getAllCustomer : "http://localhost:8080/admin/getAllCustomer",
       getOneCustomer : "http://localhost:8080/admin/getOneCustomer/",
       updateCustomer : "http://localhost:8080/admin/updateCustomer"
      
    }

    public company = {
        addCoupon              : "http://localhost:8080/company/addCoupon",
        deleteCoupon           : "http://localhost:8080/company/deleteCoupon/",
        getAllCoupon           : "http://localhost:8080/company/getAllCoupons",
        getAllCouponByCategory : "http://localhost:8080/company/getAllCouponsByCategory/",
        getAllCouponByPrice    : "http://localhost:8080/company/getAllCouponsByPrice/",
        getCompanyDetails      : "http://localhost:8080/company/getCompanyDetails",
        updateCoupon           : "http://localhost:8080/company/updateCoupon"


    }

    public customer = {
        getCustomerCoupon           : "http://localhost:8080/customer/getCustomerCoupons",
        getCustomerCouponByCategory : "http://localhost:8080/customer/getCustomerCouponByCategory/",
        getCustomerCouponByMaxPrice : "http://localhost:8080/customer/getCustomerCouponByMaxPrice/",
        getCustomerDetails          : "http://localhost:8080/customer/getCustomerDetails",
        purchaseCoupon              : "http://localhost:8080/customer/purchaseCoupon/"
   
    }
}

class ProductionGlobals extends Globals{
    public admin = {
        addCompany     : "admin/addCompany",
        deleteCompany  : "admin/deleteCompany/",
        getOneCompany  : "admin/getOneCompany/",
        getAllCompanies: "admin/getAllCompanies",
        updateCompany  : "admin/updateCompany",
        addCustomer    : "admin/addCustomer",
        deleteCustomer : "admin/deleteCustomer/",
        getAllCustomer : "admin/getAllCustomer",
        getOneCustomer : "admin/getOneCustomer/",
        updateCustomer : "admin/updateCustomer"  
    }

    public company = {
        addCoupon              : "company/addCoupon",
        deleteCoupon           : "company/deleteCoupon/",
        getAllCoupon           : "company/getAllCoupons",
        getAllCouponByCategory : "company/getAllCouponsByCategory/",
        getAllCouponByPrice    : "company/getAllCouponsByPrice/",
        getCompanyDetails      : "company/getCompanyDetails",
        updateCoupon           : "company/updateCoupon"
    }

    public customer = {
        getCustomerCoupon           :"customer/getCustomerCoupons",
        getCustomerCouponByCategory :"customer/getCustomerCouponByCategory/",
        getCustomerCouponByMaxPrice :"customer/getCustomerCouponByMaxPrice/",
        getCustomerDetails          :"customer/getCustomerDetails",
        purchaseCoupon              :"customer/purchaseCoupon/"




    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;