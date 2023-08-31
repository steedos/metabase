(ns metabase.query-processor.util.add-alias-info
  (:require
   [metabase.driver :as driver]))

(defmulti ^String field-reference
  "Generate a reference for the field instance `field-inst` appropriate for the driver `driver`.
  By default this is just the name of the field, but it can be more complicated, e.g., take
  parent fields into account."
  {:added "0.46.0", :arglists '([driver field-inst])}
  driver/dispatch-on-initialized-driver
  ;; :hierarchy #'driver/hierarchy
  )

(defmethod field-reference ::driver/driver
  [_driver field-inst]
  (:name field-inst))