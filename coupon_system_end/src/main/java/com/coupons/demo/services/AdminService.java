package com.coupons.demo.services;

import com.coupons.demo.beans.Company;
import com.coupons.demo.beans.Customer;
import com.coupons.demo.exceptions.CompanySystemException;
import com.coupons.demo.exceptions.CustomerSystemException;


import java.util.List;

public interface AdminService {
    /**
     *Checks if credentials match admin login
     * @param email user email.
     * @param password user password.
     * @return if mach to admin
     */
    boolean login(String email, String password);

    /**
     *adds a company to the database
     * @param company  to add
     * @throws CompanySystemException if company name or email already exists in database
     */
    void addCompany(Company company) throws CompanySystemException;

    /**
     *updates a company in the database
     * @param company to update.
     * @throws CompanySystemException if company already exits in the DB
     */
    void updateCompany(Company company) throws CompanySystemException;

    /**
     *deletes a company from the database
     * @param companyId to delete
     * @throws CompanySystemException  if the company was not found in the database
     */
    void deleteCompany(int companyId) throws CompanySystemException;

    /**
     *gets all the companies registered in the database
     * @return all the companies in the database
     * @throws CompanySystemException if list is empty
     */
    List<Company> getAllCompanies() throws CompanySystemException;

    /**
     *gets one company from the database.
     * @param companyId of the company
     * @return the company found
     * @throws CompanySystemException if company with given id wasnt found in teh database
     */
    Company getOneCompany(int companyId) throws CompanySystemException;

    /**
     * adds a customer to the database.
     * @param customer the customer to add.
     * @throws CustomerSystemException if customer email already exists in database.
     */
    void addCustomer(Customer customer) throws CustomerSystemException;

    /**
     *updates a customer in the database.
     * @param customer  the customer to update.
     * @throws CustomerSystemException if customer with given id does not exist in the database
     */
    void updateCustomer(Customer customer) throws CustomerSystemException;

    /**
     *deletes a customer from the database
     * @param customerId the customer to delete
     * @throws CustomerSystemException if the customer was not found in the database
     */
    void deleteCustomer(int customerId) throws CustomerSystemException;

    /**
     *gets all the customers registered in the database
      * @return all the customers in the database
     */
    List<Customer> getAllCustomer();

    /**
     *gets one customer from the database
      * @param customerId id of the customer
     * @return the customer found
     * @throws CustomerSystemException f customer with given id was not found in teh database
     */
    Customer getOneCustomer(int customerId) throws CustomerSystemException;


}
