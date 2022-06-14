package com.coupons.demo.services;

import com.coupons.demo.beans.Company;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.beans.Customer;
import com.coupons.demo.exceptions.CompanySystemException;
import com.coupons.demo.exceptions.CustomerSystemException;
import com.coupons.demo.repositories.CompanyRepo;
import com.coupons.demo.repositories.CouponRepo;
import com.coupons.demo.repositories.CustomerRepo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
//@JsonIgnoreProperties({"hibernateLazyInitializer"})

public class AdminServiceImpl extends ClientService implements AdminService {

    private final CompanyRepo companyRepo;
    private final CouponRepo couponRepo;
    private final CustomerRepo customerRepo;
    private final Company company;

    private final String adminEmail = "admin@admin.com";
    private final String adminPass = "admin";

    /**
     * Checks if credentials match admin login
     *
     * @param email    user email
     * @param password user password
     * @return if mach to admin
     */
    @Override
    public boolean login(String email, String password) {
        if (email.equalsIgnoreCase(adminEmail) && password.equals(adminPass)) {
            return true;
        }
        return false;
    }

    /**
     * adds a company to the database
     *
     * @param company to add
     * @throws CompanySystemException if company name or email already exists in database
     */
    @Override
    public void addCompany(Company company) throws CompanySystemException {
        if (companyRepo.existsByName(company.getName())) {
            throw new CompanySystemException("There is already a company by that name!");
        } else if (companyRepo.existsByEmail(company.getEmail())) {
            throw new CompanySystemException("There is already a company with that email!");
        } else if (companyRepo.existsById(company.getId())) {
            throw new CompanySystemException("There is already a company with that id!");
        }
        companyRepo.save(company);
    }

    /**
     * updates a company in the database
     *
     * @param company to update.
     * @throws CompanySystemException if company already exits in the DB
     */
    @Override
    public void updateCompany(Company company) throws CompanySystemException {
        if (!companyRepo.existsById(company.getId())) {
            throw new CompanySystemException("There is no company with that ID!");
        }


        Optional<Company> companyOptional = companyRepo.findByEmail(company.getEmail());
        if (companyOptional.isPresent()) {
            if (companyOptional.get().getId() != company.getId()) {
                throw new CompanySystemException("EMAIL_EXISTS");
            }
            if (!companyOptional.get().getName().equalsIgnoreCase(company.getName())) {
                throw new CompanySystemException("name exists");
            }
        }

        company.setCoupons(new ArrayList<>());
        companyRepo.saveAndFlush(company);
    }

    /**
     * deletes a company from the database
     *
     * @param companyId to delete
     * @throws CompanySystemException if the company was not found in the database
     */
    @Override
    public void deleteCompany(int companyId) throws CompanySystemException {
        Company company = getOneCompany(companyId);
        if (!companyRepo.existsById(companyId)) {
            throw new CompanySystemException("There is no company with that ID!");
        }
        companyRepo.deleteById(companyId);
        couponRepo.deleteById(companyId);
    }

    /**
     * gets all the companies registered in the database
     *
     * @return all the companies in the database
     * @throws CompanySystemException if list is empty
     */
    @Override
    public List<Company> getAllCompanies() throws CompanySystemException {
        if (companyRepo.findAll().isEmpty()) {
            throw new CompanySystemException("no companies yet");
        }
        return companyRepo.findAll();
    }

    /**
     * gets one company from the database.
     *
     * @param companyId of the company
     * @return the company found
     * @throws CompanySystemException if company with given id wasnt found in teh database
     */
    @Override
    public Company getOneCompany(int companyId) throws CompanySystemException {
        Optional<Company> company = companyRepo.findById(companyId);

        if (!companyRepo.existsById(companyId)) {
            throw new CompanySystemException("There is no company by that ID!");
        }
        return company.get();
    }

    /**
     * adds a customer to the database.
     *
     * @param customer the customer to add.
     * @throws CustomerSystemException if customer email already exists in database.
     */
    @Override
    public void addCustomer(Customer customer) throws CustomerSystemException {
        if (customerRepo.existsById(customer.getId())) {
            throw new CustomerSystemException("there is id exits");
        } else {
            if (customerRepo.existsByEmail(customer.getEmail())) {
                throw new CustomerSystemException("there is email exits");
            } else {
                customerRepo.save(customer);
            }
        }
    }

    /**
     * updates a customer in the database.
     *
     * @param customer the customer to update.
     * @throws CustomerSystemException if customer with given id does not exist in the database
     */
    @Override
    public void updateCustomer(Customer customer) throws CustomerSystemException {

        if (!customerRepo.existsById(customer.getId())) {
            throw new CustomerSystemException("customer id not found ");
        }
        customerRepo.saveAndFlush(customer);
    }

    /**
     * deletes a customer from the database
     *
     * @param customerId the customer to delete
     * @throws CustomerSystemException if the customer was not found in the database
     */
    @Override
    public void deleteCustomer(int customerId) throws CustomerSystemException {
        if (!customerRepo.existsById(customerId)) {
            throw new CustomerSystemException("customer not found");
        }
        customerRepo.deleteById(customerId);
        couponRepo.deleteById(customerId);
    }

    /**
     * gets all the customers registered in the database
     *
     * @return all the customers in the database
     */
    @Override
    public List<Customer> getAllCustomer() {
        return customerRepo.findAll();
    }

    /**
     * gets one customer from the database
     *
     * @param customerId id of the customer
     * @return the customer found
     * @throws CustomerSystemException f customer with given id was not found in teh database
     */
    @Override
    public Customer getOneCustomer(int customerId) throws CustomerSystemException {
        if (!customerRepo.existsById(customerId)) {
            throw new CustomerSystemException("customer not found");
        }
        return customerRepo.findById(customerId).get();
    }
}
