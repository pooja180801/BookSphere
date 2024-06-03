package com.example.demo.repo;

import com.example.demo.dto.BookDto;
import com.example.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {


    List<Book> findByGenre_Genre(String genreName);
    List<Book> findByBooknameContainingIgnoreCase(String bookname);


    @Query(value = "SELECT * FROM books WHERE bookgenre = :genre ORDER BY bookprice ASC", nativeQuery = true)
    List<Book> findBooksByNameOrderedByPrice(@Param("genre") String genre);
}
