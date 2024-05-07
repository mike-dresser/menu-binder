import { HiCheck, HiX } from 'react-icons/hi';

function Confirm({ onConfirm, onCancel }) {
  return (
    <div>
      <span onClick={onConfirm}>
        <HiCheck />
      </span>
      <span onClick={onCancel}>
        <HiX />
      </span>
    </div>
  );
}

export default Confirm;
