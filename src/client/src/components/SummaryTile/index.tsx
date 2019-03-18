import * as React from "react";

import styles from "./styles.module.css";

import edit from "../../assets/edit.svg";
import fullstackwhite from "../../assets/fullstackwhite.svg";

const SummaryTile = () => {
    const [ title, setTitle ] = React.useState("Full Stack Web App");
    const [ isDisabled, setDisabled ] = React.useState(true);
    const [ showEditable, setEditable ] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);
    React.useEffect(() => {
        if (!isDisabled && inputRef && inputRef.current) {
            inputRef.current.select();
            inputRef.current.focus();
        }
    },[isDisabled])
    const handleChange = (e: any) => {
        setTitle(e.target.value);
    }
    const handleClick = (e: any) => {
        setDisabled(false);
    }
    const handleFocusOut = (e: any) => {
        setDisabled(true);
    }
    const handleMouseEnter = () => {
        setEditable(true);
    }
    const handleMouseLeave = () => {
        setEditable(false);
    }
    return (
        <div className={styles.summaryTileContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={styles.leftContainer}>
                <img src={fullstackwhite} className={styles.leftIcon} />
                <div className={styles.tileContent}>
                    <input ref={inputRef} className={styles.tileInput} value={title} onChange={handleChange} disabled={isDisabled} onBlur={handleFocusOut} onClick={handleClick} />
                    <div className={styles.metaData}>
                        <div>{`CosmosDB`}</div>
                        <div>|</div>
                        <div>{`Microsoft, Inc.`}</div>
                        <div>|</div>
                        <div>{`v1.0`}&nbsp;</div>
                    </div>
                </div>
            </div>
            {showEditable && <img src={edit} className={styles.rightIcon} onClick={handleClick} />}        
        </div>
    )
}

export default SummaryTile;