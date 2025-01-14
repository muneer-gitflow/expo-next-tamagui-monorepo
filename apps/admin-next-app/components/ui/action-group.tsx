import { BlockStack, Card, Text, TextField } from '@shopify/polaris';
import { ShoppingCart, Hash } from 'lucide-react';
import { styled } from 'styled-components';

interface ActionGroupProps {
  addToCart: boolean;
  buyNow: boolean;
  quantitySelector: boolean;
  addToCartText: string;
  buyNowText: string;
  onToggleAddToCart: (value: boolean) => void;
  onToggleBuyNow: (value: boolean) => void;
  onToggleQuantity: (value: boolean) => void;
  onChangeAddToCartText: (value: string) => void;
  onChangeBuyNowText: (value: string) => void;
}

const GroupTitle = styled.div`
  padding: 4px 0;
  margin-bottom: 4px;
  font-size: 13px;
  font-weight: 500;
  color: #202223;
`;

const ActionItem = styled.div<{ enabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    width: 40px;
    height: 24px;
    background: ${(props) => (props.enabled ? '#1c1c1c' : '#e7e7e7')};
    border-radius: 12px;
    transition: background 0.2s ease;
  }

  &:before {
    content: '';
    position: absolute;
    right: ${(props) => (props.enabled ? '4px' : '20px')};
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    margin: 4px;
    transition: right 0.2s ease;
    z-index: 1;
  }
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Counter = styled.span`
  color: #6d7175;
  font-size: 13px;
  margin-right: 52px;
`;

const InputWrapper = styled.div`
  margin-left: 30px;
  margin-top: 4px;
  margin-bottom: 12px;
  max-width: 300px;
`;

export function ActionGroup({
  addToCart,
  buyNow,
  quantitySelector,
  addToCartText,
  buyNowText,
  onToggleAddToCart,
  onToggleBuyNow,
  onToggleQuantity,
  onChangeAddToCartText,
  onChangeBuyNowText,
}: ActionGroupProps) {
  return (
    <Card>
      <GroupTitle>Actions</GroupTitle>
      <BlockStack gap={'100'}>
        <ActionItem enabled={addToCart} onClick={() => onToggleAddToCart(!addToCart)}>
          <LeftSection>
            <ShoppingCart size={18} color={addToCart ? '#202223' : '#8c9196'} />
            <Text as="span" variant="bodyMd">
              Add to cart button
            </Text>
          </LeftSection>
          <Counter>11/20</Counter>
        </ActionItem>
        {addToCart ? (
          <InputWrapper>
            <TextField label="" value={addToCartText} onChange={onChangeAddToCartText} autoComplete="off" />
          </InputWrapper>
        ) : null}

        {/* <ActionItem enabled={buyNow} onClick={() => onToggleBuyNow(!buyNow)}>
          <LeftSection>
            <CreditCard size={18} color={buyNow ? '#202223' : '#8c9196'} />
            <Text as="span" variant="bodyMd">
              Buy now button
            </Text>
          </LeftSection>
          <Counter>7/20</Counter>
        </ActionItem>
        {buyNow ? (
          <InputWrapper>
            <TextField label="" value={buyNowText} onChange={onChangeBuyNowText} autoComplete="off" />
          </InputWrapper>
        ) : null} */}

        <ActionItem enabled={quantitySelector} onClick={() => onToggleQuantity(!quantitySelector)}>
          <LeftSection>
            <Hash size={18} color={quantitySelector ? '#202223' : '#8c9196'} />
            <Text as="span" variant="bodyMd">
              Quantity selector
            </Text>
          </LeftSection>
        </ActionItem>
      </BlockStack>
    </Card>
  );
}
