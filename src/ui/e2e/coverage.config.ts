// SPDX-FileCopyrightText: Copyright (c) 2026 NVIDIA CORPORATION. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0

import type { CoverageReportOptions } from "monocart-coverage-reports";

const srcFileFilter = (file: { sourcePath: string }) =>
  file.sourcePath.startsWith("src/");

const coverageOptions: CoverageReportOptions = {
  name: "E2E Coverage Report",
  outputDir: "./coverage-e2e",

  reports: [
    ["console-details", { filter: srcFileFilter }],
    ["v8", { subdir: "v8" }],
    ["lcovonly", { file: "lcov.info" }],
    "markdown-summary",
    ["markdown-details", { maxCols: 200, filter: srcFileFilter }],
  ],

  entryFilter: (entry) =>
    entry.url.includes("_next/static") || entry.url.includes("_next/server"),

  sourceFilter: (sourcePath: string) => sourcePath.startsWith("src/"),
};

export function filterCoverageEntries(
  entries: Array<{ url: string; [key: string]: unknown }>,
): Array<{ url: string; [key: string]: unknown }> {
  return entries.filter((entry) => !!entry.url);
}

export default coverageOptions;
