"use client";

import { FormEvent, useState } from "react";

type AddCardFormProps = {
  onAdd: (title: string, details: string) => void;
};

export function AddCardForm({ onAdd }: AddCardFormProps) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      return;
    }
    onAdd(trimmedTitle, details.trim());
    setTitle("");
    setDetails("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 space-y-2 rounded-lg border border-dashed border-blue-primary/20 bg-white/70 p-3"
    >
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-gray-text">
          Title
        </span>
        <input
          data-testid="add-card-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Card title"
          className="w-full rounded border border-blue-primary/20 px-2 py-1.5 text-sm text-dark-navy outline-none focus:border-blue-primary focus:ring-2 focus:ring-accent-yellow/30"
        />
      </label>
      <label className="block">
        <span className="mb-1 block text-xs font-medium text-gray-text">
          Details
        </span>
        <textarea
          data-testid="add-card-details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          placeholder="Card details"
          rows={2}
          className="w-full resize-none rounded border border-blue-primary/20 px-2 py-1.5 text-sm text-dark-navy outline-none focus:border-blue-primary focus:ring-2 focus:ring-accent-yellow/30"
        />
      </label>
      <button
        type="submit"
        data-testid="add-card-submit"
        className="w-full rounded bg-purple-secondary px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Add card
      </button>
    </form>
  );
}
