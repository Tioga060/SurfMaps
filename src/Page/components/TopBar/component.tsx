import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { UserBadgeForSignedInUser } from 'shared/components/UserBadge';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { classNames as cn } from './styles';

export const TopBar: React.StatelessComponent = (props) => (
    <AppBar position="sticky" className={cn.topBar}>
        <Toolbar>
            <IconButton color="inherit" aria-label="Menu" className={cn.menuButton}>
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className="flex-grow-1">
                SurfMaps
          </Typography>
            <UserBadgeForSignedInUser showName={false}/>
        </Toolbar>
    </AppBar>
)