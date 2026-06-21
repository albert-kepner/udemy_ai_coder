"use client";

import { useEffect, useRef, useState } from "react";

type EditableColumnTitleProps = {
  title: string;
  onRename: (title: string) => void;
};

export function EditableColumnTitle({
  title,
  onRename,
}: EditableColumnTitleProps) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function startEditing() {
    setValue(title);
    setEditing(true);
  }

  function save() {
    const trimmed = value.trim();
    if (trimmed) {
      onRename(trimmed);
    } else {
      setValue(title);
    }
    setEditing(false);
  }

  if (editing) {
    return (
      <input
        ref={inputRef}
        data-testid="column-title-input"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onBlur={save}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            save();
          }
          if (event.key === "Escape") {
            setValue(title);
            setEditing(false);
          }
        }}
        className="w-full rounded border border-blue-primary/30 bg-white px-2 py-1 text-sm font-semibold text-dark-navy outline-none ring-2 ring-accent-yellow/40"
      />
    );
  }

  return (
    <button
      type="button"
      data-testid="column-title"
      onClick={startEditing}
      className="w-full text-left text-sm font-semibold text-dark-navy transition-colors hover:text-blue-primary"
    >
      {title}
    </button>
  );
}
