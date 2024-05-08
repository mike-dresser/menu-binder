import { HiCheck, HiX } from 'react-icons/hi';
import Button from '../Button';

function Confirm({ onConfirm, onCancel }) {
  return (
    <div className="confirm">
      <Button type="closeIcon" action={onConfirm}>
        <HiCheck />
      </Button>
      <Button type="closeIcon" action={onCancel}>
        <HiX />
      </Button>
    </div>
  );
}

export default Confirm;
