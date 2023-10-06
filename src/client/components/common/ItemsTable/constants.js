import { renderName } from "./renders";

const SMALL_SIZE = 20;
const MEDIUM_SIZE = 50;
const LARGE_SIZE = 100;

const PAGE_SIZES = [SMALL_SIZE, MEDIUM_SIZE, LARGE_SIZE];

export const TABLE_STYLES = {
  paddingLeft: 10,
  paddingRight: 10,
};

const formatDate = (dateString) => new Date(dateString).toLocaleString();

export const TABLE_COLUMNS = [
  { title: 'Product name', field: 'name', render: renderName },
  { title: 'Price', field: 'price' },
  { title: 'Subscribed at', field: 'createdAt', render: (rowData) => formatDate(rowData.createdAt) },
  { title: 'Updated at', field: 'updatedAt', defaultSort: 'desc', render: (rowData) => formatDate(rowData.updatedAt) },
];

export const TABLE_OPTIONS = { pageSizeOptions: PAGE_SIZES, pageSize: SMALL_SIZE };
