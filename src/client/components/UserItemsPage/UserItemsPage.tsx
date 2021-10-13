import React, { useEffect, useState } from 'react';

import { Container } from '@material-ui/core';
import { ProductType } from '@root/client/types/product';
import MaterialTable, { MaterialTableProps } from 'material-table';
import { useHistory } from 'react-router';

import materialTableIcons from '../../data/materialTableIcons';
import withLoading from '../../decorators/withLoading';
import { getUserSubscriptions, unsubscribeUserFromItem } from '../../services/api';

import { PAGE_SIZES, SMALL_SIZE } from './pageSizes';

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
  const [items, setItems] = useState<ProductType[] | []>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const deleteItem = async (itemId: number, itemTableId: number) => {
    try {
      await unsubscribeUserFromItem(itemId);

      setItems((prevItems) => [
        ...prevItems.slice(0, itemTableId),
        ...prevItems.slice(itemTableId + 1),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const tableActions: MaterialTableProps<ProductType>['actions'] = [
    {
      icon: materialTableIcons.Delete || '',
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

  const redirectToItemPage: MaterialTableProps<ProductType>['onRowClick'] = (_event, product) => {
    product && history.push(`/item/${product.key}`);
  };

  return (
    <Container className='main-container'>
      <MaterialTable<ProductType>
        actions={tableActions}
        icons={materialTableIcons}
        title='Subscribed products'
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
