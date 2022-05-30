package com.coupons.demo.advice;


import com.coupons.demo.exceptions.CompanySystemException;
import com.coupons.demo.exceptions.CouponSystemException;
import com.coupons.demo.exceptions.CustomerSystemException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class RestException {
    @ExceptionHandler(value = {CompanySystemException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ErrorDetail handleExceptionCompany(Exception e) {
        return new ErrorDetail("System Error", e.getMessage());
    }

    @ExceptionHandler(value = {CouponSystemException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ErrorDetail handleExceptionCoupon(Exception e) {
        return new ErrorDetail("System Error", e.getMessage());
    }

    @ExceptionHandler(value = {CustomerSystemException.class})
    @ResponseStatus(code = HttpStatus.BAD_REQUEST)
    public ErrorDetail handleExceptionCustomer(Exception e) {
        return new ErrorDetail("System Error", e.getMessage());
    }


}
