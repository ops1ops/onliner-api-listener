import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MaterialTable from 'material-table';
import {
  Container,
} from '@material-ui/core';

import materialTableIcons from '../../data/materialTableIcons';
import { getUserSubscriptions, unsubscribeUserFromItem } from '../../services/api';
import './styles.css';

const tableStyle = {
  paddingLeft: 10,
  paddingRight: 10,
};

const UserItemPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const columns = [
    { title: 'Product name', field: 'name' },
    { title: 'Price', field: 'price' },
  ];

  const deleteItem = async (itemId, itemTableId) => {
    try {
      await unsubscribeUserFromItem(itemId);
      setProducts([...products.slice(0, itemTableId), ...products.slice(itemTableId + 1)]);
    } catch {
      // TODO error
    }
  };

  const Actions = [
    {
      icon: materialTableIcons.Delete,
      onClick: (event, rowData) => deleteItem(rowData.id, rowData.tableData.id),
    },
  ];

  useEffect(() => {
    const handleProductsFetch = async () => {
      try {
        setLoading(true);
        const { data } = await getUserSubscriptions();
        setProducts(data);
      } catch (error) {
        // TODO error
      } finally {
        setLoading(false);
      }
    };

    handleProductsFetch();
  }, []);

  const redirectToItemPage = (event, { key }) => history.push(`/item/${key}`);

  return (
    <Container className="main-container">
      <MaterialTable
        actions={Actions}
        icons={materialTableIcons}
        title="Subscribed products"
        columns={columns}
        data={products}
        isLoading={isLoading}
        onRowClick={redirectToItemPage}
        style={tableStyle}
      />
    </Container>
  );
};

export default UserItemPage;
