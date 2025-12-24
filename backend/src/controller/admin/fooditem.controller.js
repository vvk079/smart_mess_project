const FoodItem = require("../../models/Fooditem.model");

async function createFoodItem(req, res) {
  const {
    name,
    description,
    type,
    image,
    price,
  } = req.body;

  const foodItem = await FoodItem.create({
    name,
    description,
    type,          // Breakfast | Lunch | Dinner
    image,
    price,
  });

  res.status(201).json({
    message: "Food item created successfully",
    foodItem,
  });
}

module.exports = { createFoodItem };
