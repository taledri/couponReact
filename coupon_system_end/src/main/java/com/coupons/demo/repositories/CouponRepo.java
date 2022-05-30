package com.coupons.demo.repositories;

import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CouponRepo extends JpaRepository<Coupon,Integer> {
    /**
     * A method find company by title and companyId
     * @param title title Coupon's title
     * @param companyId Coupon's company ID
     * @return coupon with the same title and that companyId already exists
     *      * to prevent the possibility that a company would add two coupons with the same title.
     */
    Coupon findByTitleAndCompanyId (String title ,Integer companyId);

    /**
     * A method find coupons by category and companyId
     * @param companyId Coupon's company ID
     * @param category Coupon's category
     * @return list of coupons that all belong to the company with given Id and match the given category.
     */
    List<Coupon> findAllCouponsByCompanyIdAndCategory(int companyId, Category category);

    /**
     *A method find coupons by companyId
     * @param companyId Coupon's company ID
     * @return list of coupons that all belong to the company
     */
    List<Coupon> findAllCouponByCompanyId(int companyId );

    /**
     * A method find coupons by companyId and price
     * @param companyId Coupon's company ID
     * @param price max price to check
     * @return list of coupons that all belong to the company and up to price
     */
    List<Coupon> findAllCouponsByCompanyIdAndPriceLessThanEqual(int companyId, double price);

    /**
     * A method delete customer coupons by companyId
     * @param id Coupon id
     */
    void deleteCustomerCouponsById(int id);

    /**
     *A method delete company coupons by id
     * @param id Coupon id
     */
    void deleteCompanyCouponsById(int id);

    /**
     *A method delete company coupons by companyId
     * @param companyId Coupon's company ID
     */
    void deleteCompanyCouponsByCompanyId(int companyId);

    /**
     *A method delete  coupons by companyId
     * @param companyId  company ID
     */
    void deleteCouponsByCompanyId(int companyId);

}
