import type { IndexFiltersProps, TabProps } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import {
  Button,
  Icon,
  Select,
  TextField,
  IndexTable,
  LegacyCard,
  IndexFilters,
  useSetIndexFiltersMode,
  useIndexResourceState,
  Text,
  ChoiceList,
  RangeSlider,
  Badge,
  useBreakpoints,
} from '@shopify/polaris';
import { ChevronLeftIcon } from '@shopify/polaris-icons';
// import Select from 'react-select';
import { wrap } from 'module';

export default function AppListingInfo() {
  const customStyles = {
    label: {
      fontSize: '18px',
      fontWeight: '700',
    },
    inputControl: {
      height: '53px',
      borderRadius: '13px',
      padding: '0 10px',
      fontSize: '16px',
      marginTop: '15px',
      border: '#8A8A8A solid 1px',
    },
  };
  // const [selected1, setSelected1] = useState('');
  // const [selected, setSelected] = useState('');

  // const handleSelectChange1 = useCallback((value: string) => setSelected1(value), []);
  // const handleSelectChange = useCallback((value: string) => setSelected(value), []);

  // const sortSelected = [
  //   { label: 'Sort by', value: '' },
  //   { label: 'Today', value: 'today' },
  //   { label: 'Yesterday', value: 'yesterday' },
  //   { label: 'Last 7 days', value: 'lastWeek' },
  // ];
  // const sortSelected1 = [
  //   { label: 'Status', value: '' },
  //   { label: 'Today', value: 'today' },
  //   { label: 'Yesterday', value: 'yesterday' },
  //   { label: 'Last 7 days', value: 'lastWeek' },
  // ];

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  const [itemStrings, setItemStrings] = useState(['All', 'Unpaid', 'Open', 'Closed', 'Local delivery', 'Local pickup']);
  const deleteView = (index: number) => {
    const newItemStrings = [...itemStrings];
    newItemStrings.splice(index, 1);
    setItemStrings(newItemStrings);
    setSelected(0);
  };

  const duplicateView = async (name: string) => {
    setItemStrings([...itemStrings, name]);
    setSelected(itemStrings.length);
    await sleep(1);
    return true;
  };

  const tabs: TabProps[] = itemStrings.map((item, index) => ({
    content: item,
    index,
    onAction: () => {},
    id: `${item}-${index}`,
    isLocked: index === 0,
    actions:
      index === 0
        ? []
        : [
            {
              type: 'rename',
              onAction: () => {},
              onPrimaryAction: async (value: string): Promise<boolean> => {
                const newItemsStrings = tabs.map((item, idx) => {
                  if (idx === index) {
                    return value;
                  }
                  return item.content;
                });
                await sleep(1);
                setItemStrings(newItemsStrings);
                return true;
              },
            },
            {
              type: 'duplicate',
              onPrimaryAction: async (value: string): Promise<boolean> => {
                await sleep(1);
                duplicateView(value);
                return true;
              },
            },
            {
              type: 'edit',
            },
            {
              type: 'delete',
              onPrimaryAction: async () => {
                await sleep(1);
                deleteView(index);
                return true;
              },
            },
          ],
  }));
  const [selected, setSelected] = useState(0);
  const onCreateNewView = async (value: string) => {
    await sleep(500);
    setItemStrings([...itemStrings, value]);
    setSelected(itemStrings.length);
    return true;
  };
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    { label: 'Order', value: 'order asc', directionLabel: 'Ascending' },
    { label: 'Order', value: 'order desc', directionLabel: 'Descending' },
    { label: 'Customer', value: 'customer asc', directionLabel: 'A-Z' },
    { label: 'Customer', value: 'customer desc', directionLabel: 'Z-A' },
    { label: 'Date', value: 'date asc', directionLabel: 'A-Z' },
    { label: 'Date', value: 'date desc', directionLabel: 'Z-A' },
    { label: 'Total', value: 'total asc', directionLabel: 'Ascending' },
    { label: 'Total', value: 'total desc', directionLabel: 'Descending' },
  ];
  const [sortSelected, setSortSelected] = useState(['order asc']);
  const { mode, setMode } = useSetIndexFiltersMode();
  const onHandleCancel = () => {};

  const onHandleSave = async () => {
    await sleep(1);
    return true;
  };

  const primaryAction: IndexFiltersProps['primaryAction'] =
    selected === 0
      ? {
          type: 'save-as',
          onAction: onCreateNewView,
          disabled: false,
          loading: false,
        }
      : {
          type: 'save',
          onAction: onHandleSave,
          disabled: false,
          loading: false,
        };
  const [accountStatus, setAccountStatus] = useState<string[] | undefined>(undefined);
  const [moneySpent, setMoneySpent] = useState<[number, number] | undefined>(undefined);
  const [taggedWith, setTaggedWith] = useState('');
  const [queryValue, setQueryValue] = useState('');

  const handleAccountStatusChange = useCallback((value: string[]) => setAccountStatus(value), []);
  const handleMoneySpentChange = useCallback((value: [number, number]) => setMoneySpent(value), []);
  const handleTaggedWithChange = useCallback((value: string) => setTaggedWith(value), []);
  const handleFiltersQueryChange = useCallback((value: string) => setQueryValue(value), []);
  const handleAccountStatusRemove = useCallback(() => setAccountStatus(undefined), []);
  const handleMoneySpentRemove = useCallback(() => setMoneySpent(undefined), []);
  const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
  const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
  const handleFiltersClearAll = useCallback(() => {
    handleAccountStatusRemove();
    handleMoneySpentRemove();
    handleTaggedWithRemove();
    handleQueryValueRemove();
  }, [handleAccountStatusRemove, handleMoneySpentRemove, handleQueryValueRemove, handleTaggedWithRemove]);

  const filters = [
    {
      key: 'accountStatus',
      label: 'Account status',
      filter: (
        <ChoiceList
          title="Account status"
          titleHidden
          choices={[
            { label: 'Enabled', value: 'enabled' },
            { label: 'Not invited', value: 'not invited' },
            { label: 'Invited', value: 'invited' },
            { label: 'Declined', value: 'declined' },
          ]}
          selected={accountStatus || []}
          onChange={handleAccountStatusChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'taggedWith',
      label: 'Tagged with',
      filter: (
        <TextField
          label="Tagged with"
          value={taggedWith}
          onChange={handleTaggedWithChange}
          autoComplete="off"
          labelHidden
        />
      ),
      shortcut: true,
    },
    {
      key: 'moneySpent',
      label: 'Money spent',
      filter: (
        <RangeSlider
          label="Money spent is between"
          labelHidden
          value={moneySpent || [0, 500]}
          prefix="$"
          output
          min={0}
          max={2000}
          step={1}
          onChange={handleMoneySpentChange}
        />
      ),
    },
  ];

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];
  if (accountStatus && !isEmpty(accountStatus)) {
    const key = 'accountStatus';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, accountStatus),
      onRemove: handleAccountStatusRemove,
    });
  }
  if (moneySpent) {
    const key = 'moneySpent';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, moneySpent),
      onRemove: handleMoneySpentRemove,
    });
  }
  if (!isEmpty(taggedWith)) {
    const key = 'taggedWith';
    appliedFilters.push({
      key,
      label: disambiguateLabel(key, taggedWith),
      onRemove: handleTaggedWithRemove,
    });
  }

  const orders = [
    {
      id: '1020',
      order: (
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          #1020
        </Text>
      ),
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1019',
      order: (
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          #1019
        </Text>
      ),
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: (
        <Text as="span" variant="bodyMd" fontWeight="semibold">
          #1018
        </Text>
      ),
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(orders);

  const rowMarkup = orders.map(({ id, order, date, customer, total, paymentStatus, fulfillmentStatus }, index) => (
    <IndexTable.Row id={id} key={id} selected={selectedResources.includes(id)} position={index}>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="bold" as="span">
          {order}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{date}</IndexTable.Cell>
      <IndexTable.Cell>{customer}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text as="span" alignment="end" numeric>
          {total}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
      <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
    </IndexTable.Row>
  ));
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        minHeight: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          padding: '20px',
          borderBottom: '#EBEBEB solid 1px',
          margin: '-20px -20px 0',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            display: 'flex',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          <Icon source={ChevronLeftIcon} tone="base" />
          Create a Segmentation
        </span>
        <div
          style={{
            display: 'flex',
            gap: '20px',
          }}
        >
          <TextField label="" placeholder="Search Campaign" autoComplete="off" />
          {/* <Select label="" options={options1} onChange={handleSelectChange1} value={sortSelected} />
          <Select label="" options={options} onChange={handleSelectChange} value={sortSelected1} /> */}
        </div>
      </div>

      <div
        style={{
          width: '100%',
          flexDirection: 'column',
          display: 'flex',
          gap: '25px',
          paddingRight: '20px',
          maxWidth: '690px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label style={customStyles.label}>Segmentation Name</label>
          <input style={customStyles.inputControl} type="text" autoComplete="off" maxLength={30} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label style={customStyles.label}>Segment Type</label>
          <input style={customStyles.inputControl} type="text" autoComplete="off" maxLength={30} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label style={customStyles.label}>Amount</label>
          <input style={customStyles.inputControl} type="text" autoComplete="off" maxLength={30} />
        </div>
      </div>
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        queryValue={queryValue}
        queryPlaceholder="Searching in all"
        onQueryChange={handleFiltersQueryChange}
        onQueryClear={() => setQueryValue('')}
        onSort={setSortSelected}
        primaryAction={primaryAction}
        cancelAction={{
          onAction: onHandleCancel,
          disabled: false,
          loading: false,
        }}
        tabs={tabs}
        selected={selected}
        onSelect={setSelected}
        canCreateNewView
        onCreateNewView={onCreateNewView}
        filters={filters}
        appliedFilters={appliedFilters}
        onClearAll={handleFiltersClearAll}
        mode={mode}
        setMode={setMode}
      />
      <IndexTable
        condensed={useBreakpoints().smDown}
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
        onSelectionChange={handleSelectionChange}
        headings={[
          { title: 'Order' },
          { title: 'Date' },
          { title: 'Customer' },
          { title: 'Total', alignment: 'end' },
          { title: 'Payment status' },
          { title: 'Fulfillment status' },
        ]}
      >
        {rowMarkup}
      </IndexTable>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}
      >
        <Button variant="primary">Create Segment</Button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        <img style={{ marginBottom: '10px' }} src="/pushCampaignsNoResult.png" />
        <Text as="h5" variant="headingLg" fontWeight="bold">
          No Result Find
        </Text>
        <Text as="span" variant="bodySm">
          Please Click on a create campaign button to continue
        </Text>
        <Button variant="primary">Create a Push Campaign</Button>
      </div>
    </div>
  );

  function disambiguateLabel(key: string, value: string | any[]): string {
    switch (key) {
      case 'moneySpent':
        return `Money spent is between $${value[0]} and $${value[1]}`;
      case 'taggedWith':
        return `Tagged with ${value}`;
      case 'accountStatus':
        return (value as string[]).map((val) => `Customer ${val}`).join(', ');
      default:
        return value as string;
    }
  }

  function isEmpty(value: string | string[]): boolean {
    if (Array.isArray(value)) {
      return value.length === 0;
    } else {
      return value === '' || value == null;
    }
  }
}
