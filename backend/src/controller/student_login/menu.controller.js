const DailyMenu = require("../../models/DailyMenu.model");

async function viewTodayMenu(req, res) {
  const today = new Date().toISOString().split("T")[0];

  const menus = await DailyMenu.find({
    date: today,
    isActive: true,
  }).populate("foodItems");

  if (!menus.length) {
    return res.status(404).json({
      message: "No menu available today",
    });
  }

  res.status(200).json(menus);
}

async function viewWeeklyMenu(req, res) {
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 7);

  const menus = await DailyMenu.find({
    date: {
      $gte: today.toISOString().split("T")[0],
      $lte: endDate.toISOString().split("T")[0],
    },
    isActive: true,
  }).populate("foodItems");

  res.status(200).json(menus);
}

module.exports = { viewTodayMenu ,
                   viewWeeklyMenu,
};
