package com.coupons.demo.clr;

import com.coupons.demo.Util.TablePrinter;
import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.Company;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.beans.Customer;
import com.coupons.demo.configuration.LoginManager;
import com.coupons.demo.services.CompanyService;
import com.coupons.demo.services.CustomerService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Order(3)
@RequiredArgsConstructor
@Data
public class CustomerTest implements CommandLineRunner {
    private final LoginManager loginManager;
    private final CompanyService companyService;
    private final RestTemplate restTemplate;

    @Override
    public void run(String... args) throws Exception {
        Map<String, String> params = new HashMap<>();

        System.out.println("======LOGIN AS CUSTOMER SUCCESSFULLY======");
        CustomerService customerService = (CustomerService) loginManager.login(LoginManager.ClientType.CUSTOMER,"mina@walla.com", "Mm1234");

        Coupon coupon = Coupon.builder()
                .companyId(3)
                .title(" spa")
                .description("choosing a massage from the list")
                .startDate(Date.valueOf("2022-06-01"))
                .endDate(Date.valueOf("2022-08-29"))
                .amount(50)
                .price(159.99)
                .image("beautifulWorld.img")
                .category(Category.VACATION)
                .build();
        try {
        companyService.addCoupon(coupon);

        System.out.println("======PURCHASE COUPON SUCCESSFULLY===");
        customerService.purchaseCoupon(coupon.getId());
        Map<String, Integer> param3 = new HashMap<>();
        String addURL = "http://localhost:8080/customer/purchaseCoupon/{id}";
        param3.put("id",coupon.getId());

            restTemplate.postForEntity(addURL, coupon.getId(), Coupon.class, param3);
        }catch (Exception err) {
             System.out.println(err.getMessage());}


        System.out.println("====GET ALL CUSTOMER COUPONS BY CATEGORY===");
        Map<String, Category> param1 = new HashMap<>();
        try {
        customerService.getCustomerCouponByCategory(coupon.getCategory());
        String customerCouponCategory = "http://localhost:8080/customer/getCustomerCouponByCategory/{category}";
        param1.put("category",coupon.getCategory());

        ResponseEntity<Coupon[]>customerCouponCategoryJason=restTemplate.getForEntity(customerCouponCategory, Coupon[].class, param1);
        List<Coupon> getCustomerCouponByCategory= Arrays.asList(customerCouponCategoryJason.getBody());
        TablePrinter.print(getCustomerCouponByCategory);
       }catch (Exception err) {
            System.out.println(err.getMessage());
        }

        System.out.println("===GET ALL COUPONS CUSTOMER BUY UP TO SOME PRICE=== ");
        Map<String, Double> param = new HashMap<>();
        try {
            customerService.getCustomerCouponByMaxPrice(coupon.getPrice());
            String customerCouponMaxPrice = "http://localhost:8080/customer/getCustomerCouponByMaxPrice/{price}";
            param.put("price", coupon.getPrice());
            ResponseEntity<Coupon[]> customerCouponMAXpRICEJason = restTemplate.getForEntity(customerCouponMaxPrice, Coupon[].class, param);
            List<Coupon> getCustomerCouponByMaxPrice = Arrays.asList(customerCouponMAXpRICEJason.getBody());
            TablePrinter.print(getCustomerCouponByMaxPrice);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }


        System.out.println("==GET ALL CUSTOMER DETAILS==");
        System.out.println(customerService.getCustomerDetails());
        String AllCustomerDetails="http://localhost:8080/students/getStudentByName/{name}";
      try {
          restTemplate.getForEntity(AllCustomerDetails, Customer[].class);
      }catch (Exception err) {
          System.out.println(err.getMessage());
      }
        System.out.println("finish");
}}