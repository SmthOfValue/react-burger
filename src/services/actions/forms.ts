export const FORM_RESET: "FORM_RESET" = "FORM_RESET";

interface IResetFormAction {
    type: typeof FORM_RESET;
}

export const resetForm = (): IResetFormAction => {
    return {
        type: FORM_RESET                   
    }
}