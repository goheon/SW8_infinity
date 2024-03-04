export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-=+\\|[\]{};:'",.<>?]).{8,24}$/;

export const phoneNumberRegex = /^(010|011|016|017|018|019)\d{3,4}\d{4}$/;
export const idRegex = /^[a-zA-Z0-9_-]{8,32}$/;

export const colorSizeRegex = /- (\w+) \/ (\w+)/;
