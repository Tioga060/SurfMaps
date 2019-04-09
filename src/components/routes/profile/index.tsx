import { Component, h } from "preact";
import { connect } from "redux-zero/preact";
import actions from "../../actions";
import * as style from "./style.css";

import Card, {CardActionButtons} from 'preact-material-components/Card';
import 'preact-material-components/Typography/style.css';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';

interface Props {
    map: string;
    count: number;
    increment: any;
    decrement: any;
}

interface State {
    time: number;
}

const mapToProps = ({ count }: any) => ({ count });

class ProfileRaw extends Component<Props, State> {
    public state = {
        time: Date.now(),
        count: 10
    };

    public timer?: number;

    // gets called when this route is navigated to
    public componentDidMount() {
        // start a timer for the clock:
        this.timer = window.setInterval(this.updateTime, 1000);
    }

    // gets called just before navigating away from the route
    public componentWillUnmount() {
        clearInterval(this.timer);
    }

    // update the current time
    public updateTime = () => {
        this.setState({ time: Date.now() });
    };

    public render({ map, increment, count }: Props, { time }: State) {
        return (
            <div class={style.profile}>
                <h1>Profile: {map}</h1>
                <p>This is the user profile for a user named {map}.</p>

                <div>Current time: {new Date(time).toLocaleString()}</div>

                <p>
                    <button onClick={increment}>Click Me</button> Clicked{" "}
                    {count} times.
                </p>
                <Card class={style.card}>
                    <Card.Media>
                        <img class={style.cardImage} src="/assets/dev/surf_obliteration.jpg"/>
                    </Card.Media>
                    <div class={style.cardBody}>
                        <h2 class="mdc-typography--headline6">Title</h2>
                        <div class="mdc-typography mdc-typography--subtitle2">Caption</div>
                    </div>
                    <Card.Actions>
                        <CardActionButtons>
                            <Card.ActionButton>OK</Card.ActionButton>
                        </CardActionButtons>
                        <Card.ActionIcons>
                            <Card.ActionIcon>share</Card.ActionIcon>
                        </Card.ActionIcons>
                    </Card.Actions>
                </Card>
            </div>
        );
    }
}

export const Profile = connect(mapToProps, actions)(ProfileRaw);
