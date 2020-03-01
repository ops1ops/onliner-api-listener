import React, { useEffect, useState } from 'react';
import {
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { getCategories } from '../../../services/api';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    paddingBottom: 20,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name, categoryName, theme) => ({
  fontWeight:
    categoryName.indexOf(name) === -1
      ? theme.typography.fontWeightRegular
      : theme.typography.fontWeightMedium,
});

const MultipleSelect = (props) => {
  const { categoryName, onChange } = props;

  const classes = useStyles();
  const theme = useTheme();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      const response = await getCategories();

      setCategories(response.data);
    };

    handleFetch();
  }, []);

  const renderCategory = (selected) => (
    <div className={classes.chips}>
      {selected.map((value) => (
        <Chip key={value.key} label={value.name} className={classes.chip} />
      ))}
    </div>
  );

  const sortCategories = (array) => array
    .slice()
    .sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }

      return 0;
    });

  const renderCategories = sortCategories(categories)
    .map((item) => (
      <MenuItem
        key={item.key}
        value={item}
        style={getStyles(item.name, categoryName, theme)}
      >
        {item.name}
      </MenuItem>
    ));

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="category-filter">Filter</InputLabel>
        <Select
          labelId="category-filter"
          multiple
          value={categoryName}
          onChange={onChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={renderCategory}
          MenuProps={MenuProps}
        >
          {renderCategories}
        </Select>
      </FormControl>
    </div>
  );
};

MultipleSelect.propTypes = {
  categoryName: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MultipleSelect;
