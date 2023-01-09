import React, { ChangeEvent, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { t } from "ttag";
import Button from "metabase/core/components/Button/Button";
import Radio from "metabase/core/components/Radio/Radio";
import ModalContent from "metabase/components/ModalContent";
import Fields from "metabase/entities/fields";
import { ValuesSourceConfig, ValuesSourceType } from "metabase-types/api";
import { Dispatch, State } from "metabase-types/store";
import Field from "metabase-lib/metadata/Field";
import {
  getDefaultSourceConfig,
  isValidSourceConfig,
} from "metabase-lib/parameters/utils/parameter-source";
import {
  ModalHelpText,
  ModalLabel,
  ModalLayout,
  ModalMain,
  ModalPane,
  ModalSection,
  ModalTextArea,
} from "./ValuesSourceTypeModal.styled";

const NEW_LINE = "\n";

const SOURCE_TYPE_OPTIONS = [
  { name: t`From this field`, value: null },
  { name: t`From another model or question`, value: "card" },
  { name: t`Custom list`, value: "static-list" },
];

interface ModalOwnProps {
  fields: Field[];
  sourceType: ValuesSourceType;
  sourceConfig: ValuesSourceConfig;
  onChangeSourceType: (sourceType: ValuesSourceType) => void;
  onChangeSourceConfig: (sourceConfig: ValuesSourceConfig) => void;
  onSubmit: () => void;
  onClose: () => void;
}

interface ModalStateProps {
  isLoaded: boolean;
}

interface ModalDispatchProps {
  onFetchFields: (fields: Field[]) => void;
}

type ModalProps = ModalOwnProps & ModalStateProps & ModalDispatchProps;

const ValuesSourceTypeModal = ({
  fields,
  sourceType,
  sourceConfig,
  onFetchFields,
  onChangeSourceType,
  onChangeSourceConfig,
  onSubmit,
  onClose,
}: ModalProps): JSX.Element => {
  const handleTypeChange = useCallback(
    (sourceType: ValuesSourceType) => {
      onChangeSourceType(sourceType);
      onChangeSourceConfig(getDefaultSourceConfig(sourceType, []));
    },
    [onChangeSourceType, onChangeSourceConfig],
  );

  const handleValuesChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChangeSourceConfig({ values: getValues(event.target.value) });
    },
    [onChangeSourceConfig],
  );

  useEffect(() => {
    onFetchFields(fields);
  }, [fields, onFetchFields]);

  return (
    <ModalContent
      title={t`Selectable values`}
      footer={[
        <Button
          key="submit"
          primary
          disabled={!isValidSourceConfig(sourceType, sourceConfig)}
          onClick={onSubmit}
        >{t`Done`}</Button>,
      ]}
      onClose={onClose}
    >
      <ModalLayout>
        <ModalPane>
          <ModalSection>
            <ModalLabel>{t`Where values should come from`}</ModalLabel>
            <Radio
              value={sourceType}
              options={SOURCE_TYPE_OPTIONS}
              vertical
              onChange={handleTypeChange}
            />
            {sourceType === "static-list" && (
              <ModalHelpText>{t`Enter one value per line.`}</ModalHelpText>
            )}
          </ModalSection>
        </ModalPane>
        <ModalMain>
          {sourceType === null && <ModalTextArea readOnly fullWidth />}
          {sourceType === "static-list" && (
            <ModalTextArea
              defaultValue={getValuesText(sourceConfig.values)}
              fullWidth
              onChange={handleValuesChange}
            />
          )}
        </ModalMain>
      </ModalLayout>
    </ModalContent>
  );
};

const getValues = (value: string) => {
  return value
    .split(NEW_LINE)
    .map(line => line.trim())
    .filter(line => line.length > 0);
};

const getValuesText = (values?: string[]) => {
  return values?.join(NEW_LINE) ?? "";
};

const mapStateToProps = (
  state: State,
  { fields }: ModalOwnProps,
): ModalStateProps => {
  return {
    isLoaded: fields.every(field =>
      Fields.selectors.getLoaded(state, { entityId: field.id }),
    ),
  };
};

const mapDispatchToProps = (dispatch: Dispatch): ModalDispatchProps => {
  return {
    onFetchFields: (fields: Field[]) => {
      fields.forEach(field =>
        dispatch(Fields.actions.fetchFieldValues({ id: field.id })),
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ValuesSourceTypeModal);