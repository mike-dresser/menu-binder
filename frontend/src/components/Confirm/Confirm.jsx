import { HiCheck, HiX } from 'react-icons/hi';

function Confirm({ onConfirm, onCancel }) {
  return (
    <div className="confirm">
      <span className="closeIcon" onClick={onConfirm}>
        <HiCheck />
      </span>
      <span className="closeIcon" onClick={onCancel}>
        <HiX />
      </span>
    </div>
  );
}

export default Confirm;
