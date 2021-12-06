import React from "react";

import {
    Columns,
    Table,
    Box,
    Block,
    Icon,
    Level,
    Heading,
    Tag,
} from "react-bulma-components";

import { Form } from "react-bulma-components";
const { Field, Control } = Form;

export default function AnyPercent() {
    return (
        <Columns centered={true}>
            <Columns.Column size="two-thirds">
                <Block />
                <CategoryHeader name="Any% NMG (1.2.2.1)" bestTime="28:59" />
                <Block />
                <SegmentTable
                    segments={[
                        {
                            segmentName: "Vengeful Spirit",
                            segmentTime: "3:17",
                            segmentLink:
                                "https://www.youtube.com/embed/gzjlbQDicMU",
                            author: "ConstructiveCynicism",
                            note: "Here is an interesting note",
                            tags: [
                                { key: "Framerate", value: "Variable" },
                                { key: "RNG", value: "Spliced" },
                            ],
                        },
                        {
                            segmentName: "Greenpath",
                            segmentTime: "1:10",
                            segmentLink:
                                "https://www.youtube.com/embed/YjsS7OC-p6Q",
                            author: "ConstructiveCynicism",
                            note: "Here is an interesting note",
                            tags: [
                                { key: "Framerate", value: "Variable" },
                                { key: "RNG", value: "Spliced" },
                            ],
                        },
                    ]}
                />
            </Columns.Column>
        </Columns>
    );
}

function CategoryHeader(props: { name: string; bestTime: string }) {
    return (
        <Box>
            <Level>
                <Level.Side align="left">
                    <Level.Item>
                        <Heading
                            size={4}
                            weight="bold"
                            className="has-text-primary"
                        >
                            {props.name}
                        </Heading>
                    </Level.Item>
                </Level.Side>
                <Level.Side align="right">
                    <Level.Item>
                        <Icon size="medium">
                            <i className="bi bi-star-fill"></i>
                        </Icon>
                        <Heading size={6}>
                            Sum of best segments: {props.bestTime}
                        </Heading>
                    </Level.Item>
                </Level.Side>
            </Level>
        </Box>
    );
}

function SegmentTable(props: {
    segments: {
        segmentName: string;
        segmentTime: string;
        segmentLink: string;
        author: string;
        note: string;
        tags: { key: string; value: string }[];
    }[];
}) {
    return (
        <Box>
            <Table
                className="is-fullwidth is-narrow"
                hoverable={true}
                striped={true}
            >
                <thead>
                    <tr>
                        <th style={{ width: "10em" }}>
                            <Icon size="medium">
                                <i className="bi bi-tag-fill"></i>
                            </Icon>
                            <strong>Segment Name</strong>
                        </th>
                        <th style={{ width: "15em" }}>
                            <Icon size="medium">
                                <i className="bi bi-hourglass-split"></i>
                            </Icon>
                            Time Without Loads
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.segments.map((segment) => (
                        <Row
                            key={segment.segmentName}
                            segmentName={segment.segmentName}
                            segmentTime={segment.segmentTime}
                            segmentLink={segment.segmentLink}
                            author={segment.author}
                            note={segment.note}
                            tags={segment.tags}
                        />
                    ))}
                </tbody>
            </Table>
        </Box>
    );
}

type RowProps = {
    segmentName: string;
    segmentTime: string;
    segmentLink: string;
    author: string;
    note: string;
    tags: { key: string; value: string }[];
};

type RowState = {
    expanded: boolean;
};

class Row extends React.Component<RowProps, RowState> {
    state: RowState;

    constructor(props: RowProps) {
        super(props);
        this.state = { expanded: false };
    }

    handleClick = () => {
        this.setState((state, _props) => ({
            expanded: !state.expanded,
        }));
        console.log("clicked");
        console.log(this.state.expanded);
    };

    render() {
        if (this.state.expanded) {
            return (
                <>
                    <RowHead
                        segmentName={this.props.segmentName}
                        segmentTime={this.props.segmentTime}
                        handleClickFunction={this.handleClick}
                    />
                    <ExpandedRowBody
                        segmentLink={this.props.segmentLink}
                        author={this.props.author}
                        note={this.props.note}
                        tags={this.props.tags}
                    />
                </>
            );
        } else {
            return (
                <RowHead
                    segmentName={this.props.segmentName}
                    segmentTime={this.props.segmentTime}
                    handleClickFunction={this.handleClick}
                />
            );
        }
    }
}

type RowHeadProps = {
    segmentName: string;
    segmentTime: string;
    handleClickFunction: () => void;
};

class RowHead extends React.Component<RowHeadProps> {
    constructor(props: RowHeadProps) {
        super(props);
        this.state = {};
    }

    callClickHandler = () => {
        this.props.handleClickFunction();
    };

    render() {
        return (
            <tr onClick={this.callClickHandler}>
                <td>{this.props.segmentName}</td>
                <td>{this.props.segmentTime}</td>
                <td className="has-text-right">
                    <Icon>
                        <i className="bi bi-chevron-expand"></i>
                    </Icon>
                </td>
            </tr>
        );
    }
}

function ExpandedRowBody(props: {
    segmentLink: string;
    author: string;
    note: string;
    tags: { key: string; value: string }[];
}) {
    return (
        <tr>
            <td colSpan={3}>
                <Columns>
                    <Columns.Column size="one-third">
                        <SegmentTags tags={props.tags} />
                    </Columns.Column>
                    <Columns.Column size="two-thirds">
                        <SegmentInfo author={props.author} note={props.note} />
                    </Columns.Column>
                </Columns>
                <YouTubeEmbed videoLink={props.segmentLink} />
            </td>
        </tr>
    );
}

function SegmentTags(props: { tags: { key: string; value: string }[] }) {
    return (
        <Field kind="group" multiline={true}>
            {props.tags.map((tag) => (
                <Control key={tag.key}>
                    <Tag.Group hasAddons={true}>
                        <Tag color="primary">{tag.key}</Tag>
                        <Tag color="info">{tag.value}</Tag>
                    </Tag.Group>
                </Control>
            ))}
        </Field>
    );
}

function SegmentInfo(props: { author: string; note: string }) {
    return (
        <>
            <p>
                <strong>Author:</strong> {props.author}
            </p>
            <p>
                <strong>Note:</strong> {props.note}
            </p>{" "}
        </>
    );
}

function YouTubeEmbed(props: { videoLink: string }) {
    return (
        <figure className="image is-16by9">
            <iframe
                className="has-ratio"
                src={props.videoLink}
                allowFullScreen
            ></iframe>
        </figure>
    );
}
