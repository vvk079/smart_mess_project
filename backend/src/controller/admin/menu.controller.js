const DailyMenu = require("../../models/DailyMenu.model");
const FoodItem = require("../../models/Fooditem.model");

async function createDailyMenu(req, res) {
  const { date, type } = req.body; 
  // type = Breakfast | Lunch | Dinner

  const alreadyExists = await DailyMenu.findOne({ date, type });
  if (alreadyExists) {
    return res.status(400).json({
      message: "Menu already exists for this date & meal",
    });
  }

  const menu = await DailyMenu.create({
    date,
    type,
    foodItems: [],
    isActive: true,
  });

  res.status(201).json({
    message: "Daily menu created",
    menu,
  });
}

async function addFoodItemToMenu(req, res) {
  const { menuId } = req.params;
  const { foodItemId } = req.body;

  const menu = await DailyMenu.findById(menuId);
  if (!menu) {
    return res.status(404).json({ message: "Menu not found" });
  }

  const foodItem = await FoodItem.findById(foodItemId);
  if (!foodItem || !foodItem.isAvailable) {
    return res.status(400).json({
      message: "Food item not available",
    });
  }

  if (menu.foodItems.includes(foodItemId)) {
    return res.status(400).json({
      message: "Food item already added",
    });
  }

  menu.foodItems.push(foodItemId);
  await menu.save();

  res.status(200).json({
    message: "Food item added to menu",
    menu,
  });
}

async function updateMenuStatus(req, res) {
  const { menuId } = req.params;
  const { isActive } = req.body;

  const menu = await DailyMenu.findById(menuId);
  if (!menu) {
    return res.status(404).json({ message: "Menu not found" });
  }

  menu.isActive = isActive;
  await menu.save();

  res.status(200).json({
    message: "Menu status updated",
    menu,
  });
}




module.exports = { createDailyMenu ,
                   addFoodItemToMenu,
                   updateMenuStatus
              
};
