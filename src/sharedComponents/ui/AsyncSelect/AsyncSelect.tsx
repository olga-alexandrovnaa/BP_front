
import { StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';
import AsyncCreatableSelect from 'react-select/async-creatable';
import ReactSelect from 'react-select'

export const selectCustomStyles: StylesConfig = {
  container: (provided) => ({
    ...provided,
    width: '100%',
    height: '30px'
  }),
  
  control: (provided, state) => ({
    ...provided,
    border: "none",
    minHeight: 'auto',
    boxShadow: 'none',
    backgroundColor: '#00000000',
    borderColor: '#00000000',
    ":hover": {
      border: "none",
      boxShadow: 'none'
    },
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0px'
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (provided, state) => (
    {
    ...provided,
    backgroundColor: state.isSelected ? 'rgba(174, 5, 5, 0.311)' : state.isFocused ? '#00000010' : '',
    color: '#000000',
  }),
};

export const selectCustomTheme = (theme: any) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#f3f3f3',
    primary: '#7ba7ab',
    danger: '#fffff',
    dangerLight: '#7ba7ab',
  },
  borderRadius: 4,
});


const CustomAsyncSelect: AsyncSelect = (props) => {

  return (
    <AsyncSelect
      blurInputOnSelect
      captureMenuScroll
      escapeClearsValue
      isSearchable={true}
      menuPlacement="auto"
      placeholder={''}
      noOptionsMessage={() => ''}
      loadingMessage={() => 'Загрузка...'}
      styles={selectCustomStyles}
      theme={selectCustomTheme}
      // menuPortalTarget={portal}
      {...props}
    />
  );
}

export default CustomAsyncSelect;

export const CustomAsyncCreatableSelect: AsyncCreatableSelect = (props) => {

  return (
    <AsyncCreatableSelect
      blurInputOnSelect
      captureMenuScroll
      escapeClearsValue
      isSearchable
      menuPlacement="auto"
      placeholder={''}
      noOptionsMessage={() => ''}
      loadingMessage={() => 'Загрузка...'}
      styles={selectCustomStyles}
      theme={selectCustomTheme}
      // menuPortalTarget={portal}
      {...props}
    />
  );
}

export const CustomSelect: AsyncCreatableSelect = (props) => {

  return (
    <ReactSelect
          classNamePrefix="react-select"
          closeMenuOnScroll
          closeMenuOnSelect
          instanceId={ props.instanceId }
          // absolute: корректно в списке, некорректно в модале. fixed – наоборот, проблемы в модале
          isSearchable={ false }
          menuPosition={ props.menuPosition ? props.menuPosition : 'fixed' }
          menuShouldBlockScroll={ props.menuShouldBlockScroll ? props.menuShouldBlockScroll : true }
          options={ props.options }
          styles={selectCustomStyles}
          theme={selectCustomTheme}
          { ...props }
      />
  );
}