import React from 'react';
import { FormattedMessage } from 'react-intl';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import { CircleButton } from 'strapi-helper-plugin';
import { InputText } from '@buffetjs/core';
import { Plus } from '@buffetjs/icons';

import Wrapper from './Wrapper';

import keys from './keys';

const HeadersInput = ({ onClick, onChange, name, value, onRemove }) => {
  const handleChangeKey = (selected, name) => {
    if (selected === null) {
      onChange({ target: { name, value: '' } });
    } else {
      const { value } = selected;
      onChange({ target: { name, value } });
    }
  };

  const optionFormat = value => {
    return { value: value, label: value };
  };

  const options = keys.map(key => {
    return optionFormat(key);
  });

  const handleClick = () => {
    onClick(name);
  };

  const handleRemoveItem = index => {
    if (index === 0 && value.length === 1) {
      onRemove({ event: 'clear', index });
    } else {
      onRemove({ event: 'remove', index });
    }
  };

  return (
    <Wrapper>
      <ul>
        <li>
          <section>
            <p>
              <FormattedMessage id="Settings.webhooks.key" />
            </p>
          </section>
          <section>
            <p>
              <FormattedMessage id="Settings.webhooks.value" />
            </p>
          </section>
        </li>
        {value.map((header, index) => {
          const { key, value } = header;

          return (
            <li key={index}>
              <section>
                <CreatableSelect
                  isClearable
                  onChange={e => handleChangeKey(e, `${name}.${index}.key`)}
                  options={options}
                  name={`${name}.${index}.key`}
                  value={optionFormat(key)}
                />
              </section>
              <section>
                <InputText
                  value={value}
                  name={`${name}.${index}.value`}
                  onChange={onChange}
                />
              </section>
              <div>
                <CircleButton
                  type="button"
                  isRemoveButton
                  onClick={() => handleRemoveItem(index)}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <button onClick={handleClick} type="button">
        <Plus fill="#007eff" width="10px" />
        <FormattedMessage id="Settings.webhooks.create.header" />
      </button>
    </Wrapper>
  );
};

HeadersInput.defaultProps = {
  handleClick: () => {},
  onClick: () => {},
  onRemove: () => {},
};

HeadersInput.propTypes = {
  handleClick: PropTypes.func,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
  value: PropTypes.array,
};

export default HeadersInput;
