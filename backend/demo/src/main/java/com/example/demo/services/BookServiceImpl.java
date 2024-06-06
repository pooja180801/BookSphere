package com.example.demo.services;

import com.example.demo.common.APIresponse;
import com.example.demo.common.PaginationMeta;
import com.example.demo.data.BookPagination;
import com.example.demo.dto.BookDto;
import com.example.demo.dto.GenreDto;
import com.example.demo.entity.Book;
import com.example.demo.entity.Genre;
import com.example.demo.exceptions.BookNotFoundException;
import com.example.demo.exceptions.GenreNotFoundException;
import com.example.demo.exceptions.IllegalArgumentException;
import com.example.demo.repo.BookRepository;
import com.example.demo.repo.GenreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService{

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private GenreRepository genreRepository;

    @Autowired
    private GenreService genreService;

    @Autowired
    private APIresponse response;

    @Autowired
    private PaginationMeta paginationMeta;

    @Autowired
    private BookPagination bookPagination;

    @Override
    public ResponseEntity<APIresponse> viewAllBooks() {

        List<Book> books = new ArrayList<>();


        try {

                books = bookRepository.findAll();

                if (books.isEmpty())
                    throw new BookNotFoundException("No book found");


            List<BookDto> bookDtos = books.stream()
                    .map(this::toDto)
                    .collect(Collectors.toList());

            response.setStatus(HttpStatus.OK.value());
            response.setData(bookDtos);

        }
        catch (BookNotFoundException e){
            throw e;
        }
        catch (Exception e){
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setError("An error occurred while fetching books: " + e.getMessage());

        }
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @Override
    public ResponseEntity<APIresponse> addBooks(Book book,int gid) {


        try {
            Genre genre = genreRepository.findById(gid).orElseThrow(() -> new GenreNotFoundException("genre with the " + gid + " is not found"));
            book.setGenre(genre);
            Book savedBook=bookRepository.save(book);

            response.setStatus(HttpStatus.OK.value());
            response.setData(savedBook);
        }catch (IllegalArgumentException e){
            throw e;
        }
        catch (GenreNotFoundException e){
            throw e;
        }
        catch (Exception e){
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setError("An unexpected error occurred: " +e.getMessage());
        }
        return ResponseEntity.status(response.getStatus()).body(response);

    }

    @Override
    public Book viewById(int bid) {

            Book bookById = bookRepository.findById(bid).orElseThrow(() -> new BookNotFoundException("book with the" + bid + "is not found"));
            return bookById;

    }

    @Override
    public Book updateBook(Book book) {
        return bookRepository.save(book);

    }

    @Override
    public String deleteBook(int bid) {
        bookRepository.deleteById(bid);
        return "deleted successfully";
    }

    @Override
    public List<Book> findBooksByNameOrderedByPrice(String genre) {
        return bookRepository.findBooksByNameOrderedByPrice(genre);
    }

    @Override
    public Book toEntity(BookDto bookDto) {
        Book book=new Book();

        book.setBookname(bookDto.getBookname());
        book.setBookdesc(bookDto.getBookdesc());
        book.setBookprice(bookDto.getBookprice());
        return book;
    }

    @Override
    public BookDto toDto(Book book) {
        BookDto bookDto=new BookDto();
        bookDto.setBookId(book.getBookId());
        bookDto.setBookname(book.getBookname());
        bookDto.setBookdesc(book.getBookdesc());
        bookDto.setBookprice(book.getBookprice());
        bookDto.setAuthorName(book.getAuthor());
        bookDto.setImageUrl(book.getImageUrl());

        GenreDto genreDto=new GenreDto();
        if(book.getGenre()!=null) {
            genreDto.setGenreid(book.getGenre().getGid());
            genreDto.setGenrename(book.getGenre().getGenre());
        }
        else {
            genreDto.setGenreid(null);
            genreDto.setGenrename(null);
        }
        bookDto.setGenreName(genreDto.getGenrename());

        return bookDto;



    }



    @Override
    public ResponseEntity<APIresponse> filterByGenre() {
        Set<String> genreNames = new HashSet<>();
        APIresponse response = new APIresponse();

        try {
            List<Book> allBooks = bookRepository.findAll();

            for (Book book : allBooks) {
                genreNames.add(book.getGenre().getGenre());
            }

            Map<String, List<BookDto>> genreBooksMap = new HashMap<>();


            for (String genre : genreNames) {
                List<Book> booksByGenre = bookRepository.findByGenre_Genre(genre);

                if (booksByGenre.isEmpty()) {
                    throw new BookNotFoundException("No books with genre " + genre + " found");
                }

                List<BookDto> bookDtos = booksByGenre.stream()
                        .map(this::toDto)
                        .collect(Collectors.toList());

                genreBooksMap.put(genre, bookDtos);
            }

            response.setStatus(HttpStatus.OK.value());
            response.setData(genreBooksMap);
        } catch (BookNotFoundException e) {
            response.setStatus(HttpStatus.NOT_FOUND.value());
            response.setError(e.getMessage());
        } catch (Exception e) {
            response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.setError("An error occurred while fetching books: " + e.getMessage());
        }

        return ResponseEntity.status(response.getStatus()).body(response);
    }


    @Override
    public ResponseEntity<APIresponse> pagination(Pageable pageable) {

        Page<Book> bookPage=bookRepository.findAll(pageable);

        PaginationMeta paginationData=paginationMeta.toPaginationMeta(bookPage);
        List<Book> books=bookPage.getContent();

        bookPagination.setBooks(books);
        bookPagination.setPaginationMeta(paginationData);


        response.setData(bookPagination);
        response.setStatus(HttpStatus.OK.value());

        return ResponseEntity.status(response.getStatus()).body(response);

    }

    public ResponseEntity<APIresponse> searchProductsByBookName(String bookname) {
        APIresponse response=new APIresponse();
        List<Book> books=bookRepository.findByBooknameContainingIgnoreCase(bookname);
        if(books!=null&& !books.isEmpty()){

            response.setStatus(HttpStatus.OK.value());
            response.setData(books);
        }
        else{
            response.setStatus(HttpStatus.NOT_FOUND.value());
            response.setMessage("No products found with that search!!!");
        }
        return ResponseEntity.status(response.getStatus()).body(response);
    }


}
