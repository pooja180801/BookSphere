package com.example.demo.repo;

import com.example.demo.entity.DeliveryForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryFormRepository extends JpaRepository<DeliveryForm,Integer> {
}
