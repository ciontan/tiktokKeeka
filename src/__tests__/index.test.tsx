// Copyright 2024 The Lynx Authors. All rights reserved.
// Licensed under the Apache License Version 2.0 that can be found in the
// LICENSE file in the root directory of this source tree.
import "@testing-library/jest-dom";
import { expect, test, vi } from "vitest";
import { render, getQueriesForElement } from "@lynx-js/react/testing-library";

import { App } from "../App.jsx";

test("App", async () => {
  const { container, getByText } = render(<App />);
  // Check for some main profile text
  expect(getByText("onedollacoin")).toBeInTheDocument();
  expect(getByText("Followers")).toBeInTheDocument();
  expect(getByText("Likes")).toBeInTheDocument();
  // Check for Tailwind classes on main container
  const mainView = container.querySelector(
    "view.max-w-sm.mx-auto.bg-background.min-h-screen"
  );
  expect(mainView).not.toBeNull();
  // Check for profile image
  const profileImg = container.querySelector(
    "image[src*='public.blob.vercel-storage.com']"
  );
  expect(profileImg).not.toBeNull();
  // Check for navigation bar
  expect(getByText("Home")).toBeInTheDocument();
  expect(getByText("Shop")).toBeInTheDocument();
  expect(getByText("Inbox")).toBeInTheDocument();
  expect(getByText("Profile")).toBeInTheDocument();
});
