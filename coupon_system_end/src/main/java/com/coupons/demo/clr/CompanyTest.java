package com.coupons.demo.clr;

import com.coupons.demo.Util.TablePrinter;
import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.Company;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.configuration.LoginManager;
import com.coupons.demo.repositories.CouponRepo;
import com.coupons.demo.services.CompanyService;
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
@Order(2)
@RequiredArgsConstructor
@Data
public class CompanyTest implements CommandLineRunner {
    private CompanyService companyService;
    private final LoginManager loginManager;
    private final CouponRepo couponRepo;
    private final RestTemplate restTemplate;

    @Override
    public void run(String... args) throws Exception {
        Map<String, String> params = new HashMap<>();
        System.out.println("------------ company login ----------");
        System.out.println("$$$$$$$$$$$$ company login successfully$$$$$$$");
        System.out.println("------------ company login ----------");



        CompanyService companyService = (CompanyService) loginManager.login(LoginManager.ClientType.COMPANY, "tal@gmail.com", "Pt123456");

        System.out.println("======ADD NEW COUPON======");
        Coupon coupon = Coupon.builder()
                .companyId(3)
                .title("spa8")
                .description("choosing a massage from the list")
                .startDate(Date.valueOf("2022-06-01"))
                .endDate(Date.valueOf("2022-08-29"))
                .amount(50)
                .price(159.99)
                .image("tal")
                .category(Category.VACATION)
                .build();

        companyService.addCoupon(coupon);

        System.out.println(coupon);
        String addURL = "http://localhost:8080/company/addCoupon";
        try{
            restTemplate.postForEntity(addURL, coupon, Coupon.class);
        }catch (Exception err) {
                System.out.println(err.getMessage());
            }
        System.out.println("==============update coupon=============");

        Coupon anyCoupon = couponRepo.getById(6);
        anyCoupon.setAmount(8);
        anyCoupon.setDescription(" buy a weekend you get a free massage package");
        anyCoupon.setStartDate(Date.valueOf("2022-05-05"));
        anyCoupon.setEndDate(Date.valueOf("2023-08-05"));
        anyCoupon.setImage("url");
        anyCoupon.setCategory(Category.VACATION);
        anyCoupon.setPrice(151.00);
        anyCoupon.setTitle("extra day");
        System.out.println(coupon);
        companyService.updateCoupon(anyCoupon);
        String addURLUpdateCoupon = "http://localhost:8080/company/updateCoupon";
        try {
            restTemplate.put(addURLUpdateCoupon, anyCoupon);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        System.out.println(anyCoupon);

        System.out.println("============All Company COUPONS  ============");
        System.out.println(companyService.getAllCoupons());
        String AllCoupons = "http://localhost:8080/company/getAllCoupons";
        ResponseEntity<Coupon[]> allcompanyJason = restTemplate.getForEntity(AllCoupons, Coupon[].class);
        List<Coupon> getAllCoupons = Arrays.asList(allcompanyJason.getBody());
        TablePrinter.print(getAllCoupons);

        System.out.println("=========GET ALL COMPANY COUPONS BY CATEGORY==========");
        Map<String, Category> param = new HashMap<>();
        System.out.println(companyService.getAllCouponsByCategory(Category.VACATION));
        String AllCouponsByCategory = "http://localhost:8080/company/getAllCouponsByCategory/{category}";
        param.put("category", coupon.getCategory());
        ResponseEntity<Coupon[]> companyJason = restTemplate.getForEntity(AllCouponsByCategory, Coupon[].class,param);
        List<Coupon> getAllCouponsByCategory = Arrays.asList(companyJason.getBody());
        TablePrinter.print(getAllCouponsByCategory);

        System.out.println("=========GET ALL COMPANY COUPONS MAX PRICE==========");
        Map<String, Double> param2 = new HashMap<>();
        System.out.println(companyService.getAllCouponsByPrice(200));
        String AllCouponsByPrice = "http://localhost:8080/company/getAllCouponsByPrice/{maxPrice}";
        param2.put("maxPrice", coupon.getPrice());
        try {
       restTemplate.getForEntity(AllCouponsByPrice, Coupon[].class, param2);
        }catch (Exception err) {
            System.out.println(err.getMessage());
        }
        System.out.println("max price done");




        System.out.println("============DELETE COUPON=============");
        params = new HashMap<>();
        companyService.deleteCoupon(6);
        System.out.println("Company Coupons after delete:\n" + companyService.getAllCoupons());
        String deleteCoupon="http://localhost:8080/company/deleteCoupon/{id}";
        params.put("id","6");
        try {
            restTemplate.delete(deleteCoupon, params);
        }catch (Exception err) {
            System.out.println(err.getMessage());
        }
        System.out.println("deleted");

        System.out.println("========GET ALL COMPANY DETAILS===========");
        System.out.println(companyService.getCompanyDetails());
        String getCompanyDetails="http://localhost:8080/company/getCompanyDetails";
        try {
             restTemplate.getForEntity(getCompanyDetails, Company[].class);
        }catch (Exception err) {
            System.out.println(err.getMessage());}
        System.out.println("company finish");
    }

}
