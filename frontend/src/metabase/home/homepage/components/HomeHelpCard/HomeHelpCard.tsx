import React from "react";
import { t } from "ttag";
import MetabaseSettings from "metabase/lib/settings";
import { CardIcon, CardRoot, CardTitle } from "./HomeHelpCard.styled";

const HomeHelpCard = (): JSX.Element => {
  return (
    <CardRoot href={MetabaseSettings.learnUrl()} className="hidden">
      {" "}
      {/* Steedos Analytics */}
      <CardIcon name="reference" />
      <CardTitle>{t`Metabase tips`}</CardTitle>
    </CardRoot>
  );
};

export default HomeHelpCard;
