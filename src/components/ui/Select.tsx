import { forwardRef, useState, useRef, useEffect, useCallback, type SelectHTMLAttributes } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, value, onChange, name, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s/g, '-');
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<string>((value as string) ?? '');
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync external value → internal
    useEffect(() => {
      if (value !== undefined) setInternalValue(value as string);
    }, [value]);

    const currentValue = value !== undefined ? (value as string) : internalValue;
    const selectedOption = options.find((o) => o.value === currentValue);
    const displayLabel = selectedOption?.label || placeholder || 'Select...';

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      function handleClickOutside(e: MouseEvent) {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    // Close on Escape
    useEffect(() => {
      if (!open) return;
      function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Escape') setOpen(false);
      }
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open]);

    const handleSelect = useCallback((optionValue: string) => {
      setInternalValue(optionValue);
      onChange?.({ target: { value: optionValue, name: name } });
      setOpen(false);
    }, [onChange, name]);

    return (
      <div className={cn('relative w-full', label && '')} ref={containerRef}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-foreground mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Hidden native select for form/ref compatibility */}
        <select
          ref={ref}
          id={selectId}
          name={name}
          value={currentValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            onChange?.({ target: { value: e.target.value, name } });
          }}
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom trigger button */}
        <button
          type="button"
          onClick={() => !props.disabled && setOpen(!open)}
          className={cn(
            'relative flex w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none',
            'focus:border-ring focus:ring-[3px] focus:ring-ring/50',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'h-9',
            open && 'border-ring ring-[3px] ring-ring/50',
            error && 'ring-destructive/20 border-destructive',
            !selectedOption?.value && 'text-muted-foreground',
            selectedOption?.value && 'text-foreground',
            className
          )}
        >
          <span className="truncate">{displayLabel}</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
              open && 'rotate-180'
            )}
          />
        </button>

        {/* Dropdown panel */}
        {open && (
          <div
            className="absolute left-0 right-0 z-50 mt-1 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-lg"
            style={{ animation: 'selectFadeIn 150ms ease-out' }}
          >
            <div className="max-h-60 overflow-y-auto py-1">
              {options.map((option) => {
                const isSelected = option.value === currentValue;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      'flex w-full items-center gap-2 px-3 py-2 text-sm outline-none transition-colors cursor-pointer',
                      'hover:bg-accent hover:text-accent-foreground',
                      isSelected && 'bg-accent/60 font-medium'
                    )}
                  >
                    <span className="w-4 shrink-0 flex items-center justify-center">
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </span>
                    <span className="truncate">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

        {/* Inline keyframe for dropdown animation */}
        {open && (
          <style>{`
            @keyframes selectFadeIn {
              from { opacity: 0; transform: translateY(-4px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
