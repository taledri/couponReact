package com.coupons.demo.configuration;

import com.coupons.demo.exceptions.CustomerSystemException;
import com.coupons.demo.services.AdminService;
import com.coupons.demo.services.ClientService;
import com.coupons.demo.services.CompanyService;
import com.coupons.demo.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component
@Configuration
@RequiredArgsConstructor
public class LoginManager {
    private final AdminService adminService;
    private final CompanyService companyService;
    private final CustomerService customerService;

    public enum ClientType {
        ADMINISTRATOR, COMPANY, CUSTOMER, GUEST
    }

    /**
     * A login method checks if the details are correct
     * @param clientType hecks what client type is trying to log in
     * @param email hecks if the email is correct
     * @param password checks if the password is correct
     * @return instance of clientService
     * @throws CustomerSystemException message according to the reason of failure
     */
    public ClientService login(ClientType clientType, String email, String password) throws CustomerSystemException {
        ClientService result = null;
        switch (clientType) {
            case ADMINISTRATOR:
                result = (adminService.login(email, password)) ? (ClientService) adminService : null;
                break;
            case COMPANY:
                result = companyService.login(email, password) ? (ClientService) companyService : null;
                break;
            case CUSTOMER:
                result = customerService.login(email, password) ? (ClientService) customerService : null;
                break;
            default:
                throw new CustomerSystemException("Login failed");
        }
        if (result == null) {
            throw new CustomerSystemException("The user is " + ClientType.GUEST);
        }
        return result;


    }

}
