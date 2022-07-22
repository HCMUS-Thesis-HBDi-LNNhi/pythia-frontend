import { Field } from "formik";

import Tooltip from "../tooltip.component";

interface Props {
  children: React.ReactNode;
  groupName: string;
  value: string;
  label: string;
}

export default function Radio(props: Props): JSX.Element {
  return (
    <li className="space-x-2 flex items-center">
      <Field type="radio" name={props.groupName} value={props.value} />
      <Tooltip text={props.label} position="bottom">
        {props.children}
      </Tooltip>
    </li>
  );
}
