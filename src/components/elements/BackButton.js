import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Save } from '@material-ui/icons';

const styles = theme => ({
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
});

class BackButton extends Component {
    render () {
        const { classes } = this.props;
        return (
            <div>
              <Button onClick={this.props.handleBack} variant="contained" color="default" className={classes.button}>
                Save
                <Save className={classes.rightIcon} />
              </Button>
            </div>
          );
    }
}

BackButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BackButton);