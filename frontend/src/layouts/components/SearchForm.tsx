import { memo } from 'react';
import IconInput from '../../components/Input/IconInput';

/**
 * Search form component for the main header
 */
const SearchForm = memo(() => (
  <form action="#" method="GET" className="hidden md:block md:pl-2">
    <label htmlFor="topbar-search" className="sr-only">
      Search
    </label>
    <IconInput
      iconName="search"
      name="search"
      placeholder="Search"
      type="text"
      id="topbar-search"
      inputClassName="text-input"
    />
  </form>
));

export default SearchForm;
