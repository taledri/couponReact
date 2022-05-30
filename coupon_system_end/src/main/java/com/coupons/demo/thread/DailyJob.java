package com.coupons.demo.thread;

import com.coupons.demo.beans.Coupon;
import com.coupons.demo.repositories.CouponRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Component
@EnableAsync
@RequiredArgsConstructor
@EnableScheduling
public class DailyJob {
    private final CouponRepo couponRepo;

    /**
     *A method that sets the time of day it will be run, what is the period between every run,
     * the action itself, which is to delete all coupons with passed expiration date, and the condition for it to stop.
     */
    @Async
    @Scheduled(cron = "1 0 0 * * ?", zone = "Asia/Jerusalem")
    public void dailyJob() {
        System.out.println("the thread running");
        List<Coupon>coupons=couponRepo.findAll();
        for (Coupon item:coupons) {
            if (item.getEndDate().before(new Date())){
                couponRepo.deleteCustomerCouponsById(item.getId());
                couponRepo.deleteCompanyCouponsById(item.getId());
                couponRepo.deleteById(item.getId());
                System.out.println(item.getTitle()+"deleted");
            }
        }
    }
}
