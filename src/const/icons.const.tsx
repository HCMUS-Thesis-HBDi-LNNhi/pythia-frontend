import { Icon } from "@iconify/react";

const outline = {
  account: <Icon icon="ic:outline-account-circle" />,
  home: <Icon icon="bx:home" />,
  analytic: <Icon icon="carbon:analytics" />,
  logout: <Icon icon="ic:outline-logout" />,
  google: <Icon icon="ant-design:google-outlined" />,
  guest: <Icon icon="fluent:guest-16-regular" />,
  plus: <Icon icon="akar-icons:circle-plus" />,
};

const solid = {
  account: <Icon icon="ic:baseline-account-circle" />,
  home: <Icon icon="bxs:home" />,
  prediction: <Icon icon="ic:baseline-batch-prediction" />,
  login: <Icon icon="ic:outline-login" />,
  logout: <Icon icon="ic:baseline-logout" />,
  google: <Icon icon="ant-design:google-circle-filled" />,
  guest: <Icon icon="fluent:guest-16-filled" />,
  plus: <Icon icon="akar-icons:circle-plus-fill" />,
};

const colored = {
  google: <Icon icon="flat-color-icons:google" />,
};

const icons = { outline, solid, colored };

export default icons;
