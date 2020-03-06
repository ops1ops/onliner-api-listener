import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import { useHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import './styles.css';

const ListProduct = (props) => {
  const { product: { id, key, name, price } } = props;
  const history = useHistory();

  const redirectToItemPage = () => history.push(`/item/${key}`);

  return (
    <ListItem
      key={id}
      className="list-container"
      button
      onClick={redirectToItemPage}
    >
      <ListItemText className="primaryText" primary={name} />
      <ListItemText className="secondaryText" secondary={price} />
    </ListItem>
  );
};

ListProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListProduct;
