//Dependencies
import gql from "graphql-tag";

//querie for adding new users
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//querie for loging in for existing users
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

//querie for saving books to users saved book list
export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!) {
    saveBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

//querie for removing books from users saved book list
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        # _id
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;
