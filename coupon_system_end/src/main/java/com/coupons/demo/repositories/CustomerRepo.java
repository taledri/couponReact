package com.coupons.demo.repositories;

import com.coupons.demo.beans.Coupon;
import com.coupons.demo.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer,Integer> {
    /**
     * A method find customer by email or password
     * @param email Customer's email
     * @param password  Customer's password
     * @return a customer with these credentials exists, for login purposes
     */
    Customer findByEmailAndPassword(String email, String password);

}
