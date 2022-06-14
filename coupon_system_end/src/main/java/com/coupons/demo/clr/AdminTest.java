package com.coupons.demo.clr;

import com.coupons.demo.Util.TablePrinter;
import com.coupons.demo.beans.Category;
import com.coupons.demo.beans.Company;
import com.coupons.demo.beans.Coupon;
import com.coupons.demo.beans.Customer;
import com.coupons.demo.configuration.LoginManager;
import com.coupons.demo.repositories.CompanyRepo;
import com.coupons.demo.repositories.CouponRepo;
import com.coupons.demo.repositories.CustomerRepo;
import com.coupons.demo.services.AdminService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.util.*;

@Component
@Order(1)
@Data
@RequiredArgsConstructor

public class AdminTest implements CommandLineRunner {
    private final AdminService adminService;
    private final CouponRepo couponRepo;
    private final CompanyRepo companyRepo;
    private final CustomerRepo customerRepo;
    private final LoginManager loginManager;
    private final RestTemplate restTemplate;

    @Override
    public void run(String... args) throws Exception {
        Map<String, String> params = new HashMap<>();
        List<Coupon>couponList=new ArrayList<>();

        System.out.println("======== admin login successfully======");
        AdminService adminService = (AdminService) loginManager.login(LoginManager.ClientType.ADMINISTRATOR, "admin@admin.com", "admin");

        Coupon onePlusOne = Coupon.builder()
                .companyId(1)
                .title("one plus one")
                .price(20)
                .image("url")
                .category(Category.FOOD)
                .startDate(Date.valueOf("2022-04-01"))
                .endDate(Date.valueOf("2022-10-01"))
                .amount(5)
                .description("buy one and get one")
                .build();
        couponRepo.save(onePlusOne);

        Coupon upgrade = Coupon.builder()
                .companyId(2)
                .title("room upgrade")
                .price(199.99)
                .image("url")
                .category(Category.VACATION)
                .startDate(Date.valueOf("2022-04-01"))
                .endDate(Date.valueOf("2022-05-01"))
                .amount(3)
                .description("you can upgrade a room")
                .build();
        couponRepo.save(upgrade);

        Coupon addDay = Coupon.builder()
                .companyId(5)
                .title("extra day")
                .price(599)
                .image("url")
                .category(Category.VACATION)
                .startDate(Date.valueOf("2022-04-01"))
                .endDate(Date.valueOf("2022-05-01"))
                .amount(2)
                .description("third night at a 20 percent discount")
                .build();
        couponRepo.save(addDay);


        Coupon tenPercent = Coupon.builder()
                .companyId(5)
                .title("discount 10 percent")
                .price(40)
                .image("url")
                .category(Category.PHOTO)
                .startDate(Date.valueOf("2022-04-01"))
                .endDate(Date.valueOf("2022-05-01"))
                .amount(7)
                .description("you get a 10 percent discount")
                .build();
        couponRepo.save(tenPercent);


        Coupon chocolate = Coupon.builder()
                .companyId(5)
                .title("discount 10 percent")
                .price(19.90)
                .image("url")
                .category(Category.RESTAURANTS)
                .startDate(Date.valueOf("2022-04-01"))
                .endDate(Date.valueOf("2022-05-01"))
                .amount(10)
                .description("get 1 box chocolate cookies")
                .build();
        couponRepo.save(chocolate);
        //couponList.add(chocolate);
        //couponList.add(tenPercent);



        System.out.println("======ADD COMPANY SUCCESSFULLY=====");
        Company cookiesCompany = Company.builder()
                .name("SweeTALents")
                .email("sweetalent@gmaill.com")
                .password("Ss123456")
                //.coupons(couponList)
                .build();
        System.out.println(cookiesCompany);
        String addURL = "http://localhost:8080/admin/addCompany";
        try {
            adminService.addCompany(cookiesCompany);
            restTemplate.postForEntity(addURL, cookiesCompany, Company.class);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }

        Company HotelsCompany = Company.builder()
                .name("Tiger")
                .email("tiger@gmaill.com")
                .password("Tt123456")
                .build();
        adminService.addCompany(HotelsCompany);
        try {
            restTemplate.postForEntity(addURL, HotelsCompany, Company.class);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }

        Company clothesCompany = Company.builder()
                .name("peTal")
                .email("tal@gmail.com")
                .password("Pt123456")
                .build();
        adminService.addCompany(clothesCompany);
        try {
            restTemplate.postForEntity(addURL, clothesCompany, Company.class);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }


        Company computerCompany = Company.builder()
                .name("TAC")
                .email("TAC@gmaill.com")
                .password("Tac123456")
                .build();
        adminService.addCompany(computerCompany);
        try {
            restTemplate.postForEntity(addURL, computerCompany, Company.class);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }

        Company PhotoCompany = Company.builder()
                .name("PhoTal")
                .email("PT@walla.com")
                .password("Pt123456")
                .build();
        adminService.addCompany(PhotoCompany);
        try {
            restTemplate.postForEntity(addURL, PhotoCompany, Company.class);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }

        System.out.println("======COMPANY UPDATE=======");
        Company company = companyRepo.getById(2);
        System.out.println(" this is a demonstration of an admin updating a company's email and password - successfully");
        System.out.println("before changes:\n" + company);
        company.setEmail("test@walla.com");
        company.setPassword("22222");
        try {
        adminService.updateCompany(company);
        String addURLUpdateCompany = "http://localhost:8080/admin/updateCompany";

            restTemplate.put(addURLUpdateCompany, company);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        System.out.println("after changes:\n" + adminService.getOneCompany(2));


        System.out.println("======delete company======");
        params = new HashMap<>();
        adminService.deleteCompany(2);
        String deleteCompany = "http://localhost:8080/admin/deleteCompany/{id}";
        params.put("id", "4");
        try {
            restTemplate.delete(deleteCompany, params);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        System.out.println("deleted");

        System.out.println("======get all companies======");
        System.out.println(adminService.getAllCompanies());
        String AllCompanies = "http://localhost:8080/admin/getAllCompanies";
        ResponseEntity<Company[]> companyJason = restTemplate.getForEntity(AllCompanies, Company[].class);
        List<Company> getAllCompanies = Arrays.asList(companyJason.getBody());
        TablePrinter.print(getAllCompanies);

        System.out.println("======get one companies======");
        params = new HashMap<>();
        System.out.println(adminService.getOneCompany(3));
        String singleCompanies = "http://localhost:8080/admin/getOneCompany/{id}";
        params.put("id", "1");
        try {
            restTemplate.getForObject(singleCompanies, Company.class, params);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        System.out.println("finish");


        System.out.println("=======ADD NEW CUSTOMERS======");
        String addURLCustomer = "http://localhost:8080/admin/addCustomer";
        Customer Zeev = Customer.builder()
                .firstName("Zeev")
                .lastName("Mindali")
                .email("zeev@walla.com")
                .password("Zz1234")
                .build();
        try {
        adminService.addCustomer(Zeev);
        System.out.println(Zeev + "was added !");


            restTemplate.postForEntity(addURLCustomer, Zeev, Customer.class);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }

        Customer tal = Customer.builder()
                .firstName("Tal")
                .lastName("Edri")
                .email("tal@gmail.com")
                .password("Tt1234")
                .build();
        try {
        adminService.addCustomer(tal);
        System.out.println(tal + "was added !");

            restTemplate.postForEntity(addURLCustomer, tal, Customer.class);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        Customer maor = Customer.builder()
                .firstName("Maor")
                .lastName("Cohen")
                .email("maor@gmail.com")
                .password("234")
                .build();
        try {
            adminService.addCustomer(maor);
            System.out.println(maor + "was added !");

            restTemplate.postForEntity(addURLCustomer, maor, Customer.class);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }


        Customer mina = Customer.builder()
                .firstName("Mina")
                .lastName("Cohen")
                .email("mina@walla.com")
                .password("Mm1234")
                .build();
        try {
        adminService.addCustomer(mina);
        System.out.println(mina + "was added !");

            restTemplate.postForEntity(addURLCustomer, mina, Customer.class);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        System.out.println("======update CUSTOMER======");
        Customer anyCustomer = customerRepo.getById(1);
        System.out.println(" before changes:\n" + anyCustomer);
        anyCustomer.setFirstName("TAL");
        anyCustomer.setLastName("SHAVO");
        anyCustomer.setEmail("TAL@gmail.com");
        anyCustomer.setPassword("Ts1234");
        adminService.updateCustomer(anyCustomer);
        String addURLUpdateCustomer = "http://localhost:8080/admin/updateCustomer";
        try {
            restTemplate.put(addURLUpdateCustomer, anyCustomer);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        System.out.println("after changes:\n" + anyCustomer);

        System.out.println("=======DELETE CUSTOMER======");
        params = new HashMap<>();
        try {
            adminService.deleteCustomer(1);
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        System.out.println("Customer deleted successfully ");
        String deleteCustomer = "http://localhost:8080/admin/deleteCustomer/{id}";
        params.put("id", "3");
        restTemplate.delete(deleteCustomer, params);
        System.out.println("deleted");

        System.out.println("======GET ALL CUSTOMERS======");
        System.out.println(adminService.getAllCustomer());
        String AllCustomer = "http://localhost:8080/admin/getAllCustomer";
        ResponseEntity<Customer[]> customerJason = restTemplate.getForEntity(AllCustomer, Customer[].class);
        List<Customer> getAllCustomer = Arrays.asList(customerJason.getBody());
        TablePrinter.print(getAllCustomer);

        System.out.println("======GET CUSTOMER BY ID ======");
        params = new HashMap<>();
        try {
            System.out.println(adminService.getOneCustomer(2));
        } catch (Exception err) {
            System.out.println(err.getMessage());
        }
        String singleCustomer = "http://localhost:8080/admin/getOneCustomer/{id}";
        params.put("id", "2");
        try {
            restTemplate.getForObject(singleCustomer, Customer.class, params);
        } catch (Exception err){
                System.out.println(err.getMessage());
            }
        System.out.println("finish");


    }
}
