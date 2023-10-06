import React from 'react';

import ItemsTable from '../common/ItemsTable';
import { unsubscribeUserFromItem } from '../../services/api';

const UserItemsPage = () => {
  return <ItemsTable title="Subscribed items" onDelete={unsubscribeUserFromItem} />;
};

export default UserItemsPage;
