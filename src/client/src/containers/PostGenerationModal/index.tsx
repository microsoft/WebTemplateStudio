import classnames from "classnames";
import * as React from "react";

import asModal from "../../components/Modal";
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

const PostGenerationModal = () => {
  return (
    <div>
      <div className={styles.title}>Generation Status</div>
      <div className={styles.section}>Template Generation</div>
      <div>Sync Status</div>
      <div className={styles.section}>Azure Services</div>
      <div>Deploying services...</div>
      <div className={styles.footerContainer}>
        <div>Help</div>
        <button
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
        >
          <Spinner className={styles.spinner} />
          Working
        </button>
      </div>
    </div>
  );
};

export default asModal(PostGenerationModal);
