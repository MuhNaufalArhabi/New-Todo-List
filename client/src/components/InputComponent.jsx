export default function InputComponent({
  label,
  type,
  placeholder,
  value,
  name,
  change,
}) {
    console.log(change, value)
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={change}
        value={value}
      />
    </>
  );
}
