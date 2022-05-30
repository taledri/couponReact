package com.coupons.demo.repositories;

import com.coupons.demo.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepo extends JpaRepository<Company,Integer> {
    Optional<Company> findByEmail(String email);

    /**
     * A method check if company exits by name
     * @param name company name
     * @return if company exits by name
     */
    boolean existsByName(String name);

    /**
     * A method check if company exits by email
     * @param email company email
     * @return if company exits by email
     */
    boolean existsByEmail(String email);

    /**
     * A method find  company  by email and password
     * @param email company email
     * @param password company password
     * @return Company found by email and password
     */
    Company findByEmailAndPassword(String email,String password);
}
