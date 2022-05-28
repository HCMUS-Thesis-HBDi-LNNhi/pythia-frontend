import { Dialog } from "components/common";

export default function Instructions(): JSX.Element {
  return (
    <Dialog>
      <h1>Instructions</h1>
      <ul>
        <li>
          <input type="radio" />
          <label>Step 1: Upload customer demographic data</label>
        </li>
        <li>
          <input type="radio" />
          <label>Step 2: Upload customer transactions data</label>
        </li>
      </ul>
    </Dialog>
  );
}
