package com.coupons.demo.beans;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Component
public class UserDetail {
    private String password;
    private String email;
    public ClientType clientType;
    public int userId;
    //this c'tor is for authentication
    public UserDetail(String password, String email, ClientType clientType) {
        this.password = password;
        this.email = email;
        this.clientType = clientType;

    }

    ////this c'tor is for the token
    public UserDetail(String email, int userId, ClientType clientType) {
        this.email = email;
        this.userId = userId;
        this.clientType = clientType;

    }

    public UserDetail( String email, ClientType clientType) {
        this.email = email;
        this.clientType = clientType;

    }

}
