package com.coupons.demo.services;


import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.Company;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.beans.Customer;
import com.coupons.demo.exceptions.CouponSystemException;
import com.coupons.demo.exceptions.CustomerSystemException;

import java.util.List;

public interface CustomerService {

    Customer getCustomerLogIn();
    /**
     Checks if credentials match admin login
     * @param email user email.
     * @param password user password.
     * @return if mach to admin
     * @throws CustomerSystemException if customer does not exit
     */
    boolean login(String email, String password) throws CustomerSystemException;

    /**
     * adds a coupon purchase to the database .
     * @param id the id coupon to purchase
     * @throws CouponSystemException if customer already purchase or time expire coupon
     */
    void purchaseCoupon(int id) throws CouponSystemException;

    /**
     *gets customer coupons from the database
     * @return customer coupons
     * @throws CouponSystemException if the list is empty
     */
    List<Coupon> getCustomerCoupon() throws CouponSystemException;

    /**
     *gets all the coupons of the customer by category
      * @param category the category to filter by
     * @return list of all coupons the customer owns by given condition
     * @throws CustomerSystemException if customer does not exit
     * @throws CouponSystemException if the list is empty
     */
    List<Coupon> getCustomerCouponByCategory(Category category) throws CustomerSystemException, CouponSystemException;

    /**
     *gets all the coupons of the customer by max price.
      * @param price the max price to filter by
     * @return list of all coupons the customer owns by given condition
     * @throws CouponSystemException if the list is empty
     */
    List<Coupon> getCustomerCouponByMaxPrice(double price) throws CouponSystemException;

    /**
     *retrieves a customer from the database.
     * @return the customer found in the database
     */
    Customer getCustomerDetails();


}
