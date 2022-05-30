package com.coupons.demo.services;

import com.coupons.demo.exceptions.CustomerSystemException;

public abstract class ClientService {
    /**
     * A method check if the credential much to type
     * @param userName user email
     * @param password user password
     * @return if the credential much
     * @throws CustomerSystemException the credential does not much
     */
    public boolean login(String userName, String password) throws CustomerSystemException {
        return false;
    }
}
