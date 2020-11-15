import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MaterialTable from 'material-table';
import {
  Container,
} from '@material-ui/core';

import materialTableIcons from '../../data/materialTableIcons';
import { getUserSubscriptions, unsubscribeUserFromItem } from '../../services/api';
import { PAGE_SIZES, SMALL_SIZE } from './pageSizes';
import withLoading from '../../decorators/withLoading';

import './styles.css';

const TABLE_STYLES = {
  paddingLeft: 10,
  paddingRight: 10,
};

const TABLE_COLUMNS = [
  { title: 'Product name', field: 'name' },
  { title: 'Price', field: 'price' },
  { title: 'Subscribed at', field: 'createdAt' },
  { title: 'Updated at', field: 'updatedAt' },
];

const TABLE_OPTIONS = { pageSizeOptions: PAGE_SIZES, pageSize: SMALL_SIZE };

const UserItemsPage = () => {
  const history = useHistory();
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const deleteItem = async (itemId, itemTableId) => {
    try {
      await unsubscribeUserFromItem(itemId);

      setItems((prevItems) => [...prevItems.slice(0, itemTableId), ...prevItems.slice(itemTableId + 1)]);
    } catch (error) {
      console.error(error);
    }
  };

  const tableActions = [
    {
      icon: materialTableIcons.Delete,
      onClick: (_event, { id, tableData: { dataId } }) => deleteItem(id, dataId),
    },
  ];

  useEffect(() => {
    const fetchUserItems = withLoading(async () => {
      const { data } = await getUserSubscriptions();

      setItems(data);
    }, setLoading);

    fetchUserItems();
  }, []);

  const redirectToItemPage = (event, { key }) => history.push(`/item/${key}`);

  return (
    <Container className="main-container">
      <MaterialTable
        actions={tableActions}
        icons={materialTableIcons}
        title="Subscribed products"
        columns={TABLE_COLUMNS}
        data={items}
        isLoading={isLoading}
        onRowClick={redirectToItemPage}
        style={TABLE_STYLES}
        options={TABLE_OPTIONS}
      />
    </Container>
  );
};

export default UserItemsPage;
