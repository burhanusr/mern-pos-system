import React, { useState } from "react";
import classNames from "classnames";

const Tabs = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        // Menambahkan prop aktif ke anak berdasarkan tipe
        if (child.type === TabsList) {
          return React.cloneElement(child, {
            activeTab,
            onTabChange: handleTabChange,
          });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ children, activeTab, onTabChange, className }) => {
  const baseStyles = "flex h-10 items-center justify-between p-1";

  const classes = classNames(className, baseStyles);

  return (
    <div className={classes}>
      {React.Children.map(children, (child) => {
        if (child.type === TabsTrigger) {
          return React.cloneElement(child, {
            isActive: activeTab === child.props.value,
            onTabChange,
          });
        }
        return child;
      })}
    </div>
  );
};

const TabsTrigger = ({ children, value, isActive, onTabChange, className }) => {
  const baseStyles =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-8 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm";
  const classes = classNames(className, baseStyles);

  return (
    <button
      className={`${classes} ${
        isActive ? "border-b-2 bg-gray-800 text-white" : "hover:text-gray-500"
      }`}
      onClick={() => onTabChange(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ children, value, activeTab, className }) => {
  const baseStyles =
    "mt-2 p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const classes = classNames(className, baseStyles);

  return activeTab === value ? <div className={classes}>{children}</div> : null;
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
