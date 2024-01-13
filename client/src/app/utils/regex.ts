export const REGEX_TEMPLATES = {
  EMAIL:
    /^([A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+)(;[A-Za-z0-9.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+)*$/,
  PASSWORD: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
};
