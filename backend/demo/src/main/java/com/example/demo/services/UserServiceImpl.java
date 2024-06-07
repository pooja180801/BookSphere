package com.example.demo.services;

import com.example.demo.common.APIresponse;
import com.example.demo.dto.JwtResponseDto;
import com.example.demo.dto.SignInDto;
import com.example.demo.dto.SignUpDto;
import com.example.demo.entity.Cart;
import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.exceptions.AccessDeniedException;
import com.example.demo.exceptions.UserAlreadyExistsException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.repo.UserRepository;
//import com.example.demo.security.EncryptionConfig;
import com.example.demo.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;
    @Autowired
    APIresponse response;

    @Autowired
    JwtUtils jwtUtils;


    @Autowired
    PasswordEncoder passwordEncoder;


    @Autowired
    AuthenticationManager authenticationManager;





    @Override
    public ResponseEntity<JwtResponseDto> saveUser(SignUpDto userdto) {

        JwtResponseDto response = new JwtResponseDto();

        try {
            if (existsByUsername(userdto.getUsername())) {
                throw new UserAlreadyExistsException("Registration Failed: username is already taken!");
            }
            if (existsByEmailId(userdto.getEmail())) {
                throw new UserAlreadyExistsException("Registration Failed: Email is already taken!");
            }

            User user = toEntity(userdto);
            User savedUser = userRepository.save(user);

            String token = jwtUtils.generateJWT(user);


            response.setStatus(HttpStatus.CREATED.value());
            response.setToken(token);
            response.setUser(savedUser);
            response.setMessage("User registered successfully");


        } catch (UserAlreadyExistsException e) {
            throw e;
        } catch (Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setError("An unexpected error occurred: " + e.getMessage());
        }
        return ResponseEntity.status(response.getStatus()).body(response);

    }

    public boolean existsByEmailId(String emailId) {
        return userRepository.existsByEmail(emailId);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public User toEntity(SignUpDto userDto) {
        User user = new User();

        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setRole(Role.USER);


        return user;
    }


    @Override
    public ResponseEntity<JwtResponseDto> loginUser(SignInDto userDto) {
        JwtResponseDto response = new JwtResponseDto();


        try {
            //authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getEmail(),userDto.getPassword()));

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDto.getEmail(), userDto.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            User user = userRepository.findByEmail(userDto.getEmail()).orElseThrow(() -> new UserNotFoundException("user not found"));



            String token = jwtUtils.generateJWT(user);
            System.out.println(token);


            response.setStatus(HttpStatus.OK.value());
            response.setToken(token);
            response.setUser(user);
            response.setExpirationTime("24hr");
            response.setMessage("Successfully signed in");

        } catch (AuthenticationException e) {
            // Log authentication exception
            System.out.println("Authentication failed: " + e.getMessage());
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setError("Invalid Username or Password");
        } catch (UserNotFoundException e) {
            // Log user not found exception
            System.out.println("User not found: " + e.getMessage());
            response.setStatus(HttpStatus.NOT_FOUND.value());
            response.setError("User not found");
        } catch (Exception e) {

            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setError("An unexpected error occurred during user login");
        }

        return ResponseEntity.status(response.getStatus()).body(response);
    }


//    private Authentication authenticate(String email, String password) {
//        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
//
//
//
//        if (userDetails == null) {
//            throw new BadCredentialsException("Invalid Username");
//        }
//
//        if (!encryptionConfig.verifyPassword(password, userDetails.getPassword())) {
//            throw new BadCredentialsException("Invalid Password");
//        }
//
//
//        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
//    }


    @Override
    public ResponseEntity<APIresponse> getLoggedInUserProfile(User user) {
        response.setData(user);
        response.setStatus(HttpStatus.OK.value());

        return ResponseEntity.status(response.getStatus()).body(response);
    }

    public User findUserProfileByJwt(String jwt, UserDetails userDetails) {
        if (jwtUtils.isTokenValid(jwt, userDetails)) {
            String username = jwtUtils.getUsername(jwt);
            Optional<User> user = userRepository.findByEmail(username);
            if (user == null) {
                throw new AccessDeniedException("User not found with the provided JWT");
            }
            return user.get();
        } else {
            throw new AccessDeniedException("Invalid JWT token");
        }
    }

    public User getUserFromJwt(String authHeader) {
        String jwt = extractJwtFromHeader(authHeader);
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return findUserProfileByJwt(jwt, userDetails);
    }

    private String extractJwtFromHeader(String authHeader) {
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        } else {
            throw new AccessDeniedException("Invalid Authorization header");
        }
    }



    @Override
    public User findUserById(Integer userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with ID " + userId + " not found"));
    }




}


