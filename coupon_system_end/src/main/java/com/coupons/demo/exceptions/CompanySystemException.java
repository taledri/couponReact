package com.coupons.demo.exceptions;

public class CompanySystemException extends Exception{
    public CompanySystemException() {
        super("General exception");
    }

    /**
     * A method company message
     * @param message from the throwing method
     */
    public CompanySystemException(String message) {
        super(message);
    }
}
