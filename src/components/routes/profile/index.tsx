import { Component, h } from "preact";
import { connect } from "redux-zero/preact";
import actions from "../../actions";
import * as style from "./style.css";
import { Provider } from "redux-zero/preact";
import store from "../../store";

interface Props {
    user: string;
    count: number;
    increment: any;
    decrement: any;
}

interface State {
    time: number;
}

const mapToProps = ({ count }: any) => ({ count });

export class ProfileRaw extends Component<Props, State> {
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

    public render({ user, increment, count }: Props, { time }: State) {
        return (
            <div class={style.profile}>
                <h1>Profile: {user}</h1>
                <p>This is the user profile for a user named {user}.</p>

                <div>Current time: {new Date(time).toLocaleString()}</div>

                <p>
                    <button onClick={increment}>Click Me</button> Clicked{" "}
                    {count} times.
                </p>
            </div>
        );
    }
}

export const ProfileWrapper = connect(mapToProps, actions)(ProfileRaw);

export const Profile = () => (
    <Provider store={store}>
        <ProfileWrapper/>
    </Provider>
)