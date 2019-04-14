import React from 'react';
import MenuSurface, {Corner} from '@material/react-menu-surface';
import List, {ListItem, ListItemText} from '@material/react-list';
import { UserBadgeForSignedInUser } from '../../../UserBadge';

import './styles.scss'

interface IState {
    open: boolean;
    anchorElement: any;
}

export class TopAppBarUserMenu extends React.Component<{},IState> {
    public constructor(props: {}) {
        super(props);
        this.state = {
            open: false,
            anchorElement: null,
          };
          this.setAnchorElement = this.setAnchorElement.bind(this);
    }

  public setAnchorElement = (element: any) => {
    if (this.state.anchorElement) {
      return;
    }
    this.setState({anchorElement: element});
  }

  public logOut = () => { //TODO
    console.log('logged out');
  }

  render() {
    return (
      <div
        className='mdc-menu-surface--anchor'
        ref={this.setAnchorElement}
      >
        <UserBadgeForSignedInUser showName={false} onPressed={() => this.setState({open: true})}>Open Menu</UserBadgeForSignedInUser>

        <MenuSurface
          open={this.state.open}
          anchorCorner={Corner.BOTTOM_LEFT}
          onClose={() => this.setState({open: false})}
          anchorElement={this.state.anchorElement}
        >
          <List>
              <ListItem>
                  <ListItemText primaryText='Profile'/>
              </ListItem>
              <ListItem onClick={this.logOut}>
                  <ListItemText primaryText='Log Out'/>
              </ListItem>
          </List>
        </MenuSurface>
      </div>
    );
  }
}