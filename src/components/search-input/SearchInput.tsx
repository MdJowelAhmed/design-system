import { forwardRef, useEffect, useRef } from 'react';
import { Search } from '../../icons/set';
import { mergeRefs } from '../../utils';
import { Input } from '../input/Input';
import type { SearchInputProps } from './SearchInput.types';

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      onSearch,
      debounceMs = 0,
      clearable = true,
      placeholder = 'Search...',
      value,
      defaultValue,
      onChange,
      onKeyDown,
      onClear,
      ...props
    },
    forwardedRef,
  ) => {
    const isControlled = value !== undefined;

    // Ref to the DOM node, used to read the current value on Enter key
    // without storing the string in component state.
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
      return () => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
      };
    }, []);

    function getCurrentValue() {
      return isControlled
        ? String(value ?? '')
        : (inputRef.current?.value ?? '');
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      onChange?.(e);

      if (onSearch && debounceMs > 0) {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(
          () => onSearch(e.target.value),
          debounceMs,
        );
      }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter' && onSearch) {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        onSearch(getCurrentValue());
      }
      onKeyDown?.(e);
    }

    function handleClear() {
      onSearch?.('');
      onClear?.();
    }

    return (
      <Input
        ref={mergeRefs(inputRef, forwardedRef)}
        type="search"
        leftIcon={<Search />}
        clearable={clearable}
        placeholder={placeholder}
        {...(isControlled ? { value } : { defaultValue })}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onClear={handleClear}
        {...props}
      />
    );
  },
);

SearchInput.displayName = 'SearchInput';
