function Button(props) {
    return (
        <button className="btn" onClick={props.click}>
            {props.text}
        </button>
    );
}

export default Button;
