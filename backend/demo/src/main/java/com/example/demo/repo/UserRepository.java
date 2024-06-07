package com.example.demo.repo;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    boolean existsByUsername(String user_name);

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);

    User findByUsername(String username);
}