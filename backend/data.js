import bcrypt from 'bcryptjs'

export const data = {
  users: [{
      name: 'Kevin',
      email: 'admin@admin.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true
    },
    {
      name: 'John',
      email: 'user@user.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false
    }
  ],
  products: [{
      name: 'Nike Fit Shirt',
      category: 'Shirts',
      image: '/img/p1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'High quality product',
    },
    {
      name: 'Adidas Fit Shirt',
      category: 'Shirts',
      image: '/img/p2.jpg',
      price: 100,
      countInStock: 20,
      brand: 'Adidas',
      rating: 4.0,
      numReviews: 10,
      description: 'High quality product',
    },
    {
      name: 'Lacoste Free Shirt',
      category: 'Shirts',
      image: '/img/p3.jpg',
      price: 220,
      countInStock: 0,
      brand: 'Lacoste',
      rating: 4.8,
      numReviews: 17,
      description: 'High quality product',
    },
    {
      name: 'Nike Slim Pants',
      category: 'Pants',
      image: '/img/p4.jpg',
      price: 78,
      countInStock: 15,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 14,
      description: 'High quality product',
    },
    {
      name: 'Puma Slim Pants',
      category: 'Pants',
      image: '/img/p5.jpg',
      price: 65,
      countInStock: 5,
      brand: 'Puma',
      rating: 3,
      numReviews: 10,
      description: 'High quality product',
    },
    {
      name: 'Adidas Fit Pants',
      category: 'Pants',
      image: '/img/p6.jpg',
      price: 139,
      countInStock: 12,
      brand: 'Adidas',
      rating: 4.5,
      numReviews: 15,
      description: 'High quality product',
    },
  ]
}