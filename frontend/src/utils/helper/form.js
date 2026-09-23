export const getEventHandlers = (props) => ({
    onChange: (e) => {
        if (props.onChange) {
            props.onChange(e);
        }
    },
    onClick: (e) => {
        if (props.onClick) {
            props.onClick(e);
        }
    },
    onKeyDown: (e) => {
        if (props.onKeyDown) {
            props.onKeyDown(e);
        }
    },
    onPaste: (e) => {
        if (props.onPaste) {
            props.onPaste(e);
        }
    },
    onKeyUp: (e) => {
        if (props.onKeyUp) {
            props.onKeyUp(e);
        }
    }
});
