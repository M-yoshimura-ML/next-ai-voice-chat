type SelectItemProps = {
    value: string;
    children: React.ReactNode;
  };
  
  export const SelectItem = ({ value, children }: SelectItemProps) => (
    <option value={value}>{children}</option>
  );
  