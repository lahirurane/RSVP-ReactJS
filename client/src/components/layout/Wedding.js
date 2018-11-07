import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import axios from 'axios';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import 'typeface-roboto';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

//Wedding RSVP
class Wedding extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      isAccepted: 'true',
      name: '',
      type: '',
      success: '',
      loading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.setAttendence = this.setAttendence.bind(this);
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  setAttendence(e) {
    this.setState({ isAccepted: e });
  }

  onSubmit(e) {
    e.preventDefault();

    const data = {
      isAccepted: this.state.isAccepted,
      name: this.state.name,
      type: 'wedding'
    };

    this.setState({ loading: true, errors: {} });
    axios
      .post('/api/rsvp/response', data)
      .then(res => {
        this.setState({ loading: false, success: res.data.result });
      })
      .catch(err => {
        this.setState({ loading: false, errors: err.response.data });
      });
  }

  render() {
    const { errors, loading, success } = this.state;

    return (
      <Row className="show-grid">
        <Col className="content-page" xs={12} md={12}>
          <Row className="content-page-row">
            <Col
              className="relative-height content-page-col"
              mdOffset={2}
              md={4}
            >
              <Row className="form-content-row relative-height center-items">
                <Col className="form-content-col" md={12}>
                  <Row>
                    <Col className="form-rsvp-title" md={12}>
                      RSVP
                    </Col>
                  </Row>
                  <Row>
                    <Col className="form-name-title" md={12}>
                      {'Amali & Lahiru'}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="form-event-title" md={12}>
                      {'Wedding'}
                    </Col>
                  </Row>
                  {success === '' ? (
                    <div>
                      <Row>
                        <Col md={12}>
                          <form noValidate autoComplete="off">
                            <div className="form-group">
                              <FormControl aria-describedby="component-helper-text">
                                <InputLabel htmlFor="component-simple">
                                  Name
                                </InputLabel>
                                <Input
                                  style={{ fontSize: '1.5em' }}
                                  id="standard-name"
                                  label="Name"
                                  className={'col-md-12'}
                                  error={errors.name ? true : false}
                                  value={this.state.name}
                                  onChange={this.onChange}
                                  margin="normal"
                                  name="name"
                                  required={true}
                                />
                                <FormHelperText id="component-error-text">
                                  {errors.name ? errors.name : ''}
                                </FormHelperText>
                              </FormControl>
                            </div>
                            <FormControl component="fieldset">
                              <RadioGroup
                                name="isAccepted"
                                value={this.state.isAccepted}
                                onChange={this.onChange}
                              >
                                <FormControlLabel
                                  value={'true'}
                                  control={<Radio color="primary" />}
                                  label="Yes, I'll be there"
                                  classes={{
                                    root: 'form-control-radio-root',
                                    label: 'form-control-label'
                                  }}
                                />
                                <FormControlLabel
                                  value={'false'}
                                  control={<Radio color="primary" />}
                                  label="Sorry, can't make it"
                                  classes={{
                                    root: 'form-control-radio-root',
                                    label: 'form-control-label'
                                  }}
                                />
                              </RadioGroup>
                            </FormControl>
                          </form>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={12}>
                          <Button
                            onClick={this.onSubmit}
                            variant="contained"
                            color="primary"
                          >
                            {' '}
                            Submit
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <Row>
                      <Col className="success-content" md={12}>
                        <Row>
                          <Col>
                            <span class="success-ok glyphicon glyphicon-ok" />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="success-text">
                            Thanks for your response
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col md={12}>
                      {loading === true ? (
                        <CircularProgress
                          className={{
                            color: '#00695c'
                          }}
                          size={30}
                          thickness={5}
                        />
                      ) : (
                        <div>&nbsp;</div>
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col
              className="relative-height content-page-col"
              xsOffset={1}
              xs={10}
              md={4}
            >
              <Row className="relative-height center-items">
                <Col className="relative-height center-items" md={12}>
                  <img
                    className="inv-img"
                    src={require('../../images/invwed.jpg')}
                    alt={'Invitation'}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
export default Wedding;
