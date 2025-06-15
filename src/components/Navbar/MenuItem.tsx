interface MenuItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        px-4
        py-3
        text-[--foreground]
        cursor-pointer
        hover:bg-[--border]
        hover:text-[--foreground]
        transition
        select-none
      "
    >
      {children}
    </div>
  );
};

export default MenuItem;
