import Link from "next/link";

const SideItem = ({ href, icon: Icon, currentPath, label }: NavItem) => {

  const isActive = currentPath === href;
  
  
  // Active and Base classes
  const baseClasses = `hover:bg-darkWhite hover:text-darkBlack duration-300`;
  const activeClasses = `bg-darkWhite text-darkBlack`;

  return (
    <Link href={href} className={`${isActive ? activeClasses : baseClasses} w-full rounded-[2rem] flex gap-x-2 py-3 px-6 items-center`}>
      <Icon size="24" variant={isActive ? "Bold" : "Outline"} />
      <p className="font-semibold">{label}</p>
    </Link>
  );
};

export default SideItem;
