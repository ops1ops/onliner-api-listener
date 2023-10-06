import React from 'react';
import { Link } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

const ItemLink = ({path, name, ...rest}) => {
  return <Link {...rest} component={RouterLink} to={`/item/${path}`}>{name}</Link>
};

ItemLink.propTypes = {
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ItemLink;
