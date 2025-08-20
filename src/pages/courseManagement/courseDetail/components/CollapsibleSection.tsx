

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
}

export const CollapsibleSection = ({
  title,
  children,
}: CollapsibleSectionProps) => {
  return (
    <div className="mb-6 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:outline hover:outline-brand-500 transition-all duration-200">
      <div className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</h3>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800">{children}</div>
    </div>
  );
};
