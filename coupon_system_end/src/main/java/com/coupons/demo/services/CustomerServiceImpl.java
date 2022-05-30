package com.coupons.demo.services;

import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.beans.Customer;
import com.coupons.demo.exceptions.CouponSystemException;
import com.coupons.demo.exceptions.CustomerSystemException;
import com.coupons.demo.repositories.CouponRepo;
import com.coupons.demo.repositories.CustomerRepo;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl extends ClientService implements CustomerService {
    private final CouponRepo couponRepo;
    private final CustomerRepo customerRepo;
    Customer customer;


    @Override
    public Customer getCustomerLogIn() {
        return customer;
    }

    /**
     * Checks if credentials match admin login
     *
     * @param email    user email.
     * @param password user password.
     * @return if mach to admin
     * @throws CustomerSystemException if customer does not exit
     */
    @Override
    public boolean login(String email, String password) throws CustomerSystemException {
        if (!((customerRepo.findByEmailAndPassword(email, password)) == null)) {
            //customer=customerRepo.getById(customerId);
            customer = customerRepo.findByEmailAndPassword(email, password);
            return true;
        } else {
            throw new CustomerSystemException("wrong email or password");
        }
    }

    /**
     * adds a coupon purchase to the database .
     *
     * @param id the coupon id to purchase
     * @throws CouponSystemException if customer already purchase or time expire coupon
     */

    public void purchaseCoupon(int id) throws CouponSystemException {
        try {
            Coupon coupon;
            LocalDate localDate = LocalDate.now();
            if (couponRepo.existsById(id)) {
                coupon = couponRepo.findById(id).get();
            } else {
                throw new CouponSystemException("coupon does not exits");
            }

            if (coupon.getAmount() < 1) {
                throw new CouponSystemException("This coupon is out of stock!");
            }
            customer = customerRepo.getById(customer.getId());
            List<Coupon> coupons = customer.getCoupons();
            for (Coupon item : coupons) {
                if (item.equals(coupon)) {
                    throw new CouponSystemException("You have already purchased this coupon!");
                } else if (coupon.getEndDate().toLocalDate().isBefore(localDate)) {
                    throw new CouponSystemException("This coupon is expired!");
                }
            }
            coupon.setAmount(coupon.getAmount() - 1);
            couponRepo.saveAndFlush(coupon);
            coupons.add(coupon);
            customer.setCoupons(coupons);
            customerRepo.saveAndFlush(customer);
        } catch (Exception err) {
            System.out.println("CustomerService.purchaseCoupon: " + err.getMessage());
        }
    }

    /**
     * gets customer coupons from the database
     *
     * @return customer coupons
     * @throws CouponSystemException if the list is empty
     */
    @Override
    public List<Coupon> getCustomerCoupon() throws CouponSystemException {
        customer = customerRepo.getById(customer.getId());
        if (customer.getCoupons().isEmpty()) {
            throw new CouponSystemException("There are no coupons to this customer yet!");
        }
        return customer.getCoupons();
    }

    /**
     * gets all the coupons of the customer by category
     *
     * @param category the category to filter by
     * @return list of all coupons the customer owns by given condition
     * @throws CustomerSystemException if customer does not exit
     * @throws CouponSystemException   if the list is empty
     */
    @Override
    public List<Coupon> getCustomerCouponByCategory(Category category) throws CustomerSystemException, CouponSystemException {

        List<Coupon> categoryCoupons = new ArrayList<>();

        customer = customerRepo.getById(customer.getId());
        List<Coupon> coupons = customer.getCoupons();
        if (coupons.isEmpty()) {

            throw new CustomerSystemException("The customer has no coupons yet!");
        }
        if (category == null) {
            throw new CouponSystemException("This is not a valid category!");
        }
        for (Coupon item : coupons) {
            if (item.getCategory().equals(category)) {
                categoryCoupons.add(item);
            }
        }
        if (categoryCoupons.isEmpty()) {
            throw new CouponSystemException("There are no coupons from this category to this customer!");
        }
        return categoryCoupons;


    }

    /**
     * gets all the coupons of the customer by max price.
     *
     * @param price the max price to filter by
     * @return list of all coupons the customer owns by given condition
     * @throws CouponSystemException if the list is empty
     */
    @Override
    public List<Coupon> getCustomerCouponByMaxPrice(double price) throws CouponSystemException {
        List<Coupon> maxCoupon = new ArrayList<>();
        customer = customerRepo.getById(customer.getId());
        List<Coupon> coupons = customer.getCoupons();
        if (coupons.isEmpty()) {
            throw new CouponSystemException("The customer has no coupons yet!");
        }
        for (Coupon item : coupons) {
            if (item.getPrice() <=price) {
                maxCoupon.add(item);
            }
        }
        if (maxCoupon.isEmpty()) {
            throw new CouponSystemException("There are no coupons under this price to this customer!");
        }
        return maxCoupon;
    }

    /**
     * retrieves a customer from the database.
     *
     * @return the customer found in the database
     */
    @Override
    public Customer getCustomerDetails() {
        return customerRepo.findById(customer.getId()).get();
    }
}
