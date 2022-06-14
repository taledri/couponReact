package com.coupons.demo.services;


import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.Company;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.exceptions.CompanySystemException;
import com.coupons.demo.exceptions.CouponSystemException;

import java.util.List;


public interface CompanyService {

    Company getCompanyLogIn();
    /**
     *Checks if given credentials match company login credentials
     * @param email  user email.
     * @param password  user password
     * @return An indication whether the action was successful or not
     */
    boolean login(String email, String password);

    /**
     *adds a coupon to the database.
      * @param coupon  the coupon to add.
     * @throws CouponSystemException if coupon exits in the DB
     */
    void addCoupon(Coupon coupon) throws CouponSystemException, CompanySystemException;

    /**
     *updates a coupon in the database.
     * @param coupon the coupon to update.
     * @throws CompanySystemException if coupon is of not exits in the company
     */
    void updateCoupon(Coupon coupon) throws CompanySystemException;

    /**
     *deletes a coupon from the database.
     * @param id coupon to delete
     * @throws CompanySystemException if the coupon is not exits
     */
    void deleteCoupon(int id) throws CompanySystemException;

    /**
     * gets all coupons
     * @return list of coupons
     */
    List<Coupon> getAllCoupons();

    /**
     *gets all coupons with same category
     * @param category category coupon
     * @return list coupons
     */
    List<Coupon> getAllCouponsByCategory(Category category);

    /**
     *gets all coupons up to price
     * @param maxPrice max price wanted
     * @return list coupons
     */
    List<Coupon> getAllCouponsByPrice(double maxPrice);

    /**
     *retrieves a company from the database.
     * @return the company found
     * @throws CompanySystemException company was not found in the database
     */
    Company getCompanyDetails() throws CompanySystemException;
}
