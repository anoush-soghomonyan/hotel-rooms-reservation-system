import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function RoomsSelectComponent({rooms, handleSelection, selectedId}) {
    const classes = useStyles();
    const [id, setRoomId] = React.useState(selectedId || '');

    const handleChange = event => {
        console.log(event.target.value);
        setRoomId(event.target.value);
    };

    return <div>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Available rooms</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={id}
                onChange={handleChange}
            >
                {rooms.map(room => <MenuItem
                    key={room.id}
                    value={room.id}
                >#{room.id + ": " + room.type}</MenuItem>
                )}
            </Select>
        </FormControl>
    </div>
}

RoomsSelectComponent.propTypes = {
    rooms: PropTypes.array.isRequired,
    selectedId: PropTypes.number,
    handleRoomSelect: PropTypes.func.isRequired,
};

