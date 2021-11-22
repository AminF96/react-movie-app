import { React, useState } from "react";

export default function useFormFields(inint) {
  const [fields, setFields] = useState(inint);

  function handleChange(e) {
    const { target } = e;
    setFields({
      ...fields,
      [target.name]: target.value,
    });
  }
  return { fields, handleChange };
}
