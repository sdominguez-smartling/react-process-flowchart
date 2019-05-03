import React from 'react';

// Styles
import styles from './styles/workflowVis.module.css';

// Types
import {
    CreateAddChildNodeCommand, AddChildNodeCommand
} from "../types/workflowVisTypes";

const noop = () => { };

interface PropsT {
    createAddChildNodeCommand: CreateAddChildNodeCommand;
    isEmptyBranch?: boolean;
}

export default class EditButton extends React.PureComponent<PropsT> {
    constructor(props: PropsT) {
        super(props);
        this.addNodeWithLocationBound = this.addNodeWithLocation.bind(this);
    }

    addNodeWithLocationBound: (e: React.MouseEvent, mock?: {
        addChildNodeMock: CreateAddChildNodeCommand; isEmptyBranchMock: boolean;
    }) => void;

    addNodeWithLocation(
        e: React.MouseEvent,
        mock?: {
            addChildNodeMock: CreateAddChildNodeCommand; isEmptyBranchMock: boolean;
        }
    ): AddChildNodeCommand {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        let createAddChildNodeCommand: CreateAddChildNodeCommand;
        let isEmptyBranch: boolean;
        if (mock) {
            const { addChildNodeMock, isEmptyBranchMock = false } = mock;
            createAddChildNodeCommand = addChildNodeMock;
            isEmptyBranch = isEmptyBranchMock;
            return createAddChildNodeCommand({ left: left, top: top, isEmptyBranch });
        }
        const {
            createAddChildNodeCommand: createAddChildNodeCommandProps,
            isEmptyBranch: isEmptyBranchProps = false
        } = this.props;

        createAddChildNodeCommand = createAddChildNodeCommandProps;
        isEmptyBranch = isEmptyBranchProps;
        return createAddChildNodeCommand({ left: e.clientX - left, top: e.clientY - top, isEmptyBranch });
    }

    render() {
        return (
            <span role="button" tabIndex={-1} className={styles.circle} onClick={this.addNodeWithLocationBound} onKeyPress={noop}>
                <i className="fas fa-plus" />
            </span>
        );
    }
}

