// Components
import React, { ReactNode } from "react";
import classNames from "classnames";

// Styles
import styles from "../styles/workflowVis.module.css";

// Types
import { Dropdown, Tooltip, WorkflowStepT, encodedNodeType, workflowStepConfig, WorkflowStepEditMenu,  ForkIcon, ExclamationIcon } from "../../config";

export const DiamondIcon = () => (
    <div className={styles.iconContainerDiamond}>
        <ForkIcon />
    </div>
);

export const WarningIcon = () => (
    <div className={styles.iconContainerWarning}>
        <ExclamationIcon />
    </div>
);

interface DecisionStepProps {
    workflowStepUid: string;
    workflowStepName: string;
    workflowUid: string;
    displayWarning?: ReactNode;
    nextSteps?: WorkflowStepT[];
    shouldHighlight: boolean;
}

const DecisionStep = ({
    workflowStepUid, workflowStepName, workflowUid,
    displayWarning, nextSteps, shouldHighlight }: DecisionStepProps
  ) => {
    const { theme, options } = workflowStepConfig[encodedNodeType.fork];
    const editMenuProps = {
        ...options,
        type: encodedNodeType.fork,
        workflowStepUid,
        workflowUid,
        nextSteps
    };
    return (
        <div className={classNames(styles.diamondContainer, styles.hoverable)}>
        <Dropdown
            closeOnClick={false}
            component={<WorkflowStepEditMenu {...editMenuProps} />}
        >
            <div className={classNames(styles.diamond, styles.flexContainer, styles[`theme${theme}`])}>
            <Tooltip
                placement="top"
                tooltipContent={displayWarning || workflowStepName}
            >
                <DiamondIcon />
            </Tooltip>
            </div>
        </Dropdown>
        </div>
    );
};

export default DecisionStep;
