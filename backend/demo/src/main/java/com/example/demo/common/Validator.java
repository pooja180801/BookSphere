//package com.example.demo.common;
//
//import com.example.demo.dto.SignUpDto;
//import com.example.demo.entity.Book;
//import org.springframework.stereotype.Component;
//
//
//@Component
//public class Validator {
//
//
//    public void bookValidator(Book book) {
//        if (book == null) {
//            throw new IllegalArgumentException("Book cannot be null");
//        }
//
//        if (book.getBookname() == null || book.getBookname().isEmpty()) {
//            throw new IllegalArgumentException("Book name cannot be empty or null");
//        }
//
//        if (book.getBookprice() == null) {
//            throw new IllegalArgumentException("Book price cannot be empty");
//        }
//
//        if (book.getBookprice() <= 0) {
//            throw new IllegalArgumentException("Book price must be greater than zero");
//        }
//    }
//
//    public void userValidator(SignUpDto userDto){
//        if(userDto==null){
//            throw new IllegalArgumentException("User cannot be empty");
//        }
//        if(userDto.getUser_name() == null || userDto.getUser_name().isEmpty()){
//            throw new IllegalArgumentException("Username cannot be empty");
//        }
//        if(userDto.getEmail_id()==null || userDto.getEmail_id().isEmpty()){
//            throw new IllegalArgumentException("Email cannot be empty");
//        }
//        if(userDto.getPassword() == null || userDto.getPassword().isEmpty()){
//            throw new IllegalArgumentException("Password cannot be empty");
//        }
//        if(userDto.getPassword().length()<8){
//            throw new IllegalArgumentException("Password must contain atleast 8 characters");
//        }
//        String emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
//        if (!userDto.getEmail_id().matches(emailPattern)) {
//            throw new IllegalArgumentException("Email is not valid");
//        }
//
//
//    }
//
//
//}
