import React from 'react';
import cn from "classnames";

type ButtonProps = {
  variant?: "solid" | "ghost";
  size?: "sm" | "base" | "lg";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const mapBaseSize = {
  sm: "h-8 px-3 text-xs",
  base: "h-10 px-4 text-base",
  lg: "h-12 px-5 text-xl"
};

const mapSolidVariant = {
  blue: `text-white bg-blue-500 disabled:bg-blue-500
    hover:bg-blue-600 active:bg-blue-700
    focus:bg-blue-700 focus:shadow-outline-blue`,
  green: `text-white bg-green-500 disabled:bg-green-500
    hover:bg-green-600 active:bg-green-700
    focus:bg-green-700 focus:shadow-outline-green`,
  red: `text-white bg-red-500 disabled:bg-red-500
    hover:bg-red-600 active:bg-red-700
    focus:bg-red-700 focus:shadow-outline-red`,
  yellow: `text-white bg-yellow-500 disabled:bg-yellow-500
    hover:bg-yellow-600 active:bg-yellow-700
    focus:bg-yellow-700 focus:shadow-outline-yellow`,
  indigo: `text-white bg-indigo-500 disabled:bg-indigo-500
    hover:bg-indigo-600 active:bg-indigo-700
    focus:bg-indigo-700 focus:shadow-outline-indigo`,
  purple: `text-white bg-purple-500 disabled:bg-purple-500
    hover:bg-purple-600 active:bg-purple-700
    focus:bg-purple-700 focus:shadow-outline-purple`,
  pink: `text-white bg-pink-500 disabled:bg-pink-500
    hover:bg-pink-600 active:bg-pink-700
    focus:bg-pink-700 focus:shadow-outline-pink`,
  gray: `text-white bg-gray-500 disabled:bg-gray-500
    hover:bg-gray-600 active:bg-gray-700
    focus:bg-gray-700 focus:shadow-outline-gray`
};

const mapGhostVariant = {
  blue: `text-blue-500 border-blue-500
    hover:bg-blue-600 active:bg-blue-700
    focus:bg-blue-700 focus:shadow-outline-blue`,
  green: `text-green-500 border-green-500
    hover:bg-green-600 active:bg-green-700
    focus:bg-green-700 focus:shadow-outline-green`,
  red: `text-red-500 border-red-500
    hover:bg-red-600 active:bg-red-700
    focus:bg-red-700 focus:shadow-outline-red`,
  yellow: `text-yellow-500 border-yellow-500
    hover:bg-yellow-600 active:bg-yellow-700
    focus:bg-yellow-700 focus:shadow-outline-yellow`,
  indigo: `text-indigo-500 border-indigo-500
    hover:bg-indigo-600 active:bg-indigo-700
    focus:bg-indigo-700 focus:shadow-outline-indigo`,
  purple: `text-purple-500 border-purple-500
    hover:bg-purple-600 active:bg-purple-700
    focus:bg-purple-700 focus:shadow-outline-purple`,
  pink: `text-pink-500 border-pink-500
    hover:bg-pink-600 active:bg-pink-700
    focus:bg-pink-700 focus:shadow-outline-pink`,
  gray: `text-gray-500 border-gray-500
    hover:bg-gray-600 active:bg-gray-700
    focus:bg-gray-700 focus:shadow-outline-gray`
};

const VARIANT_MAPPING = {
  solid: mapSolidVariant,
  ghost: mapGhostVariant
}

const Button = (props: ButtonProps) => {
  const { variant = "solid", size = "base", className, ...restProps } = props;
  const mapVariant = VARIANT_MAPPING[variant];
  const mapSize = mapBaseSize[size];
  
  return (
    <button
      {...restProps}
      className={cn(
        "flex items-center justify-center rounded whitespace-no-wrap focus:outline-none transition duration-300",
        mapVariant,
        mapSize,
        className
      )}
    />
  );
}

export default Button;