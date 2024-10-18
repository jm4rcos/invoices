interface InputProps {
  placeholder: string;
  value: string | number;
  onChange: (value: string | number) => void;
  type?: "number" | "text";
}

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      type={props.type || "text"}
      placeholder={props.placeholder}
      value={props.value}
      onChange={({ target }) => props.onChange(target.value)}
      className="p-2 border border-primary rounded"
    />
  );
};
