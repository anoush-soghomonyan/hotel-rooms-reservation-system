import React from 'react';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {dateLL} from "../utils/utils";
import List from '@material-ui/core/List';
import EditIcon from '@material-ui/icons/Edit';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import DataManager from "../managers/DataManager";
import ListItem from '@material-ui/core/ListItem';
import {withStyles} from '@material-ui/core/styles';
import IconButton from "@material-ui/core/IconButton";
import ListItemText from '@material-ui/core/ListItemText';
import createAction, {EDIT_RESERVATION} from "../actions";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const styles = (theme => ({
    root: {
        width: '100%',
        maxWidth: '100%',
        backgroundColor: 'theme.palette.background.paper',
    },
    inline: {
        display: 'inline',
    },
}));

class ReservationsListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: DataManager.sharedInstance().reservations,
        }
    }

    render() {
        let {list} = this.state;
        let {classes} = this.props;
        return <div>
            {list.length > 0
                ? <List className={classes.root}>
                    {list.map(item => <ReservationComponent
                        key={item.id}
                        item={item}
                        classes={classes}
                        dispatch={this.props.dispatch}
                    />)}
                </List>
                : "Not reservations yet"
            }
        </div>
    }
}

function ReservationComponent({item, dispatch}) {
    let date = `(${dateLL(item.start)} - ${dateLL(item.end)})`;
    let secondaryText = `Creation date: ${dateLL(item.created_at)} | 
    ${getEditedText(item.updated_at)}`;
    return <React.Fragment>
        <ListItem alignItems="flex-start">
            <ListItemText
                primary={`Room#${item.room_number} ${date}`}
                secondary={secondaryText}
            />
            <ListItemSecondaryAction>
                <Tooltip title="Edit">
                    <IconButton
                        edge="end"
                        aria-label="comments"
                        disabled={!item.isCreatorMe()}
                        onClick={() => openEdit()}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="inset" component="li" />
    </React.Fragment>;
    
    function openEdit() {
        dispatch(createAction(EDIT_RESERVATION, item));
    }
}

export default compose(
    withStyles(styles),
    connect()
)(ReservationsListComponent);

function getEditedText(editedArr) {
    let ln = editedArr.length;
    if(ln > 0) {
        return `Was edited ${ln} time${ln > 1 ? "s" : ""} - Last update: ${dateLL(editedArr[0])}`;
    } else {
        return "Doesn't have edit history";
    }
}

ReservationComponent.propTypes = {
    item: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

