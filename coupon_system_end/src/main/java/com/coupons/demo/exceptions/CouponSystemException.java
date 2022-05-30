package com.coupons.demo.exceptions;

public class CouponSystemException extends Exception{
    public CouponSystemException() {
        super("General exception");
    }

    /**
     * A method coupon message
     * @param message from the throwing method
     */
    public CouponSystemException(String message) {
        super(message);
    }
}
