import { Field, ErrorMessage } from "formik";

type Props = {
  name: string;
  type?: string;
  placeholder: string;
  className?: string;
};

export default function FormInput({
  name,
  type = "text",
  placeholder,
  className = "",
}: Props) {
  return (
    <div>
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-300 ${className}`}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
}
