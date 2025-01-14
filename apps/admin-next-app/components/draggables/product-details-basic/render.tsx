import { Badge, Box, DescriptionList, Icon, InlineGrid, InlineStack } from '@shopify/polaris';
import { ArrowRightIcon } from '@shopify/polaris-icons';
import { Link } from '@remix-run/react';

export default function ProductDetailsBasicRender({ blockId, isActive }: { blockId: string; isActive: boolean }) {
  return (
    <InlineGrid gap={'400'}>
      <span
        style={{
          minWidth: '100%',
          height: '400px',
          background: '#f1f1f1',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/imagePlaceholder.svg"
          alt="Banner Preview"
          style={{
            width: '48px',
            height: '44px',
          }}
        />
      </span>
      <InlineGrid gap={'200'}>
        <span
          style={{
            color: '#fff',
            fontSize: '16px',
          }}
        >
          Urban Blend Long Sleeve Shirt
        </span>
        <InlineStack blockAlign="center" gap={'200'}>
          <span
            style={{
              color: '#528F65',
            }}
          >
            $185.00
          </span>
          <Badge tone="info">2,475 sold</Badge>
        </InlineStack>
      </InlineGrid>
      <InlineGrid gap={'200'}>
        <span
          style={{
            color: '#fff',
            fontSize: '13px',
            fontWeight: '700',
          }}
        >
          Size
        </span>
        <InlineStack blockAlign="center" gap={'200'}>
          <span
            style={{
              width: '40px',
              height: '40px',
              border: '#fff solid 1px',
              borderRadius: '100%',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            XS
          </span>
          <span
            style={{
              width: '40px',
              height: '40px',
              border: '#fff solid 1px',
              borderRadius: '100%',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            S
          </span>
          <span
            style={{
              width: '40px',
              height: '40px',
              border: '#fff solid 1px',
              borderRadius: '100%',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            M
          </span>
          <span
            style={{
              width: '40px',
              height: '40px',
              border: '#fff solid 1px',
              borderRadius: '100%',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#528F65',
            }}
          >
            L
          </span>
          <span
            style={{
              width: '40px',
              height: '40px',
              border: '#fff solid 1px',
              borderRadius: '100%',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            XL
          </span>
        </InlineStack>
      </InlineGrid>
      <button
        style={{
          background: '#528F65',
          color: '#fff',
          border: 'none',
          height: '45px',
          borderRadius: '8px',
          width: '100%',
          fontWeight: '700',
          cursor: 'pointer',
        }}
        type="button"
      >
        Add to Cart
      </button>
      <InlineGrid gap={'200'}>
        <span
          style={{
            color: '#fff',
            fontSize: '13px',
            fontWeight: '700',
          }}
        >
          Product Information
        </span>
        <span
          className="productInformation"
          style={{
            color: '#fff',
          }}
        >
          <style>{`
        .productInformation *{border:none !important;font-weight:normal;}
        .productInformation .Polaris-DescriptionList__Term{
        flex:0 1 35%
        }
        `}</style>
          <DescriptionList
            gap="tight"
            items={[
              {
                term: 'Material',
                description: '100% Acrylic',
              },
              {
                term: 'Care Label',
                description: 'Machine Washable',
              },
              {
                term: 'SKU',
                description: 'UBL-SS-S5-C6-245',
              },
              {
                term: 'Color',
                description: 'Vary',
              },
              {
                term: 'Neck',
                description: 'High Neck',
              },
              {
                term: 'Pattern',
                description: 'Solid',
              },
            ]}
          />
        </span>
      </InlineGrid>
      <p
        style={{
          color: '#fff',
          margin: '0',
          fontWeight: 'normal',
        }}
      >
        Elevate your style with the Urban Blend Long Sleeve Shirt, a perfect blend of urban sophistication and
        contemporary comfort. Crafted with meticulous attention to detail, this shirt is designed to make a statement in
        any setting.{' '}
        <span
          style={{
            color: '#528F65',
          }}
        >
          read more...
        </span>
      </p>
      <span
        style={{
          color: '#fff',
          fontSize: '13px',
          fontWeight: '700',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        Rating & Reviews
        <Link
          to="#"
          style={{
            color: '#528F65',
            display: 'flex',
            fontWeight: 'normal',
          }}
        >
          View All <Icon source={ArrowRightIcon} tone="success" />
        </Link>
      </span>
      <InlineGrid gap={'200'}>
        <InlineStack align="space-between" blockAlign="center">
          <span
            style={{
              color: '#fff',
              fontSize: '13px',
              fontWeight: '700',
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            You May Also Like
            <Link
              to="#"
              style={{
                color: '#528F65',
                display: 'flex',
                fontWeight: 'normal',
              }}
            >
              View All <Icon source={ArrowRightIcon} tone="success" />
            </Link>
          </span>
        </InlineStack>
        <InlineStack gap={'300'}>
          {Array.from({ length: 2 }).map((_, i) => (
            <Box width="calc(50% - 6px)" key={i}>
              <InlineGrid gap={'100'}>
                <span
                  style={{
                    minWidth: '100%',
                    height: '160px',
                    background: '#f1f1f1',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src="/imagePlaceholder.svg"
                    alt="Banner Preview"
                    style={{
                      width: '48px',
                      height: '44px',
                    }}
                  />
                </span>
                <InlineGrid>
                  <span
                    style={{
                      fontSize: '13px',
                      color: '#fff',
                      display: 'flex',
                    }}
                  >
                    Product name
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#528F65',
                      display: 'flex',
                    }}
                  >
                    Price
                  </span>
                </InlineGrid>
              </InlineGrid>
            </Box>
          ))}
        </InlineStack>
      </InlineGrid>
    </InlineGrid>
  );
}
