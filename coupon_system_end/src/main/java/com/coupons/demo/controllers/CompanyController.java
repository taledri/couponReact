package com.coupons.demo.controllers;

import com.coupons.demo.Util.JWTutil;
import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.ClientType;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.beans.UserDetail;
import com.coupons.demo.exceptions.CompanySystemException;
import com.coupons.demo.exceptions.CouponSystemException;
import com.coupons.demo.services.AdminService;
import com.coupons.demo.services.CompanyService;
import com.coupons.demo.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:8080","http:localhost:3000"}, allowedHeaders = "*")
@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;
    private final CustomerService customerService;
    private final AdminService adminService;
    private final JWTutil jwTutil;


    @PostMapping("/companyLogin")
    public ResponseEntity<?> companyLogin(@RequestBody UserDetail userData) throws CompanySystemException{
        if (companyService.login(userData.getEmail(), userData.getPassword())) {
            String myToken = jwTutil.generateToken(new UserDetail(userData.getEmail(), companyService.getCompanyLogIn().getId(), ClientType.company));
            return new ResponseEntity<>(myToken, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    /**
     * adds a coupon to the database.
     * @param coupon is add
     * @return response entity with http status
     * @throws CouponSystemException if coupon exists in the database.
     */
    @PostMapping("/addCoupon")
    public ResponseEntity<?> addCoupon(@RequestBody Coupon coupon) throws CouponSystemException {
        companyService.addCoupon(coupon);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    /**
     * delete a coupon to the database.
     * @param id id to deleted
     * @return response entity with http status
     * @throws CompanySystemException if coupon to delete was not found.
     */
    @DeleteMapping("/deleteCoupon/{id}")
    public ResponseEntity deleteCouponById(@PathVariable int id) throws CompanySystemException {
        companyService.deleteCoupon(id);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    /**
     * update a coupon to the database.
     * @param coupon is update
     * @throws CompanySystemException if coupon not exists in the database
     */
    @PutMapping("/updateCoupon")
    public void updateCoupon(@RequestBody Coupon coupon) throws CompanySystemException {
        try {
            companyService.updateCoupon (coupon);
        } catch (CompanySystemException  e) {
            throw new CompanySystemException ("Data was already reported as updated");
        }
    }

    /**
     * get all  coupons from the database.
     * @return response entity with http status and coupons
     */
    @GetMapping("/getAllCoupons")
    public ResponseEntity<?> getAllCoupons() {
        return new ResponseEntity<>(companyService.getAllCoupons(), HttpStatus.OK);
    }

    /**
     * get company details from the database.
     * @return response entity with http status and company details
     * @throws CompanySystemException if company to delete was not found.
     */
    @GetMapping("/getCompanyDetails")
    public ResponseEntity<?> getCompanyDetails() throws CompanySystemException {
        return new ResponseEntity<>(companyService.getCompanyDetails(), HttpStatus.OK);
    }

    /**
     * get coupons by category from the database.
     * @param category coupon category
     * @return  response entity with http status and coupons with same category
     */
    @GetMapping("/getAllCouponsByCategory/{category}")
    public ResponseEntity<?> getAllCouponsByCategory(@PathVariable Category category) {
        return new ResponseEntity<>(companyService.getAllCouponsByCategory(category), HttpStatus.OK);
    }

    /**
     *get coupons up to some price from the database.
     * @param price coupon max price
     * @return  response entity with http status and coupons up to price
     */
    @GetMapping("/getAllCouponsByPrice/{price}")
    public ResponseEntity<?>getAllCouponsByPrice(@PathVariable double price) {
        return new ResponseEntity<>(companyService.getAllCouponsByPrice(price),HttpStatus.OK);
    }
}
