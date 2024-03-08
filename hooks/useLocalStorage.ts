import React from "react";

//using typescipt genetics to take two parameters, key and initialState
//function (value: T) to update state
const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  //getting stored value from browser's  localStorage
  const storedValue = localStorage.getItem(key);
  //checking if there is a stored value, if there is parse through it else return initial value
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  //create state to store and update value
  const [value, setValue] = React.useState<T>(initial);

  //taking a newValue and updating it
  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  //return value & updateValue
  return [value, updateValue];
};

export default useLocalStorage;
