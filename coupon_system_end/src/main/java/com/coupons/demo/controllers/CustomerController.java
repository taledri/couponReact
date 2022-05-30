package com.coupons.demo.controllers;

import com.coupons.demo.Util.JWTutil;
import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.ClientType;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.beans.UserDetail;
import com.coupons.demo.exceptions.CompanySystemException;
import com.coupons.demo.exceptions.CouponSystemException;
import com.coupons.demo.exceptions.CustomerSystemException;
import com.coupons.demo.services.CompanyService;
import com.coupons.demo.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:8080","http:localhost:3000"}, allowedHeaders = "*")
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;
    private final CompanyService companyService;
    private final JWTutil jwTutil;

    @PostMapping("/customerLogin")
    public ResponseEntity<?> customerLogin(@RequestBody UserDetail userData) throws CustomerSystemException {
        if (customerService.login(userData.getEmail(), userData.getPassword())) {
            String myToken = jwTutil.generateToken(new UserDetail( userData.getEmail(),customerService.getCustomerLogIn().getId(), ClientType.customer));
            return new ResponseEntity<>(myToken, HttpStatus.ACCEPTED);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    /**
     * purchase coupon from database
     * @param id the  id coupon the customer wishes to buy
     * @return response entity with http status
     * @throws CouponSystemException
     */
    @PostMapping("/purchaseCoupon")
    public ResponseEntity<?> purchaseCoupon(@RequestBody int id) throws CouponSystemException {
            customerService.purchaseCoupon(id);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }

    /**
     * customer coupon from database
     * @return response entity with http status and customer coupon
     * @throws CouponSystemException
     */
    @GetMapping("/getCustomerCoupons")
    public ResponseEntity<?> getCustomerCoupons() throws CouponSystemException {
        return new ResponseEntity<>(customerService.getCustomerCoupon(), HttpStatus.OK);
    }

    /**
     *customer coupon with same category from database
     * @param category coupon category
     * @return response entity with http status and customer coupon with same category
     * @throws CustomerSystemException if customer not exits
     * @throws CouponSystemException if customer does not have coupon with the wanted category
     */
    @GetMapping("/getCustomerCouponByCategory/{category}")
    public ResponseEntity<?> getCustomerCouponByCategory(@PathVariable Category category) throws CustomerSystemException, CouponSystemException {
        return new ResponseEntity<>(customerService.getCustomerCouponByCategory(category), HttpStatus.OK);
    }

    /**
     *customer coupon up to price from database
     * @param price max price we want to check
     * @return response entity with http status and customer coupon up to max price
     * @throws CouponSystemException if customer does not have coupon up to wanted price
     */
    @GetMapping("/getCustomerCouponByMaxPrice/{price}")
    public ResponseEntity<?> getCustomerCouponByPrice(@PathVariable double price) throws CouponSystemException {
        return new ResponseEntity<>(customerService.getCustomerCouponByMaxPrice(price), HttpStatus.OK);
    }

    /**
     *customer details
     * @return esponse entity with http status and customer details
     */
    @GetMapping("/getCustomerDetails")
    public ResponseEntity<?> getCustomerDetails()   {
        return new ResponseEntity<>(customerService.getCustomerDetails(), HttpStatus.OK);
    }

}
