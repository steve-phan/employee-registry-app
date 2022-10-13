export const SignUpType = {
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  SELF_REGISTRATION: "SELF_REGISTRATION",
} as const;

export type TSignUpBtn = keyof typeof SignUpType;

export const SignUpBtnText: Record<TSignUpBtn, string> = {
  [SignUpType.ADD_EMPLOYEE]: "Add new Employee",
  [SignUpType.SELF_REGISTRATION]: "Register",
};

export const noWhiteSpace = {
  validator: (_: any, value: any) =>
    !value.includes(" ") ? Promise.resolve() : Promise.reject(),

  message: "The username does not contain whitespace, please",
};
