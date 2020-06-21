/* @jsx jsx */

import { Transition } from "react-spring/renderprops";
import { css, keyframes, jsx } from "@emotion/core";

export const generateItemText = (itemName, quantity) => {
  const capitalizedItemName =
    itemName.charAt(0).toUpperCase() + itemName.slice(1);
  return `${capitalizedItemName} - Quantity: ${quantity}`;
};

const pulsate = keyframes`
  0% { opacity: .3; }
  50% { opacity: 1; }
  100% { opacity: .3; }
`;

const almostOutOfStock = css`
  font-weight: bold;
  color: red;
  animation: ${pulsate} 2s infinite;
`;

export const ItemList = ({ itemList }) => {
  const items = Object.entries(itemList);

  return (
    <ul>
      <Transition
        items={items}
        initial={null}
        keys={([itemName]) => itemName}
        from={{ fontSize: 0, opacity: 0 }}
        enter={{ fontSize: 18, opacity: 1 }}
      >
        {([itemName, quantity]) => styleProps => (
          <li
            key={itemName}
            style={styleProps}
            css={quantity < 5 ? almostOutOfStock : null}
          >
            {generateItemText(itemName, quantity)}
          </li>
        )}
      </Transition>
    </ul>
  );
};
