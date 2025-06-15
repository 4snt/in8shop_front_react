interface FormWrapProps {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const FormWrap = ({
  children,
  className = "",
  contentClassName = "",
}: FormWrapProps) => {
  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div
        className={`w-full max-w-[650px] flex flex-col items-center ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FormWrap;
