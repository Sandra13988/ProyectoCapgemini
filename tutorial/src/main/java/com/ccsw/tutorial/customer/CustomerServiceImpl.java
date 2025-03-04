package com.ccsw.tutorial.customer;

import com.ccsw.tutorial.customer.model.Customer;
import com.ccsw.tutorial.customer.model.CustomerDto;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author ccsw
 *
 */
@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepository customerRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public Customer get(Long id) {

        return this.customerRepository.findById(id).orElse(null);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Customer> findAll() {

        return (List<Customer>) this.customerRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void save(Long id, CustomerDto dto) throws Exception {

        Customer customer;

        if (id == null) {
            customer = new Customer();
        } else {
            customer = this.get(id);
        }

        // Verificar si ya existe un cliente con el mismo nombre
        Customer existingCustomer = customerRepository.findByName(dto.getName());
        if (existingCustomer != null && (id == null || !existingCustomer.getId().equals(id))) {
            throw new Exception("El cliente con el nombre " + dto.getName() + " ya existe.");
        }

        customer.setName(dto.getName());

        this.customerRepository.save(customer);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void delete(Long id) throws Exception {

        if (this.get(id) == null) {
            throw new Exception("Not exists");
        }

        this.customerRepository.deleteById(id);
    }

}