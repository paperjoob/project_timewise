import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Card, CardActions, CardContent, Grid, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Cancel, Save } from '@material-ui/icons';

class UpDateProfile extends Component {
    render() {
        return (
            <div>
                <form className={classes.container} color="inherit">
                    <TextField
                        id="outlined-name"
                        label="First Name"
                        value={this.state.details.first_name}
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            className: classes.input,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }}
                        InputLabelProps={{
                            className: classes.input,
                            shrink: true
                        }}
                    />
                    <TextField
                        id="outlined-name"
                        label="Last Name"
                        value={this.state.details.last_name}
                        // onChange={this.handleChange('name')}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                            className: classes.input,
                            classes: {
                                root: classes.cssOutlinedInput,
                                focused: classes.cssFocused,
                                notchedOutline: classes.notchedOutline,
                            }
                        }}
                        InputLabelProps={{
                            className: classes.input,
                            shrink: true
                        }}
                    />
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
  });

export default withStyles(styles) (connect(mapStateToProps) (UpDateProfile));