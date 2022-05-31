# Semester Project 2

![image](https://ce.accelr.dev/wp-content/uploads/2022/05/Skjermbilde-2022-05-30-120908.png)

Create an e-commerce website that has both customer-facing and admin sections. Both sections should be responsive and the website will be populated by a Strapi API supplied by Noroff.

## Description

- Build a frontend with home, product list, product detail and cart pages.
- Build admin pages to create, update and delete products.
- The website must be responsive on all devices.
- Building a checkout and payment system is not a part of the project.
- 
### "/" must include
- A hero banner with an image that is uploaded to Strapi. 
- A list of featured products. On Strapi products can be marked as ‘featured’. When a product is marked as ‘featured’ it should be displayed on the homepage.

### "/products" must include
- A list of all products added to Strapi. Each product must display its title, price and image. The product should link to its products detail page.
- A search text box. When searching (filtering), only the products that include the searched text in their title or description should be listed.

### "/detail"
This page is reached by a user clicking on a product on the product list page. The product details page must include:
- title
- description
- image
- price
- an add to cart button. This will toggle the product in and out of a cart array stored in local storage.

### "/cart"
Cart/Basket page
The cart/basket page must display a list of all products added to the cart. Load the items that have been added to local storage and display them on the page. If the cart is empty display a message indicating this.

Each product in the cart must display:
- title
- price
- a link to the product view page
- image

After the list of products, display the total price of all the products in the cart.<br/>
Note: the cart page is not a checkout page. No payments or user details are required to be taken.

### "/login"
Create an admin login form that allows administrator users to login. Use local storage to keep the user logged in.<br/>
When logged in, display a logout button in the layout that logs the user out. Logging out should not clear the cart.

### "add/edit"
Create form(s) that allow products to be added and edited. The form must allow the user to toggle whether a product is featured.<br/>
Allow products to be deleted. Before a product is deleted you must display a confirmation dialog. The product should only be deleted if the user confirms.

## Built With

- [Sass]((https://sass-lang.com/)

## Getting Started

### Installing

1. Clone the repo:

```bash
git clone git@github.com:CharlotteEssajee/sem-pro-2_charlotte-essajee.git
```

2. Install the dependencies:

```
npm i
```

### Running

To run the app, run the following commands:

```bash
install live server and go live
```

Go to:

```
http://127.0.0.1:5503/
```

If you want to test the login/admin panel you need to have your own local installation of the Strapi project.<br/>
[Local Strapi]((https://github.com/NoroffFEU/strapi-sp2)

```
Follow instructions in .readme
```

User credentials<br/>
email: admin@admin.com<br/>
username: admin<br/>
password: Pass1234

## Contributing

Make sure to open a pull request so code can be reviewed.

## Contact

Reach out to me!

[My Instagram page](https://instagram.com/essajee)

[My LinkedIn page](https://linkedin.com/in/charlotte-essajee-67aa39226)
