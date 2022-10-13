export const SignUpType = {
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  SELF_REGISTRATION: "SELF_REGISTRATION",
} as const;

export type TSignUpBtn = keyof typeof SignUpType;

export const SignUpBtnText: Record<TSignUpBtn, string> = {
  [SignUpType.ADD_EMPLOYEE]: "Add new Employee",
  [SignUpType.SELF_REGISTRATION]: "Register",
};
