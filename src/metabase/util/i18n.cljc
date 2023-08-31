(ns metabase.util.i18n)

(defn tru
  "Applies `str` to `deferred-tru`'s expansion.

  The first argument can be a format string, or a valid `str` form with all string arguments. The latter can be used to
  split a long string over multiple lines.

  Prefer this over `deferred-tru`. Use `deferred-tru` only in code executed at compile time, or where `str` is manually
  applied to the result."
  [format-string-or-str & args]
  `(str* (~format-string-or-str ~@args)))