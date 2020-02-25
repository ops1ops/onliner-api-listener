import db from '../db';

const { Category } = db;

// eslint-disable-next-line import/prefer-default-export
export const getAllCategories = async (req, res) => {
  const allCategories = await Category.findAll({
    attributes: ['key', 'name'],
  });

  return res.send(allCategories);
};
