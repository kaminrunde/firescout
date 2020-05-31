<!-- firescout-component -->

# organisms/Wishlist

Here the wishlist products will be displayed. A wishlist product can be added to the list by clicking on the heart within a ProductWidget.

This is a new line

## Handles

- **subscribe**: When clicking on the subscribe button the user inits the process to subscribe to wishlist

## States

- **login-required**: The wishlist needs the user to be logged in. If not the wishlist will show a login-screen to promt the user to login in order to see his products
- **empty**: When the user does not have any products on his wishlist we want to tell the user that he has to add products first to see his wishlist
- **filled**: The user can see his current wishlist products because he is logged in and has added some products



## Collections

- [ColorFilter](./ColorFilter/README.md)

<!--
### ColorFilter

The ColorFilter shows a list of color icons where you can select a color.

#### Handles

- **color-icon**: The color icon. You can select the color by clicking on it
- **clear-button**: Will show up if a color is selected. Clears all colors when you click on it

#### States

- **selected**: Shows up if there is a selected color



## Table

| name | description |
|------|-------------|
| **login-required** | The wishlist needs the user to be logged in. If not the wishlist will show a login-screen to promt the user to login in order to see his products |
| **empty** | When the user does not have any products on his wishlist we want to tell the user that he has to add products first to see his wishlist |
| **filled** | The user can see his current wishlist products because he is logged in and has added some products

-->