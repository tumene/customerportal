import React from "react";
import { groupArrayBy } from "../utils/dataTypes";

export default function useModalFlow({ screens, activeScreenId }) {
  activeScreenId = activeScreenId || screens?.[0]?.id;

  const groupScreensById = groupArrayBy(screens, "id");
  const ActiveComponent = groupScreensById?.[activeScreenId]?.[0]?.Component;

  const ActiveScreen =
    typeof ActiveComponent === "function"
      ? ActiveComponent
      : () => groupScreensById[activeScreenId]?.[0].Component;

  return [ActiveScreen];
}
