import { useCallback } from "react";

/**
 * Custom react hook to put <mark></mark> tags around substring based on regex match
 *
 * Sources:
 * - https://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp
 *
 * @returns JSX with regex matches wrapped in <mark> tag
 *
 */
export const useHighlighter = () => {
  return useCallback(
    (str: string, searchInput: string) =>
      searchInput
        ? str
            .replaceAll(
              new RegExp(
                searchInput.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "gi"
              ),
              (substring) => `@@${substring}@@`
            )
            .split("@@")
            .map((str, i) =>
              i % 2 === 0 ? (
                str
              ) : (
                <mark key={i} className="bg-sky-200 dark:bg-amber-200">
                  {str}
                </mark>
              )
            )
        : str,
    []
  );
};
