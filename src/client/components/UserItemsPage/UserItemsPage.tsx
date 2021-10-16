import React, { useEffect, useState } from 'react';

import { Container } from '@material-ui/core';
import { UserSubscriptionWithTableData } from '@root/client/types/user';
import MaterialTable, { MaterialTableProps } from 'material-table';
import { useHistory } from 'react-router';

import materialTableIcons from '../../data/materialTableIcons';
import withLoading from '../../decorators/withLoading';
import { getUserSubscriptions, unsubscribeUserFromItem } from '../../services/api';

import { PAGE_SIZES, SMALL_SIZE } from './pageSizes';

import './styles.css';

const TABLE_STYLES: MaterialTableProps<UserSubscriptionWithTableData>['style'] = {
  paddingLeft: 10,
  paddingRight: 10,
};

const TABLE_COLUMNS: MaterialTableProps<UserSubscriptionWithTableData>['columns'] = [
  { title: 'Product name', field: 'name' },
  { title: 'Price', field: 'price' },
  { title: 'Subscribed at', field: 'createdAt' },
  { title: 'Updated at', field: 'updatedAt' },
];

const TABLE_OPTIONS = { pageSizeOptions: PAGE_SIZES, pageSize: SMALL_SIZE };

const UserItemsPage = () => {
  const history = useHistory();
  const [items, setItems] = useState<UserSubscriptionWithTableData[] | []>([]);
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

  const tableActions: MaterialTableProps<UserSubscriptionWithTableData>['actions'] = [
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      icon: materialTableIcons.Delete,
      onClick: (_event, userSubscription) => {
        const {
          id,
          tableData: { id: userSubscriptionIndex },
        } = userSubscription as UserSubscriptionWithTableData;

        deleteItem(id, userSubscriptionIndex);
      },
    },
  ];

  useEffect(() => {
    const fetchUserItems = withLoading(async () => {
      const { data } = await getUserSubscriptions();

      setItems(data);
    }, setLoading);

    fetchUserItems();
  }, []);

  const redirectToItemPage: MaterialTableProps<UserSubscriptionWithTableData>['onRowClick'] = (
    _event,
    product,
  ) => {
    product && history.push(`/item/${product.key}`);
  };

  return (
    <Container className='main-container'>
      <MaterialTable<UserSubscriptionWithTableData>
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
