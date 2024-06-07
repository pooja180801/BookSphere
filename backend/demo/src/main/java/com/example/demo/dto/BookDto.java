package com.example.demo.dto;

import jakarta.validation.constraints.*;
import com.example.demo.entity.Genre;

public class BookDto {

    private Integer bookId;

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    @NotBlank(message = "Book name cannot be blank")
    private String bookname;

    @NotBlank(message = "Book description cannot be blank")
    @Size(max = 500, message = "Book description cannot exceed 500 characters")
    private String bookdesc;

    @NotNull(message = "Book price cannot be null")
    @Min(value = 0, message = "Book price must be at least 0")
    private double bookprice;

    @NotBlank(message = "author name cannot be blank")
    private String authorName;
    @NotBlank(message = "imageUrl cannot be blank")
    private String imageUrl;

    @NotNull(message = "Genre cannot be null")
    private String genreName;

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
    }

    public String getBookdesc() {
        return bookdesc;
    }

    public void setBookdesc(String bookdesc) {
        this.bookdesc = bookdesc;
    }

    public double getBookprice() {
        return bookprice;
    }

    public void setBookprice(double bookprice) {
        this.bookprice = bookprice;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getGenreName() {
        return genreName;
    }

    public void setGenreName(String genreName) {
        this.genreName = genreName;
    }
}
