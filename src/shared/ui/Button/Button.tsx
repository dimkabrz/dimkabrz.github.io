import './Button.css'

type Props = {
    children:string,
    disabled?:boolean,
    onClick: () => void
}
export const Button = ({children, disabled, onClick}:Props) => {
    return (
        <button disabled={disabled} onClick={onClick} className={'custom_btn'}>
            {children}
        </button>
    );
};
