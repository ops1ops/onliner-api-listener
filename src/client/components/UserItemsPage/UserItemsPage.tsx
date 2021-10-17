import React, { useEffect, useState } from "react";

import MaterialTable, { MaterialTableProps } from "@material-table/core";
import { SvgIconComponent } from "@mui/icons-material";
import { Container } from "@mui/material";
import { UserSubscriptionType } from "@root/client/types/user";
import { useHistory } from "react-router";

import materialTableIcons from "../../data/materialTableIcons";
import withLoading from "../../decorators/withLoading";
import { getUserSubscriptions, unsubscribeUserFromItem } from "../../services/api";

import { PAGE_SIZES, SMALL_SIZE } from "./pageSizes";

import "./styles.css";

const TABLE_STYLES: MaterialTableProps<UserSubscriptionType>["style"] = {
  paddingLeft: 10,
  paddingRight: 10,
};

const TABLE_COLUMNS: MaterialTableProps<UserSubscriptionType>["columns"] = [
  { title: "Product name", field: "name" },
  { title: "Price", field: "price" },
  { title: "Subscribed at", field: "createdAt" },
  { title: "Updated at", field: "updatedAt" },
];

const TABLE_OPTIONS = { pageSizeOptions: PAGE_SIZES, pageSize: SMALL_SIZE };

const UserItemsPage = () => {
  const history = useHistory();
  const [userSubscriptions, setUserSubscriptions] = useState<UserSubscriptionType[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const deleteItem = async (itemId: number) => {
    try {
      await unsubscribeUserFromItem(itemId);

      setUserSubscriptions(userSubscriptions.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error(error);
    }
  };

  const tableActions: MaterialTableProps<UserSubscriptionType>["actions"] = [
    {
      icon: materialTableIcons.Delete as unknown as SvgIconComponent,
      onClick: async (_event, userSubscription) => {
        const { id } = userSubscription as UserSubscriptionType;

        await deleteItem(id);
      },
    },
  ];

  useEffect(() => {
    const fetchUserItems = withLoading(async () => {
      const { data } = await getUserSubscriptions();

      setUserSubscriptions(data);
    }, setLoading);

    fetchUserItems();
  }, []);

  const redirectToItemPage: MaterialTableProps<UserSubscriptionType>["onRowClick"] = (
    _event,
    product,
  ) => {
    product && history.push(`/item/${product.key}`);
  };

  return (
    <Container className='main-container'>
      <MaterialTable<UserSubscriptionType>
        actions={tableActions}
        icons={materialTableIcons}
        title='Subscribed products'
        columns={TABLE_COLUMNS}
        data={userSubscriptions}
        isLoading={isLoading}
        onRowClick={redirectToItemPage}
        style={TABLE_STYLES}
        options={TABLE_OPTIONS}
      />
    </Container>
  );
};

export default UserItemsPage;
