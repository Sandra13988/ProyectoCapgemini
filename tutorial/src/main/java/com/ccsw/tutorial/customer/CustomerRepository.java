package com.ccsw.tutorial.customer;

import com.ccsw.tutorial.customer.model.Customer;
import org.springframework.data.repository.CrudRepository;

/**
 * @author ccsw
 *
 */
public interface CustomerRepository extends CrudRepository<Customer, Long> {

    Customer findByName(String name);
    
}