import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {Controller} from "react-hook-form";

// components
import {FormDialog, SelectInput, TextInput} from "../../../components";

// hooks
import {useMovementsCommon} from "../../../hooks/queries/useMovements.jsx"

function DoMovementForm(props) {
    const {control, isLoading} = props;
    const {t} = useTranslation();

    const movements = useMovementsCommon();

    const movementOptions = useMemo(
        () => [...(movements?.data ?? [])],
        [movements.data],
    );

    return (
        <div className="flex flex-col gap-5">
            <Controller
                control={control}
                rules={{
                    invalid: t("_pages:products.inputs.movement.invalid"),
                }}
                name="movement"
                disabled={isLoading || movements?.isLoading}
                render={({field: {value, onChange, ...rest}}) => (
                    <SelectInput
                        required
                        options={movementOptions}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={t("_pages:products.inputs.movement.name")}
                        {...rest}
                    />
                )}
            />
            <Controller
                control={control}
                rules={{
                    required: t("_pages:products.inputs.count.required"),
                }}
                name="count"
                disabled={isLoading || movements?.isLoading}
                render={({field}) => (
                    <TextInput
                        required
                        type="number"
                        maxLength={25}
                        placeholder={t("_pages:products.inputs.count.name")}
                        {...field}
                    />
                )}
            />
        </div>
    );
}

export function DoMovementDialog(props) {
    return (
        <FormDialog {...props}>
            <DoMovementForm {...props} />
        </FormDialog>
    );
}
