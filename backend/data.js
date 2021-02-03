import bcrypt from 'bcryptjs'

export const data = {
  users: [{
      name: 'Kevin',
      email: 'kevin@admin.com',
      password: bcrypt.hashSync('259899Ecommerce', 8),
      isAdmin: true,
      isSeller: true,
      seller: {
        name: 'Saleik Store',
        logo: '/img/spooky.jpg',
        description: 'Best Seller',
        rating: 4.5,
        numReviews: 120
      }
    },
    {
      name: 'John',
      email: 'john@user.com',
      password: bcrypt.hashSync('1234John', 8),
      isAdmin: false
    },
    {
      name: "Desiree",
      email: "desiree@user.com",
      password: bcrypt.hashSync('1234Desiree', 8),
      isAdmin: false
    },
    {
      name: "Sosa",
      email: "sosa@user.com",
      isAdmin: false,
      password: bcrypt.hashSync('1234Sosa', 8)
    }
  ],
  products: [{
      name: "Meadrine Blue Fit Shirt",
      category: "Shirts",
      image: "/img/p1.jpg",
      price: 80,
      countInStock: 10,
      brand: "Meadrine",
      rating: 0,
      numReviews: 0,
      description: "High Quality Product"
    },
    {
      name: "Jules Red Shirt",
      category: "Shirts",
      image: "/img/p2.jpg",
      price: 50,
      countInStock: 20,
      brand: "Jules",
      rating: 0,
      numReviews: 0,
      description: "High Quality Product"
    },
    {
      name: "Celio Shirt",
      category: "Shirts",
      image: "/img/p3.jpg",
      price: 220,
      countInStock: 0,
      brand: "Celio",
      rating: 0,
      numReviews: 0,
      description: "High Quality Product"
    },
    {
      name: "Gap Slim Pants Chino",
      category: "Pants",
      image: "/img/p4.jpg",
      price: 80,
      countInStock: 15,
      brand: "Gap",
      rating: 0,
      numReviews: 0,
      description: "High quality product"
    },
    {
      name: "Bonobo Slim Pants Chino",
      category: "Pants",
      image: "/img/p5.jpg",
      price: 75,
      countInStock: 7,
      brand: "Bonobo",
      rating: 0,
      numReviews: 0,
      description: "High Quality Product"
    },
    {
      name: "Eden Park Blue Shirt ",
      image: "/img/p1.jpg",
      price: 150,
      category: "Shirts",
      brand: "Eden Park",
      countInStock: 33,
      rating: 0,
      numReviews: 0,
      description: "Quality brand"
    },
    {
      name: "Levi's Pants",
      image: "/img/p6.jpg",
      price: 100,
      category: "Pants",
      brand: "Levi's Strauss",
      countInStock: 18,
      rating: 0,
      numReviews: 0,
      description: "High Quality Product"
    },
    {
      name: "Gapo Red Shirt",
      image: "/img/p1.jpg",
      price: 55,
      category: "Shirts",
      brand: "Gapo",
      countInStock: 53,
      rating: 0,
      numReviews: 0,
      description: "Eco Quality Shirt"
    },
    {
      name: "Puma Sneakers",
      image: "/img/sneakers.jpg",
      price: 200,
      category: "Shoes",
      brand: "Puma",
      countInStock: 26,
      rating: 0,
      numReviews: 0,
      description: "Quality Sneakers"
    }
  ]
};