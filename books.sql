-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 13, 2024 at 11:49 AM
-- Server version: 8.0.32
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
CREATE TABLE IF NOT EXISTS `books` (
  `book_id` int NOT NULL AUTO_INCREMENT,
  `author_name` varchar(255) DEFAULT NULL,
  `book_desc` varchar(255) DEFAULT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_price` double DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `genre_id` int DEFAULT NULL,
  PRIMARY KEY (`book_id`),
  KEY `FKad8kkytqpsb8n9wmbsi0nk6ce` (`genre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`book_id`, `author_name`, `book_desc`, `book_name`, `book_price`, `image_url`, `genre_id`) VALUES
(32, 'Agatha Christie', 'A classic murder mystery novel set aboard the famous Orient Express.', 'Murder on the Orient Express', 2198, 'thriller1.jpg', 1),
(33, 'Gillian Flynn', 'A thrilling tale about a wife\'s disappearance and the dark secrets that unfold.', 'Gone Girl', 2598, 'thriller2.jpg', 1),
(34, 'Stieg Larsson', 'A gripping crime story involving a journalist and a hacker uncovering a decades-old mystery.', 'The Girl with the Dragon Tattoo', 2398, 'thriller3.jpg', 1),
(35, 'Dan Brown', 'A Harvard symbologist races to solve a murder and uncover a conspiracy that could shake the foundations of Christianity.', 'The Da Vinci Code', 2798, 'thriller4.jpg', 1),
(36, 'Arthur Conan Doyle', 'Sherlock Holmes investigates the legend of a supernatural hound haunting the Baskerville family.', 'The Hound of the Baskervilles', 1998, 'thriller5.jpg', 1),
(37, 'Isaac Asimov', 'A collection of interconnected stories exploring the relationship between robots and humans in a future world.', 'I, Robot', 1800, 'scienceFic1.jpg', 2),
(38, 'Philip K. Dick', 'In a post-apocalyptic world, a bounty hunter pursues rogue androids while questioning the nature of reality.', 'Do Androids Dream of Electric Sheep?', 1600, 'scienceFic2.jpg', 2),
(39, 'Frank Herbert', 'In a distant future, noble houses vie for control of the desert planet Arrakis, the only source of the valuable spice melange.', 'Dune', 3000, 'scienceFic3.jpg', 2),
(40, 'Arthur C. Clarke', 'An enigmatic monolith is discovered on the moon, leading to a journey to uncover its origins and purpose.', '2001: A Space Odyssey', 2200, 'scienceFic4.jpg', 2),
(41, 'Orson Scott Card', 'A young boy genius is recruited into an elite military training program to prepare for an impending alien invasion.', 'Ender\'s Game', 2000, 'scienceFic5.jpg', 2),
(42, 'J.R.R. Tolkien', 'Bilbo Baggins embarks on an unexpected adventure with dwarves to reclaim their homeland from the dragon Smaug.', 'The Hobbit', 3200, 'mystery1.jpg', 3),
(43, 'George R.R. Martin', 'Amidst the scheming noble families of Westeros, the Iron Throne is contested in a game of politics, power, and betrayal.', 'A Game of Thrones', 3400, 'mystery2.jpg', 3),
(44, 'J.K. Rowling', 'An orphaned boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry, where he faces his destiny.', 'Harry Potter and the Sorcerer\'s Stone', 3800, 'mystery3.jpg', 3),
(45, 'Patrick Rothfuss', 'A gifted musician recounts his tumultuous childhood and journey to master the arcane arts at a renowned magic school.', 'The Name of the Wind', 3000, 'mystery4.jpg', 3),
(46, 'C.S. Lewis', 'Four siblings stumble upon a magical wardrobe that transports them to the enchanting land of Narnia, where they fulfill their destinies as kings and queens.', 'The Lion, the Witch, and the Wardrobe', 2800, 'mystery5.jpg', 3),
(47, 'Jane Austen', 'In Regency-era England, Elizabeth Bennet navigates the complexities of love and class prejudice as she encounters the enigmatic Mr. Darcy.', 'Pride and Prejudice', 2200, 'romance1.webp', 4),
(48, 'Nicholas Sparks', 'An elderly man reads from a faded notebook to a woman in a nursing home, recounting the timeless love story of Noah and Allie.', 'The Notebook', 2400, 'romance2.webp', 4),
(49, 'E.L. James', 'A literature student enters a passionate but complicated relationship with a wealthy businessman, exploring the depths of desire and control.', 'Fifty Shades of Grey', 2600, 'romance3.webp', 4),
(50, 'Nora Roberts', 'A wedding planner finds love while planning her own wedding, but her past threatens to derail her happily ever after.', 'Vision in White', 2000, 'romance4.webp', 4),
(51, 'Jojo Moyes', 'A caregiver forms an unexpected bond with a paralyzed man, leading to a transformative journey of love, loyalty, and self-discovery.', 'Me Before You', 2800, 'romance5.webp', 4),
(52, 'Ken Follett', 'In 12th-century England, a master builder dreams of constructing a cathedral amidst political intrigue, war, and religious strife.', 'The Pillars of the Earth', 3600, 'histoery1.jpg', 5),
(53, 'Hilary Mantel', 'Thomas Cromwell rises from humble beginnings to become a powerful advisor to King Henry VIII, navigating the treacherous waters of Tudor politics.', 'Wolf Hall', 3000, 'histoery2.jpg', 5),
(54, 'Markus Zusak', 'In Nazi Germany, a young girl steals books and shares them with her neighbors, finding solace and hope in the power of words.', 'The Book Thief', 2600, 'histoery3.jpg', 5),
(55, 'Philippa Gregory', 'Anne Boleyn\'s ambitious sister, Mary, schemes to secure her family\'s position in the Tudor court, risking everything for love and power.', 'The Other Boleyn Girl', 2200, 'histoery4.jpg', 5),
(56, 'Khaled Hosseini', 'Set in Afghanistan, two childhood friends are torn apart by war and betrayal, only to be reunited by a journey of redemption and forgiveness.', 'The Kite Runner', 3200, 'histoery5.jpg', 5);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `FKad8kkytqpsb8n9wmbsi0nk6ce` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`genre_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
