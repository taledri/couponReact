package com.coupons.demo.exceptions;

public class CustomerSystemException extends Exception{

    public CustomerSystemException() {
        super("General exception");
    }

    /**
     *A method with a customer message
     * @param message from the throwing method
     */
    public CustomerSystemException (String message){
        super(message);
    }
}
