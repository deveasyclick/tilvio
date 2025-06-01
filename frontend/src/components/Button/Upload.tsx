type UploadButtonProps = {
  onClick: () => void;
  className?: string;
  text: string;
};

const UploadButton: React.FC<UploadButtonProps> = ({
  onClick,
  text,
  className,
}) => {
  return (
    <div>
      <button type="button" onClick={onClick} className={className}>
        {text}
      </button>
      <small className="text-gray-500 block">
        Supported: JPG, PNG files up to 2MB
      </small>
    </div>
  );
};

export default UploadButton;
