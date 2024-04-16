# BookCart -Jeewan Ghimire

## Modules

### Core
- **Books**
- **Seller**

### Shared
- **Auth**

## Components

### Core
#### Books
- **Book**
#### Auth
- **Login**
- **Signup**
#### Seller
- **Create**
- **Delete**
- **Retrieve**
- **Update**
- **Cart**
- **mypipe (Custom Pipe created)**

### Shared
- **Navbar**
- **Footer**

## Types(Structure)

- **auth** (LoginForm, RegisterForm)
- **book**
  - **cartitems** (implements book with new variable quantity)

## Storage Mechanism

- **LocalStorage:** 
  - `book.services` implements local storage to update or retrieve `book[]` from the local storage, stored as 'books'.
- **SessionStorage:** 
  - `cart.services` implements session storage to add books into cart as a session item named 'cart'. Cart is reset on logout.

## Input and Output Operators

- Mapped Books and Book as parent and child using `@Output` and `@Input`, with output to emit the book and input to get the books.
- Similarly mapped Search and Books component to print the Book from Books component which match search parameter. Searched book is returned to Books using `@Input`.

## Angular Forms and Form Validation

- Forms for register and login inside the auth module with various Angular conditions (e.g., `ngIf`, `ngModel`) for form manipulation.
- Implemented `FormsModule`.
- Used Firebase email/password as the authentication mechanism.

## Services

- **AuthService**
- **CartService**
- **CurdService**
- **SearchService**
- **BookService**

## Observables

- Created a function `getLocalBooks()` in `book.services` which gets books in the form of Observables.

## Subscriptions

- Search service uses subscription to subscribe the books from the `BookServices` and uses pipes to filter the books for search functionality.
- Subscriptions are consumed by `SearchComponent`. Unsubscribed on destroy.

## Lazy Loading

- Lazy loading added to the seller page, accessible only to authorized users with `isSeller=true`.

## Auth Guard

- Two auth guards created: `AuthGuard` and `SellerGuard`.
  - `AuthGuard` checks `isAuthenticated` from `AuthServices` for access to the cart component.
  - `SellerGuard` checks `isSeller` from `AuthServices` specifically in LoginComponent for access to the seller component.


## Search Service

- Since search was to be integreated into Books directly used SearchServices in BooksComponent to perform search functionality
- There are two Searches one which is Responsible to list in home page another which works as a component
