import db from '../db';

const { Category } = db;

export const getAllCategories = async (req, res) => {
  const allCategories = await Category.findAll({
    attributes: ['key', 'name'],
  });

  return res.send(allCategories);
};
