package com.coupons.demo.controllers;

import com.coupons.demo.Util.JWTutil;
import com.coupons.demo.beans.*;
import com.coupons.demo.exceptions.CompanySystemException;
import com.coupons.demo.exceptions.CustomerSystemException;
import com.coupons.demo.services.AdminService;
import com.coupons.demo.services.CompanyService;
import com.coupons.demo.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin(origins = {"http://localhost:8080","http://localhost:3000"}, allowedHeaders = "*")
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RequestMapping("/admin")
@RequiredArgsConstructor

public class AdminController {
    private final AdminService adminService;
    private final CompanyService companyService;
    private final CustomerService customerService;
    private final JWTutil jwTutil;


    @PostMapping("/adminLogin")
    public ResponseEntity<?> adminLogin(@RequestBody UserDetail userData) throws CustomerSystemException {
        if (adminService.login(userData.getEmail(), userData.getPassword())) {
            String myToken = jwTutil.generateToken(new UserDetail(userData.getEmail(), 0, ClientType.admin));
            return new ResponseEntity<>(myToken, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    /**
     * adds a company to the database.
     *
     * @param company is add
     * @return response entity with http status
     * @throws CompanySystemException if company exists in the database.
     */
    @PostMapping("/addCompany")
    public ResponseEntity<?> addCompany(@RequestBody Company company) throws CompanySystemException {
        adminService.addCompany(company);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * update a company to the database.
     * @param company is updated
     * @throws CompanySystemException if company not exists in the database
     */
    @PutMapping("/updateCompany")
    public void updateCompany( @RequestBody Company company) throws CompanySystemException {
        try {
            adminService.updateCompany(company);


        } catch (CompanySystemException e) {
            throw new CompanySystemException(" company is not in the system");
        }
    }


    {/* @PutMapping("updateCompany") //http://localhost:8080/coupons/updateCompany/
    public ResponseEntity<?> updateCompany( @RequestBody Company company) throws CompanySystemException {
        try {
            adminService.updateCompany(company);
        }catch (CompanySystemException e){
            throw new CompanySystemException("company is not in the system");
    }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);

    }
    */}

        /**
         * delete a company to the database.
         * @param id company id to deleted
         * @return response entity with http status
         * @throws CompanySystemException if company to delete was not found.
         */
    @DeleteMapping("/deleteCompany/{id}")
    public ResponseEntity<?> deleteCompanyById(@PathVariable int id) throws CompanySystemException {
        adminService.deleteCompany(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    /**
     * get all  companies from the database.
     * @return response entity with http status and companies
     * @throws CompanySystemException if not found company
     */
    @GetMapping("/getAllCompanies")
    public ResponseEntity<?> getAllCompanies() throws CompanySystemException {
        return new ResponseEntity<>(adminService.getAllCompanies(), HttpStatus.OK);
    }

    /**
     *
     * @param id the id of company we want to get
     * @return response entity containing the http status and company
     * @throws CompanySystemException if failed to find company.
     */
    @GetMapping("/getOneCompany/{id}")
    public ResponseEntity<?> getOneCompany(@PathVariable int id) throws CompanySystemException {
        return new ResponseEntity<>(adminService.getOneCompany(id), HttpStatus.OK);
    }

    /**
     * adds a customer to the database.
     * @param customer we want to add
     * @return response entity with http status
     * @throws CustomerSystemException   if the customer already exists in teh database.
     */
    @PostMapping("/addCustomer")
    public ResponseEntity<?> addCustomer(@RequestBody Customer customer) throws CustomerSystemException {
        adminService.addCustomer(customer);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * Updates the details of a customer in the database.
     * @param customer we want to update
     * @throws CustomerSystemException if the customer not exists in teh database
     */
    @PutMapping("/updateCustomer")
    public void updateCustomer(@RequestBody Customer customer) throws CustomerSystemException {
        try {
            adminService.updateCustomer(customer);
        } catch (CustomerSystemException e) {
            throw new CustomerSystemException(" Customer is not in the system");
        }
    }

    /**
     *delete a customer from the database.
     * @param id the id of the customer to delete.
     * @return  response entity with http status
     * @throws CustomerSystemException  if no customer with given id exists
     */
    @DeleteMapping("/deleteCustomer/{id}")
    public ResponseEntity<?> deleteCustomerById(@PathVariable int id) throws CustomerSystemException {
        try {
        adminService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }  catch (CustomerSystemException e) {
        throw new CustomerSystemException(" Customer is not deleted");
    }}

    /**
     * retrieves all customers from teh database.
     * @return Response Entity with HttpStatus and customers
     */
    @GetMapping("/getAllCustomer")
    public ResponseEntity<?> getAllCustomer()  {
        return new ResponseEntity<>(adminService.getAllCustomer(), HttpStatus.OK);
    }

    /**
     * retrieves one customer from the database
     * @param id  the id of the customer to find
     * @return the customer found, Response Entity with HttpStatus
     * @throws CustomerSystemException  if customer was not found
     */
    @GetMapping("/getOneCustomer/{id}")
    public ResponseEntity<?> getOneCustomer(@PathVariable int id) throws CustomerSystemException {
        return new ResponseEntity<>(adminService.getOneCustomer(id), HttpStatus.OK);
    }

}
