export const FORM_RESET: "FORM_RESET" = "FORM_RESET";

export interface IResetFormAction {
    readonly type: typeof FORM_RESET;
}

export const resetForm = (): IResetFormAction => {
    return {
        type: FORM_RESET                   
    }
}

export type TFormsActions = IResetFormAction;