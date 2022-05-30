package com.coupons.demo.services;

import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.Company;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.exceptions.CompanySystemException;
import com.coupons.demo.exceptions.CouponSystemException;
import com.coupons.demo.repositories.CompanyRepo;
import com.coupons.demo.repositories.CouponRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl extends ClientService implements CompanyService {
    private final CompanyRepo companyRepo;
    private final CouponRepo couponRepo;
    Company company;

    @Override
    public Company getCompanyLogIn() {
        return company;
    }

    /**
     *Checks if given credentials match company login credentials
     * @param email  user email.
     * @param password  user password
     * @return An indication whether the action was successful or not
     */
    @Override
    public boolean login(String email, String password) {
      try {
          if (!((companyRepo.findByEmailAndPassword(email, password)) == null)) {
              company = companyRepo.findByEmailAndPassword(email, password);
              return true;
          }
      }catch (Exception err) {
          System.out.println("login wrong - please try again" + err.getMessage());
      }return false;
    }

    /**
     *adds a coupon to the database.
     * @param coupon  the coupon to add.
     * @throws CouponSystemException if coupon exits in the DB
     */
    @Override
    public void addCoupon(Coupon coupon) throws CouponSystemException {
        try {
        if ((couponRepo.findByTitleAndCompanyId(coupon.getTitle(), coupon.getCompanyId()) == null &&
                (!couponRepo.existsById(coupon.getId()))))
            couponRepo.save(coupon);
        }catch (Exception err){
        throw new CouponSystemException("exits");
    }}

    /**
     *updates a coupon in the database.
     * @param coupon the coupon to update.
     * @throws CompanySystemException if coupon is of not exits in the company
     */
    @Override
    public void updateCoupon(Coupon coupon) throws CompanySystemException {
      try {
          if (!couponRepo.existsById(coupon.getId()) || (company.getId() != couponRepo.getById(coupon.getId()).getCompanyId())) {
              throw new CompanySystemException("Coupon ID not found");
          }
        couponRepo.saveAndFlush(coupon);
      } catch (Exception err) {
          System.out.println(err.getMessage());
    }}

    /**
     *deletes a coupon from the database.
     * @param id coupon to delete
     * @throws CompanySystemException if the coupon is not exits
     */
    @Override
    public void deleteCoupon(int id) throws CompanySystemException {
        if ((!couponRepo.existsById(id)) || (company.getId() != couponRepo.getById(id).getCompanyId())) {
            throw new CompanySystemException("coupon not found");
        }
        couponRepo.deleteById(id);
    }

    /**
     *
     * @return
     */
    @Override
    public List<Coupon> getAllCoupons() {
        return couponRepo.findAllCouponByCompanyId(company.getId());
    }

    /**
     *gets all coupons with same category
     * @param category category coupon
     * @return list coupons
     */
    @Override
    public List<Coupon> getAllCouponsByCategory(Category category) {
        return couponRepo.findAllCouponsByCompanyIdAndCategory(company.getId(),category);
    }

    /**
     *gets all coupons up to price
     * @param maxPrice max price wanted
     * @return list coupons
     */
    @Override
    public List<Coupon> getAllCouponsByPrice(double maxPrice) {
        return couponRepo.findAllCouponsByCompanyIdAndPriceLessThanEqual(company.getId(),maxPrice);
    }

    /**
     *retrieves a company from the database.
     * @return the company found
     * @throws CompanySystemException company was not found in the database
     */
    @Override
    public Company getCompanyDetails() throws CompanySystemException {
        if (!companyRepo.existsById(company.getId())){
            throw new CompanySystemException("not found");
        }
       Company company1=companyRepo.findById(company.getId()).get();
        company1.setCoupons(couponRepo.findAllCouponByCompanyId(company.getId()));
        return company1;
    }
}
