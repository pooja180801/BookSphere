package com.example.demo.services;

import com.example.demo.common.APIresponse;
import com.example.demo.dto.JwtResponseDto;
import com.example.demo.dto.SignInDto;
import com.example.demo.dto.SignUpDto;
import com.example.demo.entity.User;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {


    ResponseEntity<JwtResponseDto> saveUser(SignUpDto userdto);
    public boolean existsByUsername(String username);
    public boolean existsByEmailId(String emailId);
    public User toEntity(SignUpDto userDto);

    public ResponseEntity<JwtResponseDto> loginUser(SignInDto userDto);

    public User getUserFromJwt(String jwt);

    ResponseEntity<APIresponse> getLoggedInUserProfile(User user);

    User findUserById(Integer userId);
}
