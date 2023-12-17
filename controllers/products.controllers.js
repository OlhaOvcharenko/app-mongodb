const Product = require('../models/product.module');

exports.getAll = async (req, res) => {
  try {
    res.json(await Product.find());
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Product.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const product = await Product.findOne().skip(rand);
    if(!product) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(dep);
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  
  try {
    const product = await Product.findById(req.params.id);
    if(!product) {
      res.status(404).json({ message: 'Not found' });
    } else {
      res.json(product);
    }
  }
  catch(err)  {
    res.status(500).json({ message: err });
  };
};

exports.addNewProduct = async (req, res) => {
  try {
    const { name, client } = req.body;
    const newProduct = new Product({ name, client});
    await newProduct.save();
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.updateProduct = async (req, res) => {
  const { name, client } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(req.params.id,
      { name, client},
      { new: true, runValidators: true }
    );
    if(product) {
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if(product) {
      res.json({ message: 'OK' });
    } else {
      res.status(404).json({ message: 'Not found...' });
    }
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};
