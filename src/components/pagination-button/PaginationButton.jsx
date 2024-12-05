import { Button } from "../ui/button";

const PaginationButton = ({ label, onClick, disabled }) => {
  return (
    <Button
      className={`${
        disabled && "cursor-not-allowed bg-gray-300 text-gray-500 border"
      }`}
      onClick={onClick}
      disabled={disabled}
      variant="secondary"
    >
      {label}
    </Button>
  );
};

export default PaginationButton;
