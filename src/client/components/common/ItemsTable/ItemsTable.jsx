import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import {
  Container,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import materialTableIcons from '../../../data/materialTableIcons';
import { getUserSubscriptions, getAllItems } from '../../../services/api';
import withLoading from '../../../decorators/withLoading';
import { TABLE_COLUMNS, TABLE_OPTIONS, TABLE_STYLES } from './constants';

import './styles.css';

const ItemsTable = ({ isAll, title, actions, onDelete }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const deleteItem = async (itemId, itemTableId) => {
    try {
      await onDelete(itemId);

      setItems((prevProducts) => [...prevProducts.slice(0, itemTableId), ...prevProducts.slice(itemTableId + 1)]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAction = onDelete && {
    icon: materialTableIcons.Delete,
    onClick: (_event, { id, tableData: { dataId } }) => deleteItem(id, dataId),
  };

  const tableActions = [
    ...actions,
    deleteAction,
  ].filter(Boolean);

  useEffect(() => {
    const fetchItems = withLoading(async () => {
      const getItems = isAll ? getAllItems : getUserSubscriptions;
      const { data } = await getItems();

      setItems(data);
    }, setLoading);

    fetchItems();
  }, []);

  return (
    <Container className="main-container">
      <MaterialTable
        actions={tableActions}
        icons={materialTableIcons}
        title={title}
        columns={TABLE_COLUMNS}
        data={items}
        isLoading={isLoading}
        style={TABLE_STYLES}
        options={TABLE_OPTIONS}
      />
    </Container>
  );
};

ItemsTable.defaultProps = {
  isAll: false,
  actions: [],
  title: undefined,
  onDelete: undefined,
};

ItemsTable.propTypes = {
  isAll: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  onDelete: PropTypes.func,
};

export default ItemsTable;
